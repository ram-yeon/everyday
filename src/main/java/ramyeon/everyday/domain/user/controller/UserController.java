package ramyeon.everyday.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.user.service.UserService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;
import ramyeon.everyday.exception.DuplicateResourceException;
import ramyeon.everyday.exception.NotFoundResourceException;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 비밀번호 변경 API
     */
    @PatchMapping("/users/password/edit")
    public ResponseEntity changePassword(@Valid @RequestBody UserDto.ChangePasswordRequestDto changePasswordRequestDto) {
        try {
            userService.changePassword(changePasswordRequestDto.getEmail(), changePasswordRequestDto.getPassword());
            return new ResponseEntity<>(new ResultDto(200, "비밀번호 변경 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 회원 등록 API
     */
    @PostMapping("/users")
    public ResponseEntity register(@Valid @RequestBody UserDto.RegisterRequestDto registerRequestDto) {
        try {
            userService.register(registerRequestDto.getLoginId(), registerRequestDto.getPassword(), registerRequestDto.getName(), registerRequestDto.getEmail(), registerRequestDto.getNickname(), registerRequestDto.getAdmissionYear(), registerRequestDto.getSchoolName());
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (DuplicateResourceException de) {
            return new ResponseEntity<>(new ResultDto(400, de.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResultDto(200, "회원가입 성공"), HttpStatus.OK);
    }

    /**
     * 회원 삭제 API
     */
    @DeleteMapping("/users")
    public ResponseEntity deleteUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            userService.deleteUser(principalDetails.getUsername());
            return new ResponseEntity<>(new ResultDto(200, "회원 탈퇴 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 회원 정보 배너 조회 API
     */
    @GetMapping("/users/banner")
    public ResponseEntity banner(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            UserDto.BannerResponseDto data = userService.getUserInfoForBanner(principalDetails.getUsername());
            return new ResponseEntity<>(new ResultDto(200, "회원 정보 배너 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 회원 권한 변경 API
     */
    @PostMapping("/users/authority/edit")
    public ResponseEntity changeAuthority(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        UserService.UpgradeResult upgradeResult;
        try {
            upgradeResult = userService.upgradeUserAuthority(principalDetails.getUsername(), principalDetails.getAuthorities());
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
        if (upgradeResult.isSuccess()) {  // 등업 성공
            return new ResponseEntity<>(new ResultDto(200, "등업 성공"), HttpStatus.OK);
        } else {  // 등업 실패
            if (upgradeResult.getLikeCount() == null) {  // 이미 등업이 완료된 회원
                return new ResponseEntity<>(new ResultDto(200, "이미 등업이 완료된 회원"), HttpStatus.OK);
            } else {  // 등업 조건 미충족
                return new ResponseEntity<>(new ResultDto(200, "등업 실패: [좋아요 10개, 댓글 5개 이상] 조건 미충족" +
                        System.lineSeparator() + "현황: [좋아요 " + upgradeResult.getLikeCount() + "개, 댓글 " + upgradeResult.getCommentCount() + "개]"), HttpStatus.OK);
            }
        }
    }
}
