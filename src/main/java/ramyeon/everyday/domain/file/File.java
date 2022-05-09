package ramyeon.everyday.domain.file;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.notice.Notice;
import ramyeon.everyday.domain.post.Post;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class File extends DateBaseEntity {  // 파일

    @Id
    @Column(name = "file_id", columnDefinition = "bigint")
    private Long id;  // 파일 ID

    @NotNull
    @Column(columnDefinition = "varchar(300)")
    private String uploadFilename;  // 업로드 파일명

    @NotNull
    @Column(columnDefinition = "varchar(300)")
    private String storeFilename;  // 저장 파일명

    @NotNull
    @Column(columnDefinition = "varchar(30)")
    private String size;  // 용량

    @NotNull
    @Column(columnDefinition = "bigint")
    private Long sequence;  // 순서


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // 게시글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;  // 공지사항

}
