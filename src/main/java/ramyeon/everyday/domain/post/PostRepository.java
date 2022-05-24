package ramyeon.everyday.domain.post;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.school.School;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySchoolAndBoardTypeAndIsDeleted(School school, BoardType boardType, Whether isDeleted, Sort sort);
}
