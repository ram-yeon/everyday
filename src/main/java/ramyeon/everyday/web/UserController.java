package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.user.UserService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;
import ramyeon.everyday.exception.DuplicateResourceException;
import ramyeon.everyday.exception.NotFoundResourceException;

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
        try {
            userService.register(registerRequestDto.getLoginId(), registerRequestDto.getPassword(), registerRequestDto.getName(), registerRequestDto.getEmail(), registerRequestDto.getNickname(), registerRequestDto.getAdmissionYear(), registerRequestDto.getSchoolName());
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, "해당 학교가 없음"), HttpStatus.NOT_FOUND);
        } catch (DuplicateResourceException dre) {
            return new ResponseEntity<>(new ResultDto(404, dre.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ResultDto(200, "회원가입 성공"), HttpStatus.OK);
    }

    /**
     * 회원 삭제 API
     */
    @DeleteMapping("/users")
    public ResponseEntity deleteUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        userService.deleteUser(principalDetails.getUsername());
        return new ResponseEntity<>(new ResultDto(200, "회원 탈퇴 성공"), HttpStatus.OK);
    }

    /**
     * 회원 정보 배너 조회 API
     */
    @GetMapping("/users/banner")
    public ResponseEntity banner(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        UserDto.BannerResponseDto data = userService.getUserInfoForBanner(principalDetails.getUsername());
        return new ResponseEntity<>(new ResultDto(200, "회원 정보 배너 조회 성공", data), HttpStatus.OK);
    }
}
