package ramyeon.everyday.domain.post;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.school.School;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySchoolAndBoardTypeAndIsDeleted(School school, BoardType boardType, Whether isDeleted, Sort sort);  // 게시판 별 게시글 목록 조회

    Optional<Post> findByIdAndSchoolAndIsDeleted(Long id, School school, Whether isDeleted);  // 게시글 상세 조회
}
