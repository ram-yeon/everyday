package ramyeon.everyday.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Long countByTargetTypeAndTargetId(TargetType targetType, Long targetId);

}
