package ramyeon.everyday.domain.login;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public boolean findUserForFindPassword(String loginId) {
        User findUser = userRepository.findByLoginId(loginId).orElse(null);
        return findUser != null;
    }

}
