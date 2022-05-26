package ramyeon.everyday.domain.notice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.Whether;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Page<Notice> findByIsDeleted(Whether isDeleted, Pageable pageable);  // 공지사항 목록 조회

    Optional<Notice> findByIdAndIsDeleted(Long id, Whether isDeleted);  // 공지사항 상세 조회

}
