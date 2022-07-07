package ramyeon.everyday.domain.like;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ramyeon.everyday.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Long countByTargetTypeAndTargetId(TargetType targetType, Long targetId);

    Optional<Like> findByUserAndTargetTypeAndTargetId(User user, TargetType targetType, Long targetId);  // 좋아요 조회

    @Query("select l.targetId from Like l where targetType = ?1 group by l.targetId having count(l.targetId) >= ?2")
    List<Long> findTargetIdByTargetIdGreaterThan(TargetType targetType, Long likeCount);  // 핫 게시글 ID 조회

    @Query("select l.targetId from Like l where targetType = ?1 group by l.targetId having count(l.targetId) >= ?2")
    List<Long> findTargetIdByTargetIdGreaterThan(TargetType targetType, Long likeCount, Pageable pageable);  // 핫 게시글 ID 조회(메인화면)

    Long countByUser(User user);  // 회원의 좋아요 수 조회
}
