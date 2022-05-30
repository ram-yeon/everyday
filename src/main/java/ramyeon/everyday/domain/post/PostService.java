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
import ramyeon.everyday.domain.notice.NoticeService;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.PostDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final NoticeService noticeService;

    // 메인화면 게시글 목록 조회
    public Map<String, List<PostDto.PostsMainResponseDto>> getPostsMain(String loginId, Pageable pageable) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

        Map<String, List<PostDto.PostsMainResponseDto>> postsMainMap = new HashMap<>();

        // 핫 게시글 조회
        List<PostDto.PostsMainResponseDto> hotPostList = getHotPostsMain(loginUser, pageable)
                .stream().map(hotPost -> new PostDto.PostsMainResponseDto(hotPost.getId(), hotPost.getTitle(), hotPost.getRegistrationDate())).collect(Collectors.toList());
        postsMainMap.put("HOT", hotPostList);

        // 게시판 별 게시글 조회
        for (BoardType boardType : BoardType.values()) {
            List<PostDto.PostsMainResponseDto> boardPostList = getBoardPosts(loginUser, boardType, pageable)
                    .stream().map(boardPost -> new PostDto.PostsMainResponseDto(boardPost.getId(), boardPost.getTitle(), boardPost.getRegistrationDate())).collect(Collectors.toList());
            postsMainMap.put(boardType.name(), boardPostList);
        }

        // 공지사항 조회
        List<PostDto.PostsMainResponseDto> noticeList = noticeService.getNoticesPaging(pageable)
                .stream().map(notice -> new PostDto.PostsMainResponseDto(notice.getId(), notice.getTitle(), notice.getRegistrationDate())).collect(Collectors.toList());
        postsMainMap.put("NOTICE", noticeList);

        return postsMainMap;
    }

    // 게시판 별 게시글 목록 조회
    public Page<PostDto.PostsBoardDto> getPostsBoard(String loginId, String boardType, Pageable pageable) {
        if (boardType.equals("HOT")) {  // 핫 게시판
            User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
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
            List<PostDto.PostsBoardDto> postsBoardDtos = new ArrayList<>();
            for (Post post : postsHot) {
                postsBoardDtos.add(new PostDto.PostsBoardDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                        post.getIsAnonymous(), post.getViews(), getLikeCount(post), post.getFileList().size(), post.getCommentList().size()));
            }

            // List를 Page로 변환
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), postsBoardDtos.size());
            return new PageImpl<>(postsBoardDtos.subList(start, end), pageable, postsBoardDtos.size());

        } else {  // 자유, 정보, 동아리 게시판
            BoardType board = BoardType.valueOf(boardType);
            User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
            Page<Post> posts = getBoardPosts(loginUser, board, pageable);// 게시글 조회 최근순 정렬
            return posts.map(
                    post -> new PostDto.PostsBoardDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                            post.getIsAnonymous(), post.getViews(), getLikeCount(post), post.getFileList().size(), post.getCommentList().size())
            );
        }
    }

    // 게시글 상세 조회
    public PostDto.PostDetailResponseDto getPostDetail(Long postId, String loginId) {
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
            List<CommentDto.CommentInPostResponseDto> commentDtoList = new ArrayList<>();
            for (Comment comment : commentList) {
                commentDtoList.add(new CommentDto.CommentInPostResponseDto(comment.getId(), comment.getUser().getNickname(), comment.getContents(), comment.getRegistrationDate(),
                        comment.getCommentType(), comment.getPreId(), comment.getIsAnonymous()));
            }

            return new PostDto.PostDetailResponseDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                    post.getBoardType(), post.getIsAnonymous(), post.getViews(), getLikeCount(post), fileDtoList.size(), fileDtoList, commentDtoList.size(), commentDtoList);
        }
    }

    // 내가 쓴, 댓글 단, 좋아요한 게시글 목록 조회
    public Page<PostDto.PostsMyResponseDto> getPostsMy(String type, String loginId, Pageable pageable) {
        if (!(type.equals("posts") || type.equals("comments") || type.equals("likes"))) {  // 잘못된 URI
            return null;
        }
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

        List<Post> posts = new ArrayList<>();
        // 무슨 종류의 글 요청인지 구분
        switch (type) {
            case "posts":   // 내가 쓴 글
                posts = postRepository.findByUserAndIsDeleted(loginUser, Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 내가 쓴 글 조회 최신순
                break;
            case "comments":   // 댓글단 글
                posts = postRepository.findByUserFetchJoinComment(loginUser);  // 댓글 단 글 최신순 조회
                break;
            case "likes":   // 좋아요 한 글
                List<LikeRepository.TargetIdOnly> postIdList = likeRepository.findTargetIdByTargetTypeAndUser(TargetType.POST, loginUser);  // 좋아요 한 글 ID 조회
                List<Post> postsAll = postRepository.findBySchoolAndIsDeleted(loginUser.getSchool(), Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 게시글 최신순 조회
                // 좋아요 한 글 조회
                for (Post post : postsAll) {
                    for (LikeRepository.TargetIdOnly postId : postIdList) {
                        if (post.getId().equals(postId.getTargetId())) {
                            posts.add(post);
                        }
                    }
                }
                break;
        }

        // Post 엔티티를 PostsMyResponseDto로 변환
        List<PostDto.PostsMyResponseDto> postDtoList = new ArrayList<>();
        for (Post post : posts) {
            postDtoList.add(new PostDto.PostsMyResponseDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                    post.getBoardType(), post.getIsAnonymous(), post.getViews(), getLikeCount(post), post.getFileList().size(), post.getCommentList().size()));
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
