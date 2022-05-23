package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.domain.login.EmailSendService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final EmailSendService emailSendService;

    /**
     * 이메일 인증 API
     */
    @PostMapping("/email-authenticate")
    public ResponseEntity emailAuthenticate(@RequestBody UserDto.EmailRequestDto emailRequestDto) {

        String code = emailSendService.sendCode(emailRequestDto.getEmail());  // 인증코드 발송

        Map<String, String> data = new HashMap<>();
        data.put("authenticationCode", code);

        return new ResponseEntity<>(new ResultDto(200, "인증코드 발송 성공", data), HttpStatus.OK);
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
}
