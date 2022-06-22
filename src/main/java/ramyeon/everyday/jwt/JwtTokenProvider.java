package ramyeon.everyday.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.ManagerDetailsService;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.auth.PrincipalDetailsService;
import ramyeon.everyday.domain.school.SchoolService;
import ramyeon.everyday.domain.token.Token;
import ramyeon.everyday.domain.token.TokenService;
import ramyeon.everyday.exception.NotFoundResourceException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final PrincipalDetailsService principalDetailsService;
    private final ManagerDetailsService managerDetailsService;
    private final SchoolService schoolService;
    private final TokenService tokenService;

    private String secretKey = JwtProperties.SECRET_KEY;

    private AccountAuthority accountAuthority;

    // 객체 초기화, secretKey를 Base64로 인코딩
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // 로그인 종류 설정
    public void setAccountAuthority(AccountAuthority accountAuthority) {
        this.accountAuthority = accountAuthority;
    }

    // JWT 토큰 생성
    public String createAccessToken(String userLoginId, Long userId) {
        Claims claims = Jwts.claims().setSubject(userLoginId);  // claim: JWT payload 에 저장되는 정보단위
        claims.put("pk", userId);  // 기본키 추가
        claims.put("authority", accountAuthority);  // 사용자인지 관리자인지 구분 정보 추가
        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인이면
            claims.put("school", schoolService.getSchoolNameByUserId(userId));  // 사용자의 학교이름 추가
        }
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)  // 정보 저장
                .setIssuedAt(now)  // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + JwtProperties.EXPIRATION_TIME))  // 토큰 만료시간 설정
                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(JwtProperties.SECRET_KEY.getBytes()))  // 사용할 암호화 알고리즘과 signature에 들어갈 secret 값 세팅
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        if (getAuthority(token) == AccountAuthority.USER) {  // 사용자 로그인
            PrincipalDetails principalDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(this.getSubject(token));
            return new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
        } else if (getAuthority(token) == AccountAuthority.MANAGER) {  // 관리자 로그인
            ManagerDetails managerDetails = (ManagerDetails) managerDetailsService.loadUserByUsername(this.getSubject(token));
            return new UsernamePasswordAuthenticationToken(managerDetails, null, managerDetails.getAuthorities());
        }
        return null;
    }

    // JWT 토큰 이름 추출
    public String getSubject(String token) {
        return String.valueOf(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject());
    }

    public AccountAuthority getAuthority(String token) {
        return AccountAuthority.valueOf(String.valueOf(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("authority")));
    }

    // Header에서 token 값 추출
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(JwtProperties.HEADER_KEY_NAME);
    }

    // 토큰의 유효성, 만료일자 확인
    public boolean validateToken(String jwtToken, HttpServletResponse response) throws IOException {
        Token token = null;
        try {
            // DB에서 토큰 존재하는지 조회
            token = tokenService.getToken(jwtToken);

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (NotFoundResourceException nfre) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "존재하지 않는 토큰입니다.");
            return false;
        } catch (ExpiredJwtException eje) {

            tokenService.deleteToken(token);  // 만료된 토큰이므로 DB에서 삭제

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증이 만료된 토큰입니다.");
            eje.printStackTrace();
            return false;
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException jwtE) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
            jwtE.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
