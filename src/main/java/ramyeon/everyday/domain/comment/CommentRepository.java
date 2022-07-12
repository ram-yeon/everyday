package ramyeon.everyday.domain.comment;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.user.User;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Long countByUser(User user);  // 회원의 작성 댓글 수 조회

    List<Comment> findByPostAndCommentType(Post post, CommentType commentType, Sort sort);  // 댓글 조회
}
