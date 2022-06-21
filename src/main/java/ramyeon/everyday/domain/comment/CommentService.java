package ramyeon.everyday.domain.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.post.PostRepository;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.CommentDto;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

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

}
