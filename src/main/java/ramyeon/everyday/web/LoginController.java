package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.domain.login.EmailSendService;
import ramyeon.everyday.domain.login.LoginService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;
import ramyeon.everyday.exception.NotFoundEnumException;
import ramyeon.everyday.exception.NotFoundResourceException;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

import static ramyeon.everyday.jwt.JwtProperties.HEADER_KEY_NAME;
import static ramyeon.everyday.jwt.JwtProperties.TOKEN_PREFIX;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final EmailSendService emailSendService;
    private final LoginService loginService;

    /**
     * 로그인 API
     */
    @PostMapping("/login")
    public ResponseEntity login(HttpServletResponse response, @RequestBody UserDto.LoginRequestDto loginRequestDto) {
        Authentication authentication;

        try {
            // 로그인 시도
            authentication = loginService.attemptLogin(loginRequestDto.getLoginId(), loginRequestDto.getPassword(), loginRequestDto.getType());
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return new ResponseEntity<>(new ResultDto(401, e.getMessage()), HttpStatus.UNAUTHORIZED);
        } catch (InternalAuthenticationServiceException iase) {
            return new ResponseEntity<>(new ResultDto(401, "존재하지 않는 사용자입니다."), HttpStatus.UNAUTHORIZED);
        }

        String jwtToken = loginService.generateJwtToken(authentication, loginRequestDto.getType(), loginRequestDto.getIsKeptLogin());  // 토큰 발급
        response.addHeader(HEADER_KEY_NAME, TOKEN_PREFIX + jwtToken);  // 헤더에 JWT 추가

        return new ResponseEntity<>(new ResultDto(200, "로그인 성공"), HttpStatus.OK);
    }

    /**
     * 이메일 인증 API
     */
    @PostMapping("/email-authenticate")
    public ResponseEntity emailAuthenticate(@RequestBody UserDto.EmailAuthenticationRequestDto emailAuthenticationRequestDto) {
        String code;
        try {
            code = emailSendService.sendCode(emailAuthenticationRequestDto.getEmail(), emailAuthenticationRequestDto.getType(), emailAuthenticationRequestDto.getLoginId());  // 인증코드 발송
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, "아이디와 이메일 정보가 다름"), HttpStatus.NOT_FOUND);
        } catch (NotFoundEnumException ee) {
            return new ResponseEntity<>(new ResultDto(404, "잘못된 [type] 값"), HttpStatus.NOT_FOUND);
        }

        Map<String, String> data = new HashMap<>();
        data.put("authenticationCode", code);

        return new ResponseEntity<>(new ResultDto(200, "인증코드 발송 성공", data), HttpStatus.OK);
    }

    /**
     * 인증코드 확인 API
     */
    @PostMapping("/check-authenticationcode")
    public ResponseEntity checkAuthenticationCode(@RequestBody UserDto.CheckAuthenticationCodeRequestDto authenticationCodeRequestDto) {
        int result = emailSendService.checkAuthenticationCode(authenticationCodeRequestDto.getEmail(), authenticationCodeRequestDto.getAuthenticationCode());
        if (result > 0) {
            if (result == 1) {  // 인증코드가 틀림
                return new ResponseEntity<>(new ResultDto(400, "인증 실패: 인증코드가 틀림"), HttpStatus.BAD_REQUEST);
            } else {  // 이메일이 틀림
                return new ResponseEntity<>(new ResultDto(400, "인증 실패: 이메일이 틀림"), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new ResultDto(200, "인증 성공"), HttpStatus.OK);
        }
    }


    /**
     * 아이디 찾기 API
     */
    @PostMapping("/find-id")
    public ResponseEntity findId(@RequestBody UserDto.EmailRequestDto emailRequestDto) {
        boolean sendLoginId = emailSendService.sendLoginId(emailRequestDto.getEmail());
        if (sendLoginId) {
            return new ResponseEntity<>(new ResultDto(200, "아이디 찾기 안내 이메일 발송 성공"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResultDto(404, "해당 이메일로 가입된 아이디 없음"), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 비밀번호 찾기 API
     */
    @PostMapping("/find-password")
    public ResponseEntity findPassword(@RequestBody UserDto.FindPasswordRequestDto findPasswordRequestDto) {
        boolean isSuccess = loginService.findUserForFindPassword(findPasswordRequestDto.getLoginId());
        if (isSuccess) {
            return new ResponseEntity<>(new ResultDto(200, "가입된 아이디 있음"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResultDto(404, "가입된 아이디 없음"), HttpStatus.NOT_FOUND);
        }
    }

}
