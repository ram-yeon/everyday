package ramyeon.everyday.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.like.Like;
import ramyeon.everyday.domain.post.Post;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.token.Token;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
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
    private String nickname;  // 닉네임
    private String admissionYear;  // 입학 연도

    @Enumerated(EnumType.STRING)
    private UserAuthority authority;  // 권한


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;  // 학교


    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<Post>();  // 게시글

    @OneToMany(mappedBy = "user")
    private List<Comment> commentList = new ArrayList<Comment>();  // 댓글

    @OneToMany(mappedBy = "user")
    private List<Like> likeList = new ArrayList<Like>();  // 좋아요

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "token_id")
    private Token token;  // 토큰

    @Builder
    public User(String loginId, String password, String name, String email, String nickname, String admissionYear, UserAuthority authority, School school) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.admissionYear = admissionYear;
        this.authority = authority;
        this.school = school;
    }

    //== 비즈니스 로직 ==//

    // 비밀번호 변경
    public void changePassword(String password) {
        this.password = password;
    }


    //== 연관관계 메서드 ==//

    public void setSchool(School school) {
        this.school = school;
        school.getUserList().add(this);
    }


    //== 생성 메서드 ==//

    public static User registerUser(String loginId, String password, String name, String email, String nickname, String admissionYear, School school) {
        User user = User.builder()
                .loginId(loginId)
                .password(password)
                .name(name)
                .email(email)
                .nickname(nickname)
                .admissionYear(admissionYear)
                .authority(UserAuthority.ROLE_BASIC)
                .school(school).build();
        user.setSchool(school);
        return user;
    }
}
