package ramyeon.everyday.jwt;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    // 인증이나 권한이 필요한 주소 요청이 있을 때 해당 필터를 거침

    // 필터 적용을 제외할 리소스
    private static final String[] whitelist = {"GET/schools", "POST/login", "POST/email-authenticate", "POST/check-authenticationcode", "POST/find-id", "POST/find-password", "PATCH/users/password/edit", "POST/users"};

    // DELETE /users
    // POST /users

    private JwtTokenProvider jwtTokenProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        super(authenticationManager);
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        if (isCheckPath(request.getMethod() + request.getRequestURI())) {

            String header = request.getHeader(JwtProperties.HEADER_KEY_NAME);
            if (jwtTokenProvider.validateHeader(header, response)) {  // 유효한 헤더

                String jwtToken = jwtTokenProvider.resolveToken(header);  // 토큰 추출

                // JWT 토큰을 검증해서 정상적인 사용자인지 확인
                if (jwtTokenProvider.validateToken(jwtToken, response)) {  // 유효한 토큰

                    // Jwt 토큰 인증 정보 조회
                    Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);

                    // 시큐리티의 세션에 접근하여 Authentication 객체 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    chain.doFilter(request, response);
                }
            }
        } else {
            chain.doFilter(request, response);
        }
    }

    private boolean isCheckPath(String requestMethodAndURI) {  // 필터 적용 여부
        return !PatternMatchUtils.simpleMatch(whitelist, requestMethodAndURI);
    }
}
