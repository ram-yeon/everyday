package ramyeon.everyday.domain.user;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.like.Like;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.school.School;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends DateBaseEntity {  // 회원

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;  // 회원 ID

    private String loginId;  // 아이디
    private String password;  // 비밀번호

    private String name;  // 이름
    private String email;  // 이메일
    private String tel;  // 전화번호
    private String nickname;  // 닉네임
    private String admissionYear;  // 입학 연도

    @Enumerated(EnumType.STRING)
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
