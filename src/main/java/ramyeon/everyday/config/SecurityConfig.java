package ramyeon.everyday.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import ramyeon.everyday.auth.PrincipalDetailsService;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.jwt.JwtAuthenticationFilter;
import ramyeon.everyday.jwt.JwtAuthorizationFilter;
import ramyeon.everyday.jwt.JwtTokenProvider;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final JwtTokenProvider jwtTokenProvider;
    private final PrincipalDetailsService principalDetailsService;
    private final UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();  // CSRF protection 적용 X
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션 사용 X, stateless
                .and()
                .addFilter(corsFilter)
                .formLogin().disable()  // formLogin 사용하지 않음
                .httpBasic().disable()  // 기본적인 http 로그인 방식을 사용하지 않음
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtTokenProvider))  // JwtAuthenticationFilter 추가
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository, jwtTokenProvider, principalDetailsService))  // JwtAuthorizationFilter 추가
                .authorizeRequests().anyRequest().permitAll();  // 모든 리소스에대해 인증절차 없이 접근 허용
    }
}
