package ramyeon.everyday.domain.user;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.like.Like;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.school.School;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends DateBaseEntity {  // 회원

    @Id
    @Column(name = "user_id", columnDefinition = "bigint")
    private Long id;  // 회원 ID

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String loginId;  // 아이디

    @NotNull
    @Column(columnDefinition = "varchar(60)")
    private String password;  // 비밀번호

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String name;  // 이름

    @NotNull
    @Column(columnDefinition = "varchar(50)")
    private String email;  // 이메일

    @NotNull
    @Column(columnDefinition = "varchar(11)")
    private String tel;  // 전화번호

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String nickname;  // 닉네임

    @NotNull
    @Column(columnDefinition = "varchar(8)")
    private String admissionYear;  // 입학 연도

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private Authority authority;  // 권한


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;  // 학교


    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<Post>();  // 게시글

    @OneToMany(mappedBy = "user")
    private List<Comment> commentList = new ArrayList<Comment>();  // 댓글

    @OneToMany(mappedBy = "user")
    private List<Like> likeList = new ArrayList<Like>();  // 좋아요

}
