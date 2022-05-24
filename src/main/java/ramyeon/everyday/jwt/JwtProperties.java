package ramyeon.everyday.jwt;

public interface JwtProperties {
    String SECRET_KEY = "SECRET";
    int EXPIRATION_TIME = 60000 * 10;
    String HEADER_KEY_NAME = "Authorization";
}
