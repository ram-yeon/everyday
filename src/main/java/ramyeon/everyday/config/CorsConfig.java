package ramyeon.everyday.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");  // 모든 ip에 응답을 허용
        config.addAllowedHeader("*");  // 모든 header에 응답을 허용
        config.addAllowedMethod("*");  // 모든 API method 요청을 허용
        source.registerCorsConfiguration("/**", config);  // "/**" 는 해당 config 설정을 따름
        return new CorsFilter(source);
    }

}
