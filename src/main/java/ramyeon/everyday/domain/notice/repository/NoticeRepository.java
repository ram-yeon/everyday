package ramyeon.everyday.domain.notice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.enum_.Whether;
import ramyeon.everyday.domain.notice.entity.Notice;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.domain.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Page<Notice> findByIsDeleted(Whether isDeleted, Pageable pageable);

    @Query("SELECT DISTINCT n FROM Notice n" +
            " LEFT OUTER JOIN FETCH n.manager m" +
            " LEFT OUTER JOIN FETCH n.fileList" +
            " WHERE n.isDeleted = ?1")
    List<Notice> findByIsDeletedWithManagerFile(Whether isDeleted, Sort sort);  // 공지사항 목록 조회 - manager, fileList와 fetch join

    Optional<Notice> findByIdAndIsDeleted(Long id, Whether isDeleted);

    @Query("SELECT DISTINCT n FROM Notice n" +
            " LEFT OUTER JOIN FETCH n.manager m" +
            " LEFT OUTER JOIN FETCH n.fileList" +
            " WHERE n.id = ?1" +
            " and n.isDeleted = ?2")
    Optional<Notice> findByIdAndIsDeletedWithManagerFile(Long id, Whether isDeleted);  // 공지사항 상세 조회 - manager, fileList와 fetch join

    @Query("SELECT distinct n FROM Notice n" +
            " LEFT JOIN Like l" +
            " ON n.id = l.targetId" +
            " where l.user = ?1" +
            " and l.targetType= ?2" +
            " and n.isDeleted = ?3" +
            " order by n.registrationDate desc")
    List<Notice> findByUserAndBoardTypeAndIsDeleted(User user, TargetType targetType, Whether isDeleted);  // 좋아요한 공지사항 목록 조회

}
