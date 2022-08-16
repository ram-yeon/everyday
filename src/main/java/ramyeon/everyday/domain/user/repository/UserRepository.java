package ramyeon.everyday.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.enum_.Whether;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);

    Optional<User> findByLoginIdAndIsDeleted(String loginId, Whether isDeleted);

    @Query("SELECT u FROM User u" +
            " LEFT OUTER JOIN FETCH u.likeList l" +
            " WHERE u.loginId = ?1")
    Optional<User> findByLoginIdTargetTypeInWithLike(String loginId);  // 회원 조회 - likeList와 fetch join

    Optional<User> findByEmail(String email);

    Optional<User> findByLoginIdAndEmail(String loginId, String email);

    Optional<User> findByNickname(String nickname);

}
