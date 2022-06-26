package ramyeon.everyday.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import ramyeon.everyday.jwt.JwtAuthorizationFilter;
import ramyeon.everyday.jwt.JwtTokenProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfig(CorsFilter corsFilter, JwtTokenProvider jwtTokenProvider) {
        this.corsFilter = corsFilter;
        this.jwtTokenProvider = jwtTokenProvider;
    }

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
                .logout().disable()
                .httpBasic().disable()  // 기본적인 http 로그인 방식을 사용하지 않음
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), jwtTokenProvider))  // JwtAuthorizationFilter 추가
                .authorizeRequests().anyRequest().permitAll();  // 모든 리소스에대해 인증절차 없이 접근 허용
    }
}
