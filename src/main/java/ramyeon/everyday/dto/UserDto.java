package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class UserDto {

    // 이메일 인증 DTO
    @Getter
    public static class EmailRequestDto {
        private String email;  // 이메일
    }

    // 비밀번호 찾기 DTO
    @Getter
    public static class FindPasswordRequestDto {
        private String loginId;  // 아이디
    }

    // 비밀번호 변경 DTO
    @Getter
    public static class ChangePasswordRequestDto {
        private String email;  // 이메일
        private String password;  // 비밀번호
    }

    // 회원가입 DTO
    @Getter
    public static class RegisterRequestDto {
        private String loginId;  // 아이디
        private String password;  // 비밀번호
        private String name;  // 이름
        private String email;  // 이메일
        private String nickname;  // 닉네임
        private String admissionYear;  // 입학 연도
        private String schoolName;  // 학교명
    }

    // 회원 정보 배너 조회 DTO
    @AllArgsConstructor
    @Getter
    public static class BannerResponseDto {
        private String loginId;  // 아이디
        private String name;  // 이름
        private String nickname;  // 닉네임
        private String schoolName;  // 학교명
    }

    @Getter
    public static class LoginRequestDto {
        private String loginId;  // 아이디
        private String password;  // 비밀번호
        private String type;  // 로그인 요청자 종류 [사용자, 관리자]
    }

}
