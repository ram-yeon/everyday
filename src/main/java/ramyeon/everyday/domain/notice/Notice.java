package ramyeon.everyday.domain.notice;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.manager.Manager;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Notice extends DateBaseEntity {  // 공지사항

    @Id
    @Column(name = "notice_id", columnDefinition = "bigint")
    private Long id;  // 공지사항 ID

    @NotNull
    @Column(columnDefinition = "varchar(100)")
    private String title;  // 제목

    @NotNull
    @Column(columnDefinition = "varchar(15000)")
    private String contents;  // 내용

    @NotNull
    @Column(columnDefinition = "bigint DEFAULT 0")
    private Long views;  // 조회수

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(1) DEFAULT 'N'")
    private Whether isDeleted;  // 삭제 여부


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;  // 관리자


    @OneToMany(mappedBy = "notice")
    private List<File> fileList = new ArrayList<File>();  // 파일

}
