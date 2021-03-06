package ramyeon.everyday.domain.like.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.like.entity.Like;
import ramyeon.everyday.domain.like.repository.LikeRepository;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.dto.LikeDto;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.exception.NoRightsOfAccessException;
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
        Like like = Like.addLike(TargetType.findTargetType(createRequestDto.getTargetType()), createRequestDto.getTargetId(), loginUser);
        likeRepository.save(like);  // 좋아요 등록
    }

    /**
     * 좋아요 삭제
     */
    public void deleteLike(String loginId, String targetType, Long targetId) {
        User loginUser = userRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회
        Like like = likeRepository.findByUserAndTargetTypeAndTargetId(loginUser, TargetType.findTargetType(targetType), targetId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 좋아요")); // 좋아요 조회
        if (like.getUser() != loginUser)  // 남의 좋아요 삭제
            throw new NoRightsOfAccessException("해당 좋아요의 삭제 권한이 없음");
        like.delete(loginUser);
        likeRepository.delete(like);
    }

    // 좋아요 수 조회
    public Long getLikeCount(TargetType targetType, Long targetId) {
        return likeRepository.countByTargetTypeAndTargetId(targetType, targetId);
    }
}
