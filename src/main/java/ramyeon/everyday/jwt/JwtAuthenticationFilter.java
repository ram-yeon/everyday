package ramyeon.everyday.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.auth.CustomAuthenticationProvider;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.UserDto;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtTokenProvider jwtTokenProvider;

    // 인증을 위해 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // username, password 받기
            ObjectMapper objectMapper = new ObjectMapper();
            UserDto.LoginRequestDto loginRequestDto = objectMapper.readValue(request.getInputStream(), UserDto.LoginRequestDto.class);

            // 로그인 요청자 구분하여 저장
            AccountAuthority accountAuthority = AccountAuthority.valueOf(loginRequestDto.getType());
            request.setAttribute("accountAuthority", accountAuthority);

            // 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDto.getLoginId(), loginRequestDto.getPassword());

            // 로그인 시도
            Authentication authentication = customAuthenticationProvider.authenticate(authenticationToken, accountAuthority);

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

        String jwtToken = null;
        AccountAuthority accountAuthority = (AccountAuthority) request.getAttribute("accountAuthority");  // 사용자인지 관리자인지 구분
        jwtTokenProvider.setAccountAuthority(accountAuthority);

        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인
            PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
            jwtToken = jwtTokenProvider.createToken(principalDetails.getUsername(), principalDetails.getUser().getId());  // JWT 토큰 생성
        } else if (accountAuthority == AccountAuthority.MANAGER) {  // 관리자 로그인
            ManagerDetails managerDetails = (ManagerDetails) authResult.getPrincipal();
            jwtToken = jwtTokenProvider.createToken(managerDetails.getUsername(), managerDetails.getManager().getId());  // JWT 토큰 생성
        }

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

        if (failed instanceof UsernameNotFoundException) {
            errorMessage = failed.getMessage();
        } else if (failed instanceof BadCredentialsException) {
            errorMessage = failed.getMessage();
        } else if (failed instanceof InternalAuthenticationServiceException) {
            errorMessage = "존재하지 않는 사용자입니다.";
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, errorMessage);
    }
}
