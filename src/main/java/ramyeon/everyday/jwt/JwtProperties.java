package ramyeon.everyday.jwt;

public interface JwtProperties {
    String SECRET = "SECRET";
    int EXPIRATION_TIME = 60000 * 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
