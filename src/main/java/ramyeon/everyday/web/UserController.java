package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.domain.user.UserService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 비밀번호 변경 API
     */
    @PatchMapping("/users/password/edit")
    public ResponseEntity changePassword(@RequestBody UserDto.ChangePasswordRequestDto changePasswordRequestDto) {
        int result = userService.changePassword(changePasswordRequestDto.getEmail(), changePasswordRequestDto.getPassword());
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "비밀번호 변경 성공"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResultDto(404, "해당 이메일로 가입된 회원 없음"), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 회원 등록 API
     */
    @PostMapping("/users")
    public ResponseEntity register(@RequestBody UserDto.RegisterRequestDto registerRequestDto) {
        int result = userService.register(registerRequestDto.getLoginId(), registerRequestDto.getPassword(), registerRequestDto.getName(), registerRequestDto.getEmail(), registerRequestDto.getNickname(), registerRequestDto.getAdmissionYear(), registerRequestDto.getSchoolName());
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "회원가입 성공"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResultDto(404, "해당 학교가 없음"), HttpStatus.NOT_FOUND);
        }
    }
}
