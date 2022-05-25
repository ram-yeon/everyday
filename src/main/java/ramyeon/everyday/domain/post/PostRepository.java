package ramyeon.everyday.domain.post;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySchoolAndBoardTypeAndIsDeleted(School school, BoardType boardType, Whether isDeleted, Sort sort);  // 게시판 별 게시글 목록 조회

    List<Post> findBySchoolAndIsDeleted(School school, Whether isDeleted, Sort sort);  // 학교 게시글 조회

    Optional<Post> findByIdAndSchoolAndIsDeleted(Long id, School school, Whether isDeleted);  // 게시글 상세 조회

    List<Post> findByUserAndIsDeleted(User user, Whether isDeleted, Sort sort);  // 내가 쓴 글 목록 조회

    @Query("select distinct p from Post p" +
            " join fetch p.commentList c" +
            " where c.user = ?1" +
            " order by p.registrationDate desc")
    List<Post> findByUserFetchJoinComment(User user);  // 댓글 단 글 목록 조회

}
