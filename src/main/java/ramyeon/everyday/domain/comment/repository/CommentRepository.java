package ramyeon.everyday.domain.comment.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.comment.entity.Comment;
import ramyeon.everyday.domain.post.entity.Post;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.enum_.CommentType;
import ramyeon.everyday.enum_.Whether;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Long countByUser(User user);  // 회원의 작성 댓글 수 조회

    Optional<Comment> findByIdAndIsDeleted(Long id, Whether isDeleted);

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
