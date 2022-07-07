package ramyeon.everyday.domain.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findBySchoolAndBoardTypeAndIsDeleted(School school, BoardType boardType, Whether isDeleted, Pageable pageable);  // 게시판 별 게시글 목록 조회

    List<Post> findBySchoolAndIsDeleted(School school, Whether isDeleted, Sort sort);  // 학교 게시글 조회

    @Query("SELECT DISTINCT p FROM Post p" +
            " LEFT OUTER JOIN FETCH p.user u" +
            " LEFT OUTER JOIN FETCH p.commentList c" +
            " LEFT OUTER JOIN FETCH c.user cu" +
            " WHERE p.id = ?1" +
            " and p.school = ?2" +
            " and p.isDeleted = ?3")
    Optional<Post> findByIdAndSchoolAndIsDeletedWithUserCommentUser(Long id, School school, Whether isDeleted);  // 게시글 상세 조회 - commentList, user와 fetch join

    @Query("SELECT DISTINCT p FROM Post p" +
            " LEFT OUTER JOIN FETCH p.commentList" +
            " WHERE p.user = ?1" +
            " and p.isDeleted = ?2")
    List<Post> findByUserAndIsDeletedWithComment(User user, Whether isDeleted, Sort sort);  // 내가 쓴 글 목록 조회 - commentList와 fetch join

    @Query("SELECT distinct p FROM Post p" +
            " LEFT JOIN Like l" +
            " ON p.id = l.targetId" +
            " where l.user = ?1" +
            " and l.targetType= ?2" +
            " and p.isDeleted = ?3" +
            " order by p.registrationDate desc")
    List<Post> findByUserAndBoardTypeAndIsDeleted(User user, TargetType targetType, Whether isDeleted);  // 좋아요한 글 목록 조회

    @Query("select distinct p from Post p" +
            " join fetch p.commentList c" +
            " where c.user = ?1" +
            " and p.isDeleted = ?2" +
            " order by p.registrationDate desc")
    List<Post> findByUserFetchJoinComment(User user, Whether isDeleted);  // 댓글 단 글 목록 조회

    Optional<Post> findByIdAndIsDeleted(Long id, Whether isDeleted);

    Page<Post> findByTitleContainingIgnoreCaseOrContentsContainingIgnoreCaseAndSchoolAndIsDeleted(String title, String contents, School school, Whether isDeleted, Pageable pageable);  // 게시글 검색
}
