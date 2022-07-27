package ramyeon.everyday.domain.notice.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.enum_.Whether;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@DynamicInsert
@NoArgsConstructor
@Getter
@Entity
public class Notice extends DateBaseEntity {  // 공지사항

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;  // 공지사항 ID

    private String title;  // 제목
    private String contents;  // 내용

    private Long views;  // 조회수

    @Enumerated(EnumType.STRING)
    private Whether isDeleted;  // 삭제 여부


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;  // 관리자


    @OneToMany(mappedBy = "notice")
    private List<File> fileList = new ArrayList<File>();  // 파일


    @Transient
    private LocalDateTime registrationDate;  // 등록일시

    public Notice(LocalDateTime registrationDate, LocalDateTime modificationDate) {
        super(registrationDate, modificationDate);
        this.registrationDate = registrationDate;
    }

    @Builder
    public Notice(String title, String contents, Long views, Whether isDeleted, Manager manager, List<File> fileList) {
        this.title = title;
        this.contents = contents;
        this.views = views;
        this.isDeleted = isDeleted;
        this.manager = manager;
        this.fileList = fileList;
    }

    //== 비즈니스 로직 ==//

    // 공지사항 삭제
    public void delete() {
        this.isDeleted = Whether.Y;
    }

    // 공지사항 수정 - 조회수 갱신
    public void changeViews(Long views) {
        this.views = views;
    }


    //== 생성 메서드 ==//
    public static Notice createNotice(Manager manager, Whether isDeleted, Long views, String title, String contents) {
        Notice notice = Notice.builder()
                .title(title)
                .contents(contents)
                .views(views)
                .isDeleted(isDeleted)
                .manager(manager).build();
        return notice;
    }
}
