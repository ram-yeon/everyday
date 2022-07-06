package ramyeon.everyday.domain.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.user.User;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Long countByUser(User user);  // 회원의 댓글 수 조회
}
