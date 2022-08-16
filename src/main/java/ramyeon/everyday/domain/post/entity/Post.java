package ramyeon.everyday.domain.post.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.comment.entity.Comment;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.school.entity.School;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.enum_.BoardType;
import ramyeon.everyday.enum_.Whether;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@DynamicInsert
@NoArgsConstructor
@Getter
@Entity
public class Post extends DateBaseEntity {  // 게시글

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;  // 게시글 ID

    @Enumerated(EnumType.STRING)
    private BoardType boardType;  // 게시판 종류

    private String title;  // 제목
    private String contents;  // 내용

    @Enumerated(EnumType.STRING)
    private Whether isAnonymous;  // 익명 여부

    @Enumerated(EnumType.STRING)
    private Whether isDeleted;  // 삭제 여부

    private Long views;  // 조회수


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;  // 학교


    @OneToMany(mappedBy = "post")
    private List<Comment> commentList = new ArrayList<Comment>();  // 댓글

    @OneToMany(mappedBy = "post")
    private List<File> fileList = new ArrayList<File>();  // 파일


    @Transient
    private LocalDateTime registrationDate;  // 등록일시

    public Post(LocalDateTime registrationDate, LocalDateTime modificationDate) {
        super(registrationDate, modificationDate);
        this.registrationDate = registrationDate;
    }

    @Builder
    public Post(BoardType boardType, String title, String contents, Whether isAnonymous, Whether isDeleted, Long views, User user, School school) {
        this.boardType = boardType;
        this.title = title;
        this.contents = contents;
        this.isAnonymous = isAnonymous;
        this.isDeleted = isDeleted;
        this.views = views;
        this.user = user;
        this.school = school;
    }

    //== 비즈니스 로직 ==//

    // 게시글 삭제
    public void delete(User user) {
        this.isDeleted = Whether.Y;
        deleteFromUser(user);
    }

    // 게시글 수정 (첨부 파일 제외)
    public void edit(Whether isAnonymous, String title, String contents) {
        this.isAnonymous = isAnonymous;
        this.title = title;
        this.contents = contents;
    }

    // 게시글 수정 - 조회수 갱신
    public void changeViews(Long views) {
        this.views = views;
    }


    //== 연관관계 메서드 ==//
    public void setUser(User user) {
        this.user = user;
        user.getPostList().add(this);
    }

    public void deleteFromUser(User user) {
        user.getPostList().remove(this);
    }

    //== 생성 메서드 ==//
    public static Post createPost(User user, School school, BoardType boardType, Whether isAnonymous, Whether isDeleted, Long views, String title, String contents) {
        Post post = Post.builder()
                .boardType(boardType)
                .title(title)
                .contents(contents)
                .isAnonymous(isAnonymous)
                .isDeleted(isDeleted)
                .views(views)
                .user(user)
                .school(school).build();
        post.setUser(user);
        return post;
    }
}
