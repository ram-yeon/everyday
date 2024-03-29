package ramyeon.everyday.domain.login.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ramyeon.everyday.auth.CustomAuthenticationProvider;
import ramyeon.everyday.auth.CustomAuthenticationToken;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.token.service.TokenService;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.enum_.AccountAuthority;
import ramyeon.everyday.enum_.Whether;
import ramyeon.everyday.jwt.JwtTokenProvider;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenService tokenService;

    /**
     * 비밀번호 찾기
     */
    public boolean findUserForFindPassword(String loginId) {
        // 아이디로 가입된 회원이 있나 조회
        User findUser = userRepository.findByLoginIdAndIsDeleted(loginId, Whether.N).orElse(null);
        return findUser != null;
    }

    /**
     * 로그인 시도
     */
    public Authentication attemptLogin(String loginId, String password, String type) {
        // 토큰 생성
        CustomAuthenticationToken authenticationToken = new CustomAuthenticationToken(loginId, password, AccountAuthority.findAccountAuthority(type));
        // 로그인 시도
        return customAuthenticationProvider.authenticate(authenticationToken);
    }

    /**
     * 토큰 발급
     */
    public String generateJwtToken(Authentication authentication, String isKeptLogin) {
        CustomAuthenticationToken authenticationToken = (CustomAuthenticationToken) authentication;
        AccountAuthority accountAuthority = authenticationToken.getAccountAuthority();  // 로그인 계정 권한 구분

        String jwtToken = null;
        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인
            PrincipalDetails principalDetails = (PrincipalDetails) authenticationToken.getPrincipal();
            jwtToken = jwtTokenProvider.createAccessToken(principalDetails.getUsername(), principalDetails.getUser().getId(), principalDetails.getAuthorities(), accountAuthority, Whether.findWhether(isKeptLogin));  // JWT 토큰 생성

            tokenService.addToken(jwtToken, principalDetails.getUsername(), accountAuthority);  // DB에 토큰 저장

        } else if (accountAuthority == AccountAuthority.MANAGER) {  // 관리자 로그인
            ManagerDetails managerDetails = (ManagerDetails) authenticationToken.getPrincipal();
            jwtToken = jwtTokenProvider.createAccessToken(managerDetails.getUsername(), managerDetails.getManager().getId(), managerDetails.getAuthorities(), accountAuthority, Whether.N);  // JWT 토큰 생성

            tokenService.addToken(jwtToken, managerDetails.getUsername(), accountAuthority);  // DB에 토큰 저장
        }

        return jwtToken;
    }

}
