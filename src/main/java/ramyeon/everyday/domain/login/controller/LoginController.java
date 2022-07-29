package ramyeon.everyday.domain.login.controller;

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
import ramyeon.everyday.domain.login.service.EmailSendService;
import ramyeon.everyday.domain.login.service.LoginService;
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
        String jwtToken;
        try {
            // 로그인 시도
            Authentication authentication = loginService.attemptLogin(loginRequestDto.getLoginId(), loginRequestDto.getPassword(), loginRequestDto.getType());
            // JWT 토큰 발급
            jwtToken = loginService.generateJwtToken(authentication, loginRequestDto.getIsKeptLogin());
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return new ResponseEntity<>(new ResultDto(401, e.getMessage()), HttpStatus.UNAUTHORIZED);
        } catch (InternalAuthenticationServiceException iase) {
            return new ResponseEntity<>(new ResultDto(401, "존재하지 않는 사용자입니다."), HttpStatus.UNAUTHORIZED);
        } catch (NotFoundEnumException ee) {
            return new ResponseEntity<>(new ResultDto(400, ee.getMessage()), HttpStatus.BAD_REQUEST);
        }

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
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        } catch (NotFoundEnumException ee) {
            return new ResponseEntity<>(new ResultDto(400, ee.getMessage()), HttpStatus.BAD_REQUEST);
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
        boolean isSuccess;
        try {
            isSuccess = emailSendService.checkAuthenticationCode(authenticationCodeRequestDto.getEmail(), authenticationCodeRequestDto.getAuthenticationCode());
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(400, re.getMessage()), HttpStatus.BAD_REQUEST);
        }
        if (isSuccess)
            return new ResponseEntity<>(new ResultDto(200, "인증 성공"), HttpStatus.OK);
        else   // 인증코드가 틀림
            return new ResponseEntity<>(new ResultDto(401, "인증 실패: 인증코드가 틀림"), HttpStatus.UNAUTHORIZED);
    }

    /**
     * 아이디 찾기 API
     */
    @PostMapping("/find-id")
    public ResponseEntity findId(@RequestBody UserDto.EmailRequestDto emailRequestDto) {
        try {
            emailSendService.sendLoginId(emailRequestDto.getEmail());
            return new ResponseEntity<>(new ResultDto(200, "아이디 찾기 안내 이메일 발송 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
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
