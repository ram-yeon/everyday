package ramyeon.everyday.domain.file;

import lombok.Getter;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.notice.Notice;
import ramyeon.everyday.domain.post.Post;

import javax.persistence.*;

@Getter
@Entity
public class File extends DateBaseEntity {  // 파일

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;  // 파일 ID

    private String uploadFilename;  // 업로드 파일명
    private String storeFilename;  // 저장 파일명

    private String size;  // 용량
    private Long sequence;  // 순서


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // 게시글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;  // 공지사항

}
