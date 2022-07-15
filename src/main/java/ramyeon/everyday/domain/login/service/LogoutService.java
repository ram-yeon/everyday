package ramyeon.everyday.domain.login.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.enum_.AccountAuthority;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.domain.manager.repository.ManagerRepository;
import ramyeon.everyday.domain.token.service.TokenService;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
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
