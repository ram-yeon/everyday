package ramyeon.everyday.domain.like.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.domain.user.entity.User;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "likes")
public class Like extends DateBaseEntity {  // 좋아요

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;  // 좋아요 ID

    @Enumerated(EnumType.STRING)
    private TargetType targetType;  // 타깃 종류

    private Long targetId;  // 타깃 ID


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

    @Builder
    public Like(TargetType targetType, Long targetId, User user) {
        this.targetType = targetType;
        this.targetId = targetId;
        this.user = user;
    }


    //== 비즈니스 로직 ==//

    // 좋아요 삭제
    public void delete(User user) {
        deleteFromUser(user);
    }


    //== 연관관계 메서드 ==//
    public void setUser(User user) {
        this.user = user;
        user.getLikeList().add(this);
    }

    public void deleteFromUser(User user) {
        user.getLikeList().remove(this);
    }

    //== 생성 메서드 ==//
    public static Like addLike(TargetType targetType, Long targetId, User user) {
        Like like = Like.builder()
                .targetType(targetType)
                .targetId(targetId)
                .user(user).build();
        like.setUser(user);
        return like;
    }
}
