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
                    deleteUserToken(user.getToken());  // 토큰 삭제
                }
                // 토큰 등록
                tokenRepository.save(Token.createUserToken(accessToken, user));

                break;

            // 관리자의 토큰 등록
            case MANAGER:
                Manager manager = managerRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);

                // 토큰이 이미 존재하면
                if (isManagerTokenExisted(manager)) {
                    deleteManagerToken(manager.getToken());  // 토큰 삭제
                }
                // 토큰 등록
                tokenRepository.save(Token.createManagerToken(accessToken, manager));

                break;
        }
    }

    /**
     * 사용자의 토큰 삭제
     */
    @Transactional
    public void deleteUserToken(Token token) {
        token.getUser().setToken(null);
        tokenRepository.delete(token);
    }

    /**
     * 관리자의 토큰 삭제
     */
    @Transactional
    public void deleteManagerToken(Token token) {
        token.getManager().setToken(null);
        tokenRepository.delete(token);
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
