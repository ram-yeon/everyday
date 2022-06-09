package ramyeon.everyday.auth;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private PrincipalDetailsService principalDetailsService;
    private BCryptPasswordEncoder passwordEncoder;

    public CustomAuthenticationProvider(@Lazy BCryptPasswordEncoder passwordEncoder, PrincipalDetailsService principalDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.principalDetailsService = principalDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        return null;
    }

    public Authentication authenticate(Authentication authentication, String type) throws AuthenticationException {

        String loginId = String.valueOf(authentication.getPrincipal());
        String password = String.valueOf(authentication.getCredentials());


        if (type.equals("User")) {  // 사용자 로그인 요청
            UserDetails user = principalDetailsService.loadUserByUsername(loginId);

            if (!passwordEncoder.matches(password, user.getPassword())) {
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
