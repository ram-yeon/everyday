package ramyeon.everyday.domain.token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.exception.NotFoundResourceException;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    /**
     * 토큰 등록
     */
    @Transactional
    public void addToken(String accessToken, String loginId) {
        User user = userRepository.findByLoginId(loginId).orElseThrow(NotFoundResourceException::new);
        // 토큰이 이미 존재하면
        if (isTokenExisted(user)) {
            deleteToken(user.getToken());  // 토큰 삭제
        }
        // 토큰 등록
        Token token = Token.createToken(accessToken, user);
        tokenRepository.save(token);
    }

    /**
     * 토큰 삭제
     */
    @Transactional
    public void deleteToken(Token token) {
        token.getUser().setToken(null);
        tokenRepository.delete(token);
    }

    /**
     * 토큰 존재 여부 확인
     */
    public boolean isTokenExisted(User user) {
        return user.getToken() != null;
    }

}
