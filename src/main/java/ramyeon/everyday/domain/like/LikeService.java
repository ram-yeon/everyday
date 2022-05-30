package ramyeon.everyday.domain.like;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.LikeDto;

@RequiredArgsConstructor
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    /**
     * 좋아요 등록
     */
    public void createLike(String loginId, LikeDto.LikeCreateRequestDto createRequestDto) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Like like = Like.addLike(TargetType.valueOf(createRequestDto.getTargetType()), createRequestDto.getTargetId(), loginUser);
        likeRepository.save(like);  // 좋아요 등록
    }

}
