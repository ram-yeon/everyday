package ramyeon.everyday.domain.notice;

import org.hibernate.annotations.DynamicInsert;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.manager.Manager;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@DynamicInsert
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

}