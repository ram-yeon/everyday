package ramyeon.everyday.domain.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@Getter
@Entity
public class Comment extends DateBaseEntity {  // 댓글

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;  // 댓글 ID

    private String contents;  // 내용

    @Enumerated(EnumType.STRING)
    private CommentType commentType;  // 댓글 종류

    private Long preId;  // 상위 번호

    @Enumerated(EnumType.STRING)
    private Whether isAnonymous;  // 익명 여부


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // 게시글


    @Transient
    private LocalDateTime registrationDate;  // 등록일시

    public Comment(LocalDateTime registrationDate, LocalDateTime modificationDate) {
        super(registrationDate, modificationDate);
        this.registrationDate = registrationDate;
    }
}
