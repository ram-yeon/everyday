package ramyeon.everyday.domain.login;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.domain.manager.Manager;
import ramyeon.everyday.domain.manager.ManagerRepository;
import ramyeon.everyday.domain.token.TokenService;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.exception.NotFoundResourceException;

@Service
@AllArgsConstructor
public class LogoutService {

    private final UserRepository userRepository;
    private final ManagerRepository managerRepository;
    private final TokenService tokenService;

    @Transactional
    public void logout(String loginId, AccountAuthority accountAuthority) {
        switch (accountAuthority) {
            // 사용자 로그아웃
            case USER:
                User user = userRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);
                tokenService.deleteToken(user.getToken());  // 토큰 삭제
                break;

            // 관리자 로그아웃
            case MANAGER:
                Manager manager = managerRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);
                tokenService.deleteToken(manager.getToken());  // 토큰 삭제
                break;
        }
    }

}
