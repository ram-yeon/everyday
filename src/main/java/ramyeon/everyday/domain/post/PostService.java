package ramyeon.everyday.domain.post;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.like.LikeRepository;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.notice.Notice;
import ramyeon.everyday.domain.notice.NoticeRepository;
import ramyeon.everyday.domain.notice.NoticeService;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.PostDto;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final NoticeService noticeService;
    private final NoticeRepository noticeRepository;

    // 메인화면 게시글 목록 조회
    public Map<BoardType, List<PostDto.PostResponseDto>> getPostsMain(String loginId, Pageable pageable) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

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

    // 게시판 별 게시글 목록 조회
    public Page<PostDto.PostResponseDto> getPostsBoard(String loginId, String type, Pageable pageable) {
        BoardType boardType = BoardType.valueOf(type);  // 게시판 종류
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        if (boardType == BoardType.HOT) {  // 핫 게시판
            List<Long> hotPostIdList = likeRepository.findTargetIdByTargetIdGreaterThan(TargetType.POST, 10L);  // 핫 게시글 ID 조회
            List<Post> postsAll = postRepository.findBySchoolAndIsDeleted(loginUser.getSchool(), Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 게시글 최신순 조회
            // 핫 게시글 조회
            List<Post> postsHot = new ArrayList<>();
            for (Post post : postsAll) {
                for (Long hotPostId : hotPostIdList) {
                    if (post.getId().equals(hotPostId)) {
                        postsHot.add(post);
                    }
                }
            }
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
                                .likeCount(getLikeCount(post))
                                .fileCount(post.getFileList().size())
                                .commentCount(post.getCommentList().size())
                                .build()
                );
            }

            // List를 Page로 변환
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), postsBoardDtos.size());
            return new PageImpl<>(postsBoardDtos.subList(start, end), pageable, postsBoardDtos.size());

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
                            .likeCount(getLikeCount(post))
                            .fileCount(post.getFileList().size())
                            .commentCount(post.getCommentList().size())
                            .build()
            );
        }
    }

    // 게시글 상세 조회
    public PostDto.PostResponseDto getPostDetail(Long postId, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Post post = postRepository.findByIdAndSchoolAndIsDeleted(postId, loginUser.getSchool(), Whether.N).orElse(null);  // 게시글 조회
        if (post == null) {
            return null;
        } else {
            // File 엔티티를 FileInPostAndNoticeResponseDto로 변환
            List<File> fileList = post.getFileList();
            List<FileDto.FileInPostAndNoticeResponseDto> fileDtoList = new ArrayList<>();
            for (File file : fileList) {
                fileDtoList.add(new FileDto.FileInPostAndNoticeResponseDto(file.getSequence(), file.getUploadFilename(), file.getStoreFilename()));
            }

            // Comment 엔티티를 CommentInPostResponseDto로 변환
            List<Comment> commentList = post.getCommentList();
            List<CommentDto.CommentResponseDto> commentDtoList = new ArrayList<>();
            for (Comment comment : commentList) {
                commentDtoList.add(
                        CommentDto.CommentResponseDto.builder()
                                .id(comment.getId())
                                .writer(getCommentWriter(comment.getUser(), post.getUser(), comment.getIsAnonymous(), post.getIsAnonymous()))
                                .contents(comment.getContents())
                                .registrationDate(comment.getRegistrationDate())
                                .commentType(comment.getCommentType())
                                .preId(comment.getPreId())
                                .isAnonymous(comment.getIsAnonymous())
                                .build()
                );
            }

            return PostDto.PostResponseDto.builder()
                    .id(post.getId())
                    .writer(getWriter(post.getUser(), post.getIsAnonymous()))
                    .title(post.getTitle())
                    .contents(post.getContents())
                    .registrationDate(post.getRegistrationDate())
                    .boardType(post.getBoardType())
                    .isAnonymous(post.getIsAnonymous())
                    .views(post.getViews())
                    .likeCount(getLikeCount(post))
                    .fileCount(fileDtoList.size())
                    .file(fileDtoList)
                    .commentCount(commentDtoList.size())
                    .comment(commentDtoList)
                    .build();
        }
    }

    // 좋아요한 게시글, 공지사항 목록 조회
    public Page<PostDto.PostResponseDto> getLikePostsAndNotices(String loginId, Pageable pageable) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

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
                            .likeCount(getLikeCount(post))
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
        return new PageImpl<>(postAndNoticeDtoList.subList(start, end), pageable, postAndNoticeDtoList.size());
    }

    // 내가 쓴, 댓글 단 게시글 목록 조회
    public Page<PostDto.PostResponseDto> getPostsMy(String type, String loginId, Pageable pageable) {
        MyPostType myPostType = MyPostType.valueOf(type);  // 요청 글 종류
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

        List<Post> posts = new ArrayList<>();
        if (myPostType == MyPostType.POST) {   // 내가 쓴 글
            posts = postRepository.findByUserAndIsDeleted(loginUser, Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 내가 쓴 글 조회 최신순
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
                            .likeCount(getLikeCount(post))
                            .fileCount(post.getFileList().size())
                            .commentCount(post.getCommentList().size())
                            .build()
            );
        }

        // List를 Page로 변환
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), postDtoList.size());
        return new PageImpl<>(postDtoList.subList(start, end), pageable, postDtoList.size());
    }

    // 핫 게시글 조회(메인화면)
    List<Post> getHotPostsMain(User user, Pageable pageable) {
        List<Post> hotPosts = new ArrayList<>();
        List<Long> hotPostIdList = likeRepository.findTargetIdByTargetIdGreaterThan(TargetType.POST, 10L, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));  // 핫 게시글 ID 조회(메인화면)
        List<Post> postsAll = postRepository.findBySchoolAndIsDeleted(user.getSchool(), Whether.N, pageable.getSort());  // 게시글 최신순 조회

        // 핫 게시글 조회
        for (Post post : postsAll) {
            for (Long hotPostId : hotPostIdList) {
                if (post.getId().equals(hotPostId)) {
                    hotPosts.add(post);
                }
            }
        }
        return hotPosts;
    }

    // 게시판 별 게시글 조회
    Page<Post> getBoardPosts(User user, BoardType boardType, Pageable pageable) {
        return postRepository.findBySchoolAndBoardTypeAndIsDeleted(user.getSchool(), boardType, Whether.N, pageable);
    }

    // 좋아요 수 조회
    Long getLikeCount(Post post) {
        return likeRepository.countByTargetTypeAndTargetId(TargetType.POST, post.getId());
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

    // 댓글 작성자 조회
    String getCommentWriter(User commentUser, User postUser, Whether commentIsAnonymous, Whether postIsAnonymous) {
        if (commentUser == null)  // 삭제된 유저 처리
            return "(알수없음)";
        else {
            // 게시글 작성자와 댓글 작성자가 같고, 게시글이 익명이 아니고, 댓글이 익명일 때
            if (commentUser == postUser && postIsAnonymous == Whether.N && commentIsAnonymous == Whether.Y)
                return "익명";
            if (commentIsAnonymous == Whether.Y) {  // 익명 처리
                if (commentUser == postUser)  // 글 작성자와 댓글 작성자가 같으면
                    return "익명(글쓴이)";
                else   // 글 작성자와 댓글 작성자가 다르면
                    return "익명";
            } else
                return commentUser.getNickname();  // 닉네임
        }
    }

    // 게시글 검색
    public PostDto.PostsSearchResponseDto getPostsSearch(String keyword, String loginId, Pageable pageable) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
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
                        .likeCount(getLikeCount(post))
                        .fileCount(post.getFileList().size())
                        .commentCount(post.getCommentList().size())
                        .build()
        );
        return new PostDto.PostsSearchResponseDto(keyword, postDtos);
    }

    // 게시글 삭제
    @Transactional
    public int deletePost(String loginId, Long postId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElse(null);  // 게시글 조회
        if (post.getUser() != loginUser) {  // 다른 회원의 게시글 삭제
            return 1;
        }
        post.delete(loginUser);  // 게시글 삭제
        return 0;
    }

    // 게시글 조회수 갱신
    @Transactional
    public void updateViews(Long postId, Long views) {
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElse(null);
        Long totalViews = post.getViews() + views;  // 기존 조회수에 갱신
        post.changeViews(totalViews);
    }
}
