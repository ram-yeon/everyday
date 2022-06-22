package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class UserDto {

    // 아이디 찾기 DTO
    @Getter
    public static class EmailRequestDto {
        private String email;  // 이메일
    }

    // 이메일 인증 DTO
    @Getter
    public static class EmailAuthenticationRequestDto {
        private String email;  // 이메일
        private String type;  // 인증 종류 [회원가입, 비밀번호 찾기]
        private String loginId;  // 아이디
    }

    // 인증코드 확인 DTO
    @Getter
    public static class CheckAuthenticationCodeRequestDto {
        private String email;  // 이메일
        private String authenticationCode;  // 인증코드
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
        private String type;  // 로그인 계정 권한 종류 [사용자, 관리자]
        private String isKeptLogin;  // 로그인 유지 여부
    }

}
