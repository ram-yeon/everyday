package ramyeon.everyday.domain.school;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Long> {

    Optional<School> findBySchoolName(String schoolName);

    @Query("select s.schoolName from School s" +
            " join s.userList u" +
            " where u.id = ?1")
    String findSchoolNameByUserId(Long userId);
}
