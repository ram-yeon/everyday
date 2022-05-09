package ramyeon.everyday.domain.post;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Post extends DateBaseEntity {  // 게시글

    @Id
    @Column(name = "post_id", columnDefinition = "bigint")
    private Long id;  // 게시글 ID

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private BoardType boardType;  // 게시판 종류

    @NotNull
    @Column(columnDefinition = "varchar(100)")
    private String title;  // 제목

    @NotNull
    @Column(columnDefinition = "varchar(15000)")
    private String contents;  // 내용

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(1)")
    private Whether isAnonymous;  // 익명 여부

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(1) DEFAULT 'N'")
    private Whether isDeleted;  // 삭제 여부

    @NotNull
    @Column(columnDefinition = "bigint DEFAULT 0")
    private Long views;  // 조회수


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;  // 회원

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;  // 학교


    @OneToMany(mappedBy = "post")
    private List<Comment> commentList = new ArrayList<Comment>();  // 댓글

    @OneToMany(mappedBy = "post")
    private List<File> fileList = new ArrayList<File>();  // 파일

}
