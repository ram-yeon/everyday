package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.login.LogoutService;
import ramyeon.everyday.dto.ResultDto;

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
        if (principalDetails != null) {  // 사용자 로그아웃
            logoutService.logout(principalDetails.getUsername(), AccountAuthority.USER);
        } else {  // 관리자 로그아웃
            logoutService.logout(managerDetails.getUsername(), AccountAuthority.MANAGER);
        }
        return new ResponseEntity<>(new ResultDto(200, "로그아웃 성공"), HttpStatus.OK);
    }

}
