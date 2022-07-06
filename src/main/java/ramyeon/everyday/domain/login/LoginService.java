package ramyeon.everyday.domain.login;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ramyeon.everyday.AccountAuthority;
import ramyeon.everyday.auth.CustomAuthenticationProvider;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.token.TokenService;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.jwt.JwtTokenProvider;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenService tokenService;

    public boolean findUserForFindPassword(String loginId) {
        User findUser = userRepository.findByLoginId(loginId).orElse(null);
        return findUser != null;
    }

    /**
     * 로그인 시도
     */
    public Authentication attemptLogin(String loginId, String password, String type) {
        // 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);
        // 로그인 시도
        return customAuthenticationProvider.authenticate(authenticationToken, AccountAuthority.valueOf(type));
    }

    /**
     * 토큰 발급
     */
    public String generateJwtToken(Authentication authentication, String type, String isKeptLogin) {
        // 로그인 계정 권한 구분
        AccountAuthority accountAuthority = AccountAuthority.valueOf(type);

        String jwtToken = null;
        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            jwtToken = jwtTokenProvider.createAccessToken(principalDetails.getUsername(), principalDetails.getUser().getId(), principalDetails.getAuthorities(), accountAuthority, Whether.valueOf(isKeptLogin));  // JWT 토큰 생성

            tokenService.addToken(jwtToken, principalDetails.getUsername(), accountAuthority);  // DB에 토큰 저장

        } else if (accountAuthority == AccountAuthority.MANAGER) {  // 관리자 로그인
            ManagerDetails managerDetails = (ManagerDetails) authentication.getPrincipal();
            jwtToken = jwtTokenProvider.createAccessToken(managerDetails.getUsername(), managerDetails.getManager().getId(), managerDetails.getAuthorities(), accountAuthority, Whether.N);  // JWT 토큰 생성

            tokenService.addToken(jwtToken, managerDetails.getUsername(), accountAuthority);  // DB에 토큰 저장
        }

        return jwtToken;
    }

}
