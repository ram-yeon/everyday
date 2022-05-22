package ramyeon.everyday.dto;

import lombok.Getter;

public class UserDto {

    // 이메일 인증 DTO
    @Getter
    public static class EmailRequestDto {
        private String email;  // 이메일
    }

}
