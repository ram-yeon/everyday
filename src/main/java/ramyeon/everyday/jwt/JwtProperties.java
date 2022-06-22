package ramyeon.everyday.jwt;

public interface JwtProperties {
    String SECRET_KEY = "SECRET";

    int TOKEN_EXPIRATION_MINUTE = 60;  // 토큰 만료 분 수

    int TOKEN_EXPIRATION_DATE_FOR_KEEP_LOGIN = 14;  // 로그인 유지시 토큰 만료 일 수

    String HEADER_KEY_NAME = "Authorization";
}
