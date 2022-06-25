package ramyeon.everyday.auth;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ramyeon.everyday.AccountAuthority;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private PrincipalDetailsService principalDetailsService;
    private ManagerDetailsService managerDetailsService;
    private BCryptPasswordEncoder passwordEncoder;

    public CustomAuthenticationProvider(BCryptPasswordEncoder passwordEncoder, PrincipalDetailsService principalDetailsService, ManagerDetailsService managerDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.principalDetailsService = principalDetailsService;
        this.managerDetailsService = managerDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        return null;
    }

    public Authentication authenticate(Authentication authentication, AccountAuthority accountAuthority) throws AuthenticationException {

        String loginId = String.valueOf(authentication.getPrincipal());
        String password = String.valueOf(authentication.getCredentials());


        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인 요청
            UserDetails user = principalDetailsService.loadUserByUsername(loginId);

            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("비밀번호가 틀립니다.");
            }

            return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        }

        if (accountAuthority == AccountAuthority.MANAGER) {  // 관리자 로그인 요청
            UserDetails user = managerDetailsService.loadUserByUsername(loginId);

            if (!user.getPassword().equals(password)) {
                throw new BadCredentialsException("비밀번호가 틀립니다.");
            }

            return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        }

        return null;

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
