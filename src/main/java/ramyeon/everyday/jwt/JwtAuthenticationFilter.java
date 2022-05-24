package ramyeon.everyday.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.dto.ResultDto;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 인증을 위해 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // username, password 받기
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(request.getInputStream(), User.class);

            // 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword());

            // 로그인 시도
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // authentication session 영역에 저장
            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // 인증 성공시 실행

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String jwtToken = jwtTokenProvider.createToken(principalDetails.getUsername(), principalDetails.getUser().getId());  // JWT 토큰 생성

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.addHeader(JwtProperties.HEADER_KEY_NAME, jwtToken);  // 헤더에 JWT 추가

        PrintWriter out = response.getWriter();
        out.print(new ObjectMapper().writeValueAsString(new ResultDto(HttpServletResponse.SC_OK, "로그인 성공")));
        out.flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        // 인증 실패시 실행
        String errorMessage = null;

        if (failed instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 틀립니다.";
        } else if (failed instanceof InternalAuthenticationServiceException) {
            errorMessage = "존재하지 않는 사용자입니다.";
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, errorMessage);
    }
}
