package ramyeon.everyday.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.comment.repository.CommentRepository;
import ramyeon.everyday.domain.like.repository.LikeRepository;
import ramyeon.everyday.domain.school.entity.School;
import ramyeon.everyday.domain.school.repository.SchoolRepository;
import ramyeon.everyday.domain.token.service.TokenService;
import ramyeon.everyday.enum_.UserAuthority;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.dto.UserDto;
import ramyeon.everyday.exception.DuplicateResourceException;
import ramyeon.everyday.exception.NotFoundResourceException;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService tokenService;

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
     * 회원 탈퇴
     */
    public void deleteUser(String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        loginUser.delete(loginUser.getSchool());
        tokenService.deleteToken(loginUser.getToken());  // 토큰 삭제
        userRepository.delete(loginUser);
    }

    /**
     * 배너에 띄울 회원 정보 조회
     */
    public UserDto.BannerResponseDto getUserInfoForBanner(String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);
        return new UserDto.BannerResponseDto(loginUser.getLoginId(), loginUser.getName(), loginUser.getNickname(), loginUser.getSchool().getSchoolName());
    }

    /**
     * 회원 등업 신청
     */
    @Transactional
    public int upgradeUserAuthority(String loginId, Collection<? extends GrantedAuthority> authorities) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);

        // 이미 등업이 완료된 회원이면
        for (GrantedAuthority authority : authorities) {
            if (authority.getAuthority().equals(UserAuthority.ROLE_UPGRADE.name()))
                return 2;
        }

        Long likeCount = likeRepository.countByUser(loginUser);  // 좋아요 개수 조회
        Long commentCount = commentRepository.countByUser(loginUser);  // 댓글 개수 조회

        // 두 조건 모두 만족하면 등업 승인
        if (likeCount >= 10 && commentCount >= 5) {
            loginUser.changeAuthority(UserAuthority.ROLE_UPGRADE);
            return 0;
        } else {  // 등업 거절
            return 1;
        }
    }
}
