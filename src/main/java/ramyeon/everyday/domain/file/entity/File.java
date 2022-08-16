package ramyeon.everyday.domain.file.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.notice.entity.Notice;
import ramyeon.everyday.domain.post.entity.Post;
import ramyeon.everyday.enum_.Whether;

import javax.persistence.*;

@Getter
@NoArgsConstructor
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

    @Enumerated(EnumType.STRING)
    private Whether isDeleted;  // 삭제 여부


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // 게시글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;  // 공지사항

    @Builder
    public File(String uploadFilename, String storeFilename, String size, Long sequence) {
        this.uploadFilename = uploadFilename;
        this.storeFilename = storeFilename;
        this.size = size;
        this.sequence = sequence;
    }


    //== 연관관계 메서드 ==//
    private void setPost(Post post) {
        this.post = post;
        post.getFileList().add(this);
    }

    private void setNotice(Notice notice) {
        this.notice = notice;
        notice.getFileList().add(this);
    }


    //== 생성 메서드 ==//
    public static File addFile(String originalFilename, String storeFileName, String fileSize, long sequence, Object type) {
        File file = File.builder()
                .uploadFilename(originalFilename)
                .storeFilename(storeFileName)
                .size(String.valueOf(fileSize))
                .sequence(sequence)
                .build();
        if (type instanceof Post)  // 게시글의 첨부파일이면
            file.setPost((Post) type);  // post에 파일 설정
        else if (type instanceof Notice)  // 공지사항의 첨부파일이면
            file.setNotice((Notice) type);  // notice에 파일 설정
        return file;
    }
}
