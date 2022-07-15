package ramyeon.everyday.domain.token.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.token.entity.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM Token t" +
            " LEFT OUTER JOIN FETCH t.user" +
            " LEFT OUTER JOIN FETCH t.manager" +
            " where t.accessToken = ?1")
    Optional<Token> findByAccessTokenWithUserManager(String accessToken);  // 토큰 조회 - user, manager와 fetch join

}
