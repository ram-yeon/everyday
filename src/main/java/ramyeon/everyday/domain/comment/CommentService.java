package ramyeon.everyday.domain.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.like.LikeService;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.post.PostRepository;
import ramyeon.everyday.domain.post.PostService;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.exception.NotFoundResourceException;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeService likeService;

    /**
     * 댓글 등록
     */
    public CommentDto.CommentResponseDto createComment(String loginId, CommentDto.CommentCreateRequestDto createRequestDto) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Post post = postRepository.findByIdAndIsDeleted(createRequestDto.getPostId(), Whether.N).orElse(null);  // 게시글 조회
        Comment comment = Comment.addComment(createRequestDto.getContents(), CommentType.valueOf(createRequestDto.getCommentType()), createRequestDto.getPreId(),
                Whether.valueOf(createRequestDto.getIsAnonymous()), loginUser, post);
        return CommentDto.CommentResponseDto.builder()
                .id(commentRepository.save(comment).getId())  // 댓글 등록
                .build();
    }

    /**
     * 댓글 조회
     */
    public CommentDto.CommentsDto getComments(String loginId, Long postId, Sort sort) {
        // 회원 및 좋아요 조회- fetch join을 통한 성능 최적화로 쿼리 수 감소
        User loginUser = userRepository.findByLoginIdTargetTypeInWithLike(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));  // 게시글 조회

        // 댓글, 작성자 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        List<Comment> commentList = commentRepository.findByPostAndCommentTypeWithUser(post, CommentType.COMMENT, sort);  // 댓글 조회

        // Comment 엔티티를 CommentResponseDto로 변환
        List<CommentDto.CommentResponseDto> commentDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentDtoList.add(entityToDto(comment, post, loginUser));
        }

        return CommentDto.CommentsDto.builder()
                .commentCount(commentDtoList.size())
                .comment(commentDtoList)
                .build();
    }

    /**
     * 대댓글 조회
     */
    public CommentDto.CommentResponseDto getReply(String loginId, Long postId, Long preId) {
        // 회원 및 좋아요 조회- fetch join을 통한 성능 최적화로 쿼리 수 감소
        User loginUser = userRepository.findByLoginIdTargetTypeInWithLike(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회
        Post post = postRepository.findByIdAndIsDeleted(postId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 게시글"));  // 게시글 조회

        // 대댓글, 작성자 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        Comment reply = commentRepository.findByPreIdAndPostAndCommentTypeWithUser(preId, post, CommentType.REPLY).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 대댓글"));  // 대댓글 조회

        return entityToDto(reply, post, loginUser);  // Comment 엔티티를 CommentResponseDto로 변환 후 리턴
    }

    /**
     * 댓글 삭제
     */
    public int deleteComment(String loginId, Long commentId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Comment comment = commentRepository.findById(commentId).orElse(null);  // 댓글 조회
        if (comment.getUser() != loginUser) {  // 남의 댓글 삭제
            return 1;
        }
        comment.delete(loginUser, comment.getPost());
        commentRepository.delete(comment);
        return 0;
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

    // Comment 엔티티를 CommentResponseDto로 변환
    private CommentDto.CommentResponseDto entityToDto(Comment comment, Post post, User loginUser) {
        return CommentDto.CommentResponseDto.builder()
                .id(comment.getId())
                .writer(getCommentWriter(comment.getUser(), post.getUser(), comment.getIsAnonymous(), post.getIsAnonymous()))
                .writerLoginId(PostService.getWriterLoginId(comment.getUser()))
                .contents(comment.getContents())
                .registrationDate(comment.getRegistrationDate())
                .commentType(comment.getCommentType())
                .preId(comment.getPreId())
                .isAnonymous(comment.getIsAnonymous())
                .isLikeComment(PostService.checkUserLike(loginUser.getLikeList(), TargetType.COMMENT, comment.getId()))  // 해당 댓글을 좋아요 했는지 확인
                .likeCount(likeService.getLikeCount(TargetType.COMMENT, comment.getId()))
                .build();
    }
}
