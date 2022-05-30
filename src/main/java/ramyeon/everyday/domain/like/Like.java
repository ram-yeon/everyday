package ramyeon.everyday.domain.like;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

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


    //== 연관관계 메서드 ==//
    public void setUser(User user) {
        this.user = user;
        user.getLikeList().add(this);
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
