package ramyeon.everyday.domain.user;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 비밀번호 변경
     */
    @Transactional
    public int changePassword(String email, String password) {
        User findUser = userRepository.findByEmail(email).orElse(null);
        if (findUser == null) {  // 해당 이메일로 가입된 회원이 없음
            return 1;
        } else {
            findUser.changePassword(bCryptPasswordEncoder.encode(password));  // 비밀번호 변경
            return 0;
        }
    }

}
