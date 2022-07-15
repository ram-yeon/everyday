package ramyeon.everyday.domain.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.school.entity.School;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Long> {

    Optional<School> findBySchoolName(String schoolName);

    @Query("select s.schoolName from School s" +
            " join s.userList u" +
            " where u.id = ?1")
    String findSchoolNameByUserId(Long userId);

    @Query("SELECT DISTINCT s FROM School s" +
            " LEFT OUTER JOIN FETCH s.userList" +
            " order by s.schoolName")
    List<School> findAllWithUserList();  // 학교 조회 - userList와 fetch join
}
