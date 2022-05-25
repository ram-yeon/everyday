package ramyeon.everyday.domain.notice;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.Whether;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByIsDeleted(Whether isDeleted, Sort sort);  // 공지사항 목록 조회

}
