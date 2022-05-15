package ramyeon.everyday.domain.like;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;

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

}
