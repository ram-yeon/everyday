package ramyeon.everyday.domain.user;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.school.SchoolRepository;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
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

    /**
     * 회원 가입
     */
    public int register(String loginId, String password, String name, String email, String nickname, String admissionYear, String schoolName) {
        School findSchool = schoolRepository.findBySchoolName(schoolName).orElse(null);
        if (findSchool == null) {  // 학교가 존재하지 않음
            return 1;
        } else {
            User user = User.registerUser(loginId, bCryptPasswordEncoder.encode(password), name, email, nickname, admissionYear, findSchool);
            userRepository.save(user);  // 회원 등록
            return 0;
        }

    }
}
