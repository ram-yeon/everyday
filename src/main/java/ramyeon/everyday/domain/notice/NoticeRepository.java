package ramyeon.everyday.domain.notice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Page<Notice> findByIsDeleted(Whether isDeleted, Pageable pageable);  // 공지사항 목록 조회

    Optional<Notice> findByIdAndIsDeleted(Long id, Whether isDeleted);  // 공지사항 상세 조회

    @Query("SELECT distinct n FROM Notice n" +
            " LEFT JOIN Like l" +
            " ON n.id = l.targetId" +
            " where l.user = ?1" +
            " and l.targetType= ?2" +
            " and n.isDeleted = ?3" +
            " order by n.registrationDate desc")
    List<Notice> findByUserAndBoardTypeAndIsDeleted(User user, TargetType targetType, Whether isDeleted);  // 좋아요한 공지사항 목록 조회

}
