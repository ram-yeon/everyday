package ramyeon.everyday.domain.like;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Long countByTargetTypeAndTargetId(TargetType targetType, Long targetId);

    @Query("select l.targetId from Like l where targetType = ?1 group by l.targetId having count(l.targetId) >= ?2")
    List<Long> findTargetIdByTargetIdGreaterThan(TargetType targetType, Long likeCount);  // 핫 게시글 ID 조회

    @Query("select l.targetId from Like l where targetType = ?1 group by l.targetId having count(l.targetId) >= ?2")
    List<Long> findTargetIdByTargetIdGreaterThan(TargetType targetType, Long likeCount, Pageable pageable);  // 핫 게시글 ID 조회(메인화면)
}
