package ramyeon.everyday.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.user.User;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Long countByTargetTypeAndTargetId(TargetType targetType, Long targetId);

    List<TargetIdOnly> findTargetIdByTargetTypeAndUser(TargetType targetType, User user);  // 좋아요 한 글 ID 조회

    interface TargetIdOnly {  // 조회 결과에서 targetId 값만 얻기 위함
        Long getTargetId();
    }
}
