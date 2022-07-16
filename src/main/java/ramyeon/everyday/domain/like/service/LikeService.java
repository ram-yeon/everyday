package ramyeon.everyday.domain.like.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.like.entity.Like;
import ramyeon.everyday.domain.like.repository.LikeRepository;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.dto.LikeDto;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.exception.NotFoundResourceException;

@RequiredArgsConstructor
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    /**
     * 좋아요 등록
     */
    public void createLike(String loginId, LikeDto.LikeRequestDto createRequestDto) {
        User loginUser = userRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회

        Like like = Like.addLike(TargetType.valueOf(createRequestDto.getTargetType()), createRequestDto.getTargetId(), loginUser);
        likeRepository.save(like);  // 좋아요 등록
    }

    /**
     * 좋아요 삭제
     */
    public int deleteLike(String loginId, String targetType, Long targetId) {
        User loginUser = userRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회
        Like like = likeRepository.findByUserAndTargetTypeAndTargetId(loginUser, TargetType.valueOf(targetType), targetId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 좋아요")); // 좋아요 조회
        if (like.getUser() != loginUser) {  // 남의 좋아요 삭제
            return 1;
        }
        like.delete(loginUser);
        likeRepository.delete(like);
        return 0;
    }

    // 좋아요 수 조회
    public Long getLikeCount(TargetType targetType, Long targetId) {
        return likeRepository.countByTargetTypeAndTargetId(targetType, targetId);
    }
}
