package ramyeon.everyday.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.school.SchoolRepository;
import ramyeon.everyday.dto.UserDto;
import ramyeon.everyday.exception.DuplicateResourceException;
import ramyeon.everyday.exception.NotFoundResourceException;

@Service
@RequiredArgsConstructor
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
    public void register(String loginId, String password, String name, String email, String nickname, String admissionYear, String schoolName) {
        // 아이디 중복 체크
        if (userRepository.findByLoginId(loginId).isPresent())
            throw new DuplicateResourceException("이미 존재하는 아이디");

        // 이메일 중복 체크
        if (userRepository.findByEmail(email).isPresent())
            throw new DuplicateResourceException("이미 존재하는 이메일");

        // 닉네임 중복 체크
        if (userRepository.findByNickname(nickname).isPresent())
            throw new DuplicateResourceException("이미 존재하는 닉네임");

        School findSchool = schoolRepository.findBySchoolName(schoolName).orElseThrow(NotFoundResourceException::new);  // 학교 조회

        // 회원 등록
        User user = User.registerUser(loginId, bCryptPasswordEncoder.encode(password), name, email, nickname, admissionYear, findSchool);
        userRepository.save(user);
    }

    /**
     * 배너에 띄울 회원 정보 조회
     */
    public UserDto.BannerResponseDto getUserInfoForBanner(String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);
        return new UserDto.BannerResponseDto(loginUser.getLoginId(), loginUser.getName(), loginUser.getNickname(), loginUser.getSchool().getSchoolName());
    }
}
