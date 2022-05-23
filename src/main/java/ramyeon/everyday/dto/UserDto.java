package ramyeon.everyday.dto;

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
}
