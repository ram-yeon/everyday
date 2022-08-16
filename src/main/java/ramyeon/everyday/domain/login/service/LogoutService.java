package ramyeon.everyday.domain.login.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.domain.manager.service.ManagerService;
import ramyeon.everyday.domain.token.service.TokenService;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.service.UserService;
import ramyeon.everyday.enum_.AccountAuthority;

@Service
@AllArgsConstructor
public class LogoutService {

    private final UserService userService;
    private final ManagerService managerService;
    private final TokenService tokenService;

    @Transactional
    public void logout(String loginId, AccountAuthority accountAuthority) {
        switch (accountAuthority) {
            // 사용자 로그아웃
            case USER:
                User user = userService.getLoginUser(loginId);  // 회원 조회
                tokenService.deleteToken(user.getToken());  // 토큰 삭제
                break;

            // 관리자 로그아웃
            case MANAGER:
                Manager manager = managerService.getLoginManager(loginId);  // 관리자 조회
                tokenService.deleteToken(manager.getToken());  // 토큰 삭제
                break;
        }
    }

}
