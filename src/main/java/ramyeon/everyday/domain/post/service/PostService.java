package ramyeon.everyday.domain.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ramyeon.everyday.domain.comment.entity.Comment;
import ramyeon.everyday.domain.comment.service.CommentService;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.file.service.FileService;
import ramyeon.everyday.domain.like.entity.Like;
import ramyeon.everyday.domain.like.service.LikeService;
import ramyeon.everyday.domain.notice.entity.Notice;
import ramyeon.everyday.domain.notice.repository.NoticeRepository;
import ramyeon.everyday.domain.notice.service.NoticeService;
import ramyeon.everyday.domain.post.entity.Post;
import ramyeon.everyday.domain.post.repository.PostRepository;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.domain.user.service.UserService;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.PostDto;
import ramyeon.everyday.enum_.BoardType;
import ramyeon.everyday.enum_.MyPostType;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.enum_.Whether;
import ramyeon.everyday.exception.NoRightsOfAccessException;
import ramyeon.everyday.exception.NotFoundResourceException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikeService likeService;
    private final NoticeService noticeService;
    private final NoticeRepository noticeRepository;
    private final CommentService commentService;
    private final FileService fileService;

    /**
     * 메인화면 게시글 목록 조회
     */
    public Map<BoardType, List<PostDto.PostResponseDto>> getPostsMain(String loginId, Pageable pageable) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회

        Map<BoardType, List<PostDto.PostResponseDto>> postsMainMap = new HashMap<>();

        // 핫 게시글 조회
        List<PostDto.PostResponseDto> hotPostList = getHotPostsMain(loginUser, pageable)
                .stream().map(
                        hotPost -> PostDto.PostResponseDto.builder()
                                .id(hotPost.getId())
                                .title(hotPost.getTitle())
                                .registrationDate(hotPost.getRegistrationDate())
                                .build()
                ).collect(Collectors.toList());
        postsMainMap.put(BoardType.HOT, hotPostList);

        // 게시판 별 게시글 조회
        for (BoardType boardType : BoardType.getNormalBoard()) {
            List<PostDto.PostResponseDto> boardPostList = getBoardPosts(loginUser, boardType, pageable)
                    .stream().map(
                            boardPost -> PostDto.PostResponseDto.builder()
                                    .id(boardPost.getId())
                                    .title(boardPost.getTitle())
                                    .registrationDate(boardPost.getRegistrationDate())
                                    .build()
                    ).collect(Collectors.toList());
            postsMainMap.put(boardType, boardPostList);
        }

        // 공지사항 조회
        List<PostDto.PostResponseDto> noticeList = noticeService.getNoticesPaging(pageable)
                .stream().map(
                        notice -> PostDto.PostResponseDto.builder()
                                .id(notice.getId())
                                .title(notice.getTitle())
                                .registrationDate(notice.getRegistrationDate())
                                .build()
                ).collect(Collectors.toList());
        postsMainMap.put(BoardType.NOTICE, noticeList);

        return postsMainMap;
    }

    /**
     * 게시판 별 게시글 목록 조회
     */
    public Page<PostDto.PostResponseDto> getPostsBoard(String loginId, String type, Pageable pageable) {
        BoardType boardType = BoardType.findBoardType(type);  // 게시판 종류

        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        if (boardType == BoardType.HOT) {  // 핫 게시판
            // 핫 게시글 조회
            List<Post> postsHot = getHotPostsMain(loginUser);
            // Post 엔티티를 PostsBoardDto로 변환
            List<PostDto.PostResponseDto> postsBoardDtos = new ArrayList<>();
            for (Post post : postsHot) {
                postsBoardDtos.add(
                        PostDto.PostResponseDto.builder()
                                .id(post.getId())
                                .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                                .title(post.getTitle())
                                .contents(post.getContents())
                                .registrationDate(post.getRegistrationDate())
                                .isAnonymous(post.getIsAnonymous())
                                .views(post.getViews())
                                .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                                .fileCount(post.getFileList().size())
                                .commentCount(post.getCommentList().size())
                                .build()
                );
            }

            // List를 Page로 변환
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), postsBoardDtos.size());
            PageImpl<PostDto.PostResponseDto> postDtosPage = new PageImpl<>(new ArrayList<>(), pageable, postsBoardDtos.size());
            try {
                List<PostDto.PostResponseDto> postResponseDtos = postsBoardDtos.subList(start, end);
                postDtosPage = new PageImpl<>(postResponseDtos, pageable, postsBoardDtos.size());
            } catch (IllegalArgumentException ie) {
                // illegal endpoint index value
            }
            return postDtosPage;

        } else {  // 자유, 정보, 동아리 게시판
            Page<Post> posts = getBoardPosts(loginUser, boardType, pageable);// 게시글 조회 최근순 정렬
            return posts.map(
                    post -> PostDto.PostResponseDto.builder()
                            .id(post.getId())
                            .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                            .title(post.getTitle())
                            .contents(post.getContents())
                            .registrationDate(post.getRegistrationDate())
                            .isAnonymous(post.getIsAnonymous())
                            .views(post.getViews())
                            .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                            .fileCount(post.getFileList().size())
                            .commentCount(post.getCommentList().size())
                            .build()
            );
        }
    }

    /**
     * 게시글 상세 조회
     */
    public PostDto.PostResponseDto getPostDetail(Long postId, String loginId) {
        // 회원 및 좋아요 조회- fetch join을 통한 성능 최적화로 쿼리 수 감소
        User loginUser = userRepository.findByLoginIdTargetTypeInWithLike(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회

        // 게시글 및 댓글, 사용자 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        Post post = postRepository.findByIdAndSchoolAndIsDeletedWithUserCommentUser(postId, loginUser.getSchool(), Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));

        // File 엔티티를 FileInPostAndNoticeResponseDto로 변환
        List<File> fileList = post.getFileList();
        List<FileDto.FileResponseDto> fileDtoList = new ArrayList<>();
        for (File file : fileList) {
            fileDtoList.add(new FileDto.FileResponseDto(file.getSequence(), file.getUploadFilename(), file.getStoreFilename()));
        }

        // Comment 엔티티를 CommentInPostResponseDto로 변환
        List<Comment> commentList = post.getCommentList();
        List<CommentDto.CommentResponseDto> commentDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentDtoList.add(commentService.entityToDto(comment, post, loginUser));
        }

        return PostDto.PostResponseDto.builder()
                .id(post.getId())
                .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                .writerLoginId(getWriterLoginId(post.getUser()))
                .title(post.getTitle())
                .contents(post.getContents())
                .registrationDate(post.getRegistrationDate())
                .boardType(post.getBoardType())
                .isAnonymous(post.getIsAnonymous())
                .views(post.getViews())
                .isLikePost(checkUserLike(loginUser.getLikeList(), TargetType.POST, post.getId()))  // 해당 글을 좋아요 했는지 확인
                .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                .fileCount(fileDtoList.size())
                .file(fileDtoList)
                .commentCount(commentDtoList.size())
                .comment(commentDtoList)
                .build();

    }

    /**
     * 좋아요한 게시글, 공지사항 목록 조회
     */
    public Page<PostDto.PostResponseDto> getLikePostsAndNotices(String loginId, Pageable pageable) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회

        List<PostDto.PostResponseDto> postAndNoticeDtoList = new ArrayList<>();

        // 좋아요 한 게시글 조회
        List<Post> likePosts = postRepository.findByUserAndBoardTypeAndIsDeleted(loginUser, TargetType.POST, Whether.N);
        for (Post post : likePosts) {
            postAndNoticeDtoList.add(
                    // Post 엔티티를 PostResponseDto로 변환
                    PostDto.PostResponseDto.builder()
                            .id(post.getId())
                            .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                            .title(post.getTitle())
                            .contents(post.getContents())
                            .registrationDate(post.getRegistrationDate())
                            .boardType(post.getBoardType())
                            .isAnonymous(post.getIsAnonymous())
                            .views(post.getViews())
                            .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                            .fileCount(post.getFileList().size())
                            .commentCount(post.getCommentList().size())
                            .build()
            );
        }

        // 좋아요 한 공지사항 조회
        List<Notice> likeNotices = noticeRepository.findByUserAndBoardTypeAndIsDeleted(loginUser, TargetType.NOTICE, Whether.N);
        for (Notice notice : likeNotices) {
            postAndNoticeDtoList.add(
                    // Notice 엔티티를 PostResponseDto로 변환
                    PostDto.PostResponseDto.builder()
                            .id(notice.getId())
                            .writer(notice.getManager().getName())
                            .title(notice.getTitle())
                            .contents(notice.getContents())
                            .registrationDate(notice.getRegistrationDate())
                            .boardType(BoardType.NOTICE)
                            .views(notice.getViews())
                            .likeCount(noticeService.getLikeCount(notice))
                            .fileCount(notice.getFileList().size())
                            .build()
            );
        }

        // 게시글과 공지사항을 최신순 정렬
        postAndNoticeDtoList = postAndNoticeDtoList.stream().sorted(Comparator.comparing(PostDto.PostResponseDto::getRegistrationDate).reversed()).collect(Collectors.toList());

        // List를 Page로 변환
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), postAndNoticeDtoList.size());
        PageImpl<PostDto.PostResponseDto> postAndNoticeDtosPage = new PageImpl<>(new ArrayList<>(), pageable, postAndNoticeDtoList.size());
        try {
            List<PostDto.PostResponseDto> postResponseDtos = postAndNoticeDtoList.subList(start, end);
            postAndNoticeDtosPage = new PageImpl<>(postResponseDtos, pageable, postAndNoticeDtoList.size());
        } catch (IllegalArgumentException ie) {
            // illegal endpoint index value
        }
        return postAndNoticeDtosPage;
    }

    /**
     * 내가 쓴, 댓글 단 게시글 목록 조회
     */
    public Page<PostDto.PostResponseDto> getPostsMy(String type, String loginId, Pageable pageable) {
        MyPostType myPostType = MyPostType.findMyPostType(type);  // 요청 글 종류
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회

        List<Post> posts = new ArrayList<>();
        if (myPostType == MyPostType.POST) {   // 내가 쓴 글
            // 내가 쓴 글 및 댓글 조회 - fetch join을 통한 쿼리 수 감소
            posts = postRepository.findByUserAndIsDeletedWithComment(loginUser, Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 내가 쓴 글 조회 최신순
        } else if (myPostType == MyPostType.COMMENT) {   // 댓글단 글
            posts = postRepository.findByUserFetchJoinComment(loginUser, Whether.N);  // 댓글 단 글 최신순 조회
        }

        // Post 엔티티를 PostsMyResponseDto로 변환
        List<PostDto.PostResponseDto> postDtoList = new ArrayList<>();
        for (Post post : posts) {
            postDtoList.add(
                    PostDto.PostResponseDto.builder()
                            .id(post.getId())
                            .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                            .title(post.getTitle())
                            .contents(post.getContents())
                            .registrationDate(post.getRegistrationDate())
                            .boardType(post.getBoardType())
                            .isAnonymous(post.getIsAnonymous())
                            .views(post.getViews())
                            .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                            .fileCount(post.getFileList().size())
                            .commentCount(post.getCommentList().size())
                            .build()
            );
        }

        // List를 Page로 변환
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), postDtoList.size());
        PageImpl<PostDto.PostResponseDto> postDtosPage = new PageImpl<>(new ArrayList<>(), pageable, postDtoList.size());
        try {
            List<PostDto.PostResponseDto> postResponseDtos = postDtoList.subList(start, end);
            postDtosPage = new PageImpl<>(postResponseDtos, pageable, postDtoList.size());
        } catch (IllegalArgumentException ie) {
            // illegal endpoint index value
        }
        return postDtosPage;
    }

    /**
     * 게시글 검색
     */
    public PostDto.PostsSearchResponseDto getPostsSearch(String keyword, String loginId, Pageable pageable) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        Page<Post> posts = postRepository.findByTitleContainingIgnoreCaseOrContentsContainingIgnoreCaseAndSchoolAndIsDeleted(keyword, keyword, loginUser.getSchool(), Whether.N, pageable);
        Page<PostDto.PostResponseDto> postDtos = posts.map(
                post -> PostDto.PostResponseDto.builder()
                        .id(post.getId())
                        .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                        .title(post.getTitle())
                        .contents(post.getContents())
                        .registrationDate(post.getRegistrationDate())
                        .boardType(post.getBoardType())
                        .isAnonymous(post.getIsAnonymous())
                        .views(post.getViews())
                        .likeCount(likeService.getLikeCount(TargetType.POST, post.getId()))
                        .fileCount(post.getFileList().size())
                        .commentCount(post.getCommentList().size())
                        .build()
        );
        return new PostDto.PostsSearchResponseDto(keyword, postDtos);
    }

    /**
     * 게시글 등록
     */
    public PostDto.PostResponseDto createPostWithFile(String loginId, String boardType, String isAnonymous, String title, String contents, List<MultipartFile> fileList) throws Exception {
        fileService.checkFileType(fileList);  // 첨부 파일 종류 확인
        fileService.checkFileCountLimitExceeded(fileList);  // 파일 최대 업로드 개수 초과여부 확인

        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        Post post = Post.createPost(loginUser, loginUser.getSchool(), BoardType.findBoardType(boardType), Whether.findWhether(isAnonymous), Whether.N, 0L, title, contents);  // 게시글 생성
        Post savedPost = postRepository.save(post);  // 게시글 등록
        fileService.createFiles(fileList, savedPost);  // 파일 등록

        return PostDto.PostResponseDto.builder()
                .id(savedPost.getId())  // 등록된 게시글 번호 반환
                .build();
    }

    /**
     * 게시글 등록 (첨부 파일 제외)
     */
    public PostDto.PostResponseDto createPost(String loginId, String boardType, String isAnonymous, String title, String contents) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        Post post = Post.createPost(loginUser, loginUser.getSchool(), BoardType.findBoardType(boardType), Whether.findWhether(isAnonymous), Whether.N, 0L, title, contents);  // 게시글 생성
        return PostDto.PostResponseDto.builder()
                .id(postRepository.save(post).getId())  // 게시글 등록 및 등록된 게시글 번호 반환
                .build();
    }

    /**
     * 게시글 수정 (첨부 파일 제외)
     */
    @Transactional
    public void updatePost(String loginId, Long postId, String isAnonymous, String title, String contents) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));  // 게시글 조회
        if (post.getUser() != loginUser)  // 다른 회원의 게시글 수정
            throw new NoRightsOfAccessException("해당 게시글의 수정 권한이 없음");
        post.edit(Whether.findWhether(isAnonymous), title, contents);  // 게시글 수정
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deletePost(String loginId, Long postId) {
        User loginUser = userService.getLoginUser(loginId);  // 회원 조회
        // 게시글 및 댓글, 사용자 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        Post post = postRepository.findByIdAndIsDeletedWithUserCommentUser(postId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));

        if (post.getUser() != loginUser)  // 다른 회원의 게시글 삭제
            throw new NoRightsOfAccessException("해당 게시글의 삭제 권한이 없음");

        // 댓글 삭제
        List<Comment> commentList = post.getCommentList();
        for (int i = commentList.size() - 1; i >= 0; i--) {
            commentList.get(i).delete(commentList.get(i).getUser(), post);
        }

        post.delete(loginUser);  // 게시글 삭제
    }

    /**
     * 게시글 조회수 갱신
     */
    @Transactional
    public void updateViews(Long postId, Long views) {
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));  // 게시글 조회
        Long totalViews = post.getViews() + views;  // 기존 조회수에 갱신
        post.changeViews(totalViews);
    }

    // 핫 게시글 조회(메인화면)
    List<Post> getHotPostsMain(User user, Pageable pageable) {
        return postRepository.findBySchoolAndIsDeletedAndId(user.getSchool(), Whether.N, TargetType.POST, 10L, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));
    }

    // 핫 게시글 조회(HOT 게시판)
    List<Post> getHotPostsMain(User user) {
        return postRepository.findBySchoolAndIsDeletedAndId(user.getSchool(), Whether.N, TargetType.POST, 10L);
    }

    // 게시판 별 게시글 조회
    Page<Post> getBoardPosts(User user, BoardType boardType, Pageable pageable) {
        return postRepository.findBySchoolAndBoardTypeAndIsDeleted(user.getSchool(), boardType, Whether.N, pageable);
    }

    // 회원의 좋아요 여부 확인
    public static Whether checkUserLike(List<Like> likeList, TargetType targetType, Long targetId) {
        for (Like like : likeList) {
            // 회원의 좋아요 리스트에 있을 때
            if (like.getTargetType() == targetType && like.getTargetId().equals(targetId))
                return Whether.Y;
        }
        return Whether.N;
    }

    // 게시글 작성자 조회
    String getWriter(User user, Whether isAnonymous) {
        if (user == null)  // 삭제된 유저 처리
            return "(알수없음)";
        else {
            if (isAnonymous == Whether.Y)  // 익명 처리
                return "익명";
            else
                return user.getNickname();  // 닉네임
        }
    }

    // 게시글 작성자 id 조회
    public static String getWriterLoginId(User user) {
        if (user == null)  // 삭제된 유저 처리
            return "삭제된 회원";
        else
            return user.getLoginId();
    }

}
