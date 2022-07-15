package ramyeon.everyday.domain.comment;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.user.User;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Long countByUser(User user);  // 회원의 작성 댓글 수 조회

    @Query("SELECT DISTINCT c FROM Comment c" +
            " LEFT OUTER JOIN FETCH c.user" +
            " WHERE c.post = ?1" +
            " and c.commentType = ?2")
    List<Comment> findByPostAndCommentTypeWithUser(Post post, CommentType commentType, Sort sort);  // 댓글 조회 - user와 fetch join

    @Query("SELECT DISTINCT c FROM Comment c" +
            " LEFT OUTER JOIN FETCH c.user" +
            " WHERE c.preId = ?1" +
            " and c.post = ?2" +
            " and c.commentType = ?3")
    List<Comment> findByPreIdAndPostAndCommentTypeWithUser(Long preId, Post post, CommentType commentType, Sort sort);  // 대댓글 조회 - user와 fetch join
}
