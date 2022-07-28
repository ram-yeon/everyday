package ramyeon.everyday.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ramyeon.everyday.enum_.AccountAuthority;
import ramyeon.everyday.exception.NotFoundEnumException;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final PrincipalDetailsService principalDetailsService;
    private final ManagerDetailsService managerDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public CustomAuthenticationProvider(BCryptPasswordEncoder passwordEncoder, PrincipalDetailsService principalDetailsService, ManagerDetailsService managerDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.principalDetailsService = principalDetailsService;
        this.managerDetailsService = managerDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        CustomAuthenticationToken authenticationToken = (CustomAuthenticationToken) authentication;

        String loginId = String.valueOf(authenticationToken.getPrincipal());
        String password = String.valueOf(authenticationToken.getCredentials());
        AccountAuthority accountAuthority = authenticationToken.getAccountAuthority();

        if (accountAuthority == AccountAuthority.USER) {  // 사용자 로그인 요청
            UserDetails user = principalDetailsService.loadUserByUsername(loginId);
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("비밀번호가 틀립니다.");
            }

            return new CustomAuthenticationToken(user, password, accountAuthority, user.getAuthorities());
        } else if (accountAuthority == AccountAuthority.MANAGER) {  // 관리자 로그인 요청
            UserDetails user = managerDetailsService.loadUserByUsername(loginId);
            if (!user.getPassword().equals(password)) {
                throw new BadCredentialsException("비밀번호가 틀립니다.");
            }

            return new CustomAuthenticationToken(user, password, accountAuthority, user.getAuthorities());
        } else {
            throw new NotFoundEnumException("잘못된 로그인 [type] 값 요청");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return CustomAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
