package ramyeon.everyday.domain.login.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.login.service.LogoutService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.enum_.AccountAuthority;
import ramyeon.everyday.exception.NotFoundResourceException;

@RestController
@RequiredArgsConstructor
public class LogoutController {

    private final LogoutService logoutService;

    /**
     * 로그아웃 API
     */
    @GetMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                 @AuthenticationPrincipal ManagerDetails managerDetails) {
        try {
            if (principalDetails != null) {  // 사용자 로그아웃
                logoutService.logout(principalDetails.getUsername(), AccountAuthority.USER);
            } else {  // 관리자 로그아웃
                logoutService.logout(managerDetails.getUsername(), AccountAuthority.MANAGER);
            }
            return new ResponseEntity<>(new ResultDto(200, "로그아웃 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }

    }

}
