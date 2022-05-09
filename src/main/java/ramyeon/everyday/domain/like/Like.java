package ramyeon.everyday.domain.like;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "likes")
public class Like extends DateBaseEntity {  // 좋아요

    @Id
    @Column(name = "like_id", columnDefinition = "bigint")
    private Long id;  // 좋아요 ID

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(10)")
    private TargetType targetType;  // 타깃 종류

    @NotNull
    @Column(columnDefinition = "bigint")
    private Long targetId;  // 타깃 ID


    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

}
