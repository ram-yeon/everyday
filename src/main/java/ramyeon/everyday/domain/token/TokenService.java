package ramyeon.everyday.domain.token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.domain.manager.Manager;
import ramyeon.everyday.domain.manager.ManagerRepository;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.exception.NotFoundResourceException;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;

    /**
     * 토큰 등록
     */
    @Transactional
    public void addToken(String accessToken, String loginId, AccountAuthority accountAuthority) {
        switch (accountAuthority) {
            // 사용자의 토큰 등록
            case USER:
                User user = userRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);

                // 토큰이 이미 존재하면
                if (isUserTokenExisted(user)) {
                    deleteToken(user.getToken());  // 토큰 삭제
                }
                // 토큰 등록
                tokenRepository.save(Token.createUserToken(accessToken, user));

                break;

            // 관리자의 토큰 등록
            case MANAGER:
                Manager manager = managerRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);

                // 토큰이 이미 존재하면
                if (isManagerTokenExisted(manager)) {
                    deleteToken(manager.getToken());  // 토큰 삭제
                }
                // 토큰 등록
                tokenRepository.save(Token.createManagerToken(accessToken, manager));

                break;
        }
    }

    /**
     * 토큰 문자열로 토큰 조회
     */
    public Token getToken(String token) {
        return tokenRepository.findByAccessToken(token).orElseThrow(NotFoundResourceException::new);
    }

    /**
     * 토큰 삭제
     */
    @Transactional
    public void deleteToken(Token token) {
        tokenRepository.delete(token);
        User user = token.getUser();
        if (user != null) {  // 사용자의 토큰이면
            user.setToken(null);  // 사용자가 참조한 토큰 제거
        } else {
            token.getManager().setToken(null);  // 관리자가 참조한 토큰 제거
        }
    }

    /**
     * 사용자의 토큰 존재 여부 확인
     */
    public boolean isUserTokenExisted(User user) {
        return user.getToken() != null;
    }

    /**
     * 관리자의 토큰 존재 여부 확인
     */
    public boolean isManagerTokenExisted(Manager manager) {
        return manager.getToken() != null;
    }

}
