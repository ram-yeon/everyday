package ramyeon.everyday.domain.comment;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Comment extends DateBaseEntity {  // 댓글

    @Id
    @Column(name = "comment_id", columnDefinition = "bigint")
    private Long id;  // 댓글 ID

    @NotNull
    @Column(columnDefinition = "varchar(15000)")
    private String contents;  // 내용

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(10)")
    private CommentType commentType;  // 댓글 종류

    @Column(columnDefinition = "bigint")
    private Long preId;  // 상위 번호

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(1)")
    private Whether isAnonymous;  // 익명 여부


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // 게시글

}
