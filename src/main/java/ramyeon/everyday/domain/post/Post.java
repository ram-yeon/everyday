package ramyeon.everyday.domain.post;

import org.hibernate.annotations.DynamicInsert;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.school.School;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@DynamicInsert
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

}
