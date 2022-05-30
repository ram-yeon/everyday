package ramyeon.everyday.domain.comment;

import lombok.Builder;
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

    @Builder
    public Comment(String contents, CommentType commentType, Long preId, Whether isAnonymous, User user, Post post) {
        this.contents = contents;
        this.commentType = commentType;
        this.preId = preId;
        this.isAnonymous = isAnonymous;
        this.user = user;
        this.post = post;
    }


    //== 연관관계 메서드 ==//
    public void setUser(User user) {
        this.user = user;
        user.getCommentList().add(this);
    }

    public void setPost(Post post) {
        this.post = post;
        post.getCommentList().add(this);
    }


    //== 생성 메서드 ==//
    public static Comment addComment(String contents, CommentType commentType, Long preId, Whether isAnonymous, User user, Post post) {
        Comment comment = Comment.builder()
                .contents(contents)
                .commentType(commentType)
                .preId(preId)
                .isAnonymous(isAnonymous)
                .user(user)
                .post(post).build();
        comment.setUser(user);
        comment.setPost(post);
        return comment;
    }
}
