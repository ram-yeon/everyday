package ramyeon.everyday.domain.manager;

import ramyeon.everyday.domain.DateBaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Manager extends DateBaseEntity {  // 관리자

    @Id
    @Column(name = "manager_id", columnDefinition = "bigint")
    private Long id;  // 관리자 ID

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String loginId;  // 아이디

    @NotNull
    @Column(columnDefinition = "varchar(60)")
    private String password;  // 비밀번호

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String name;  // 이름

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String registrant;  // 등록자

    @Column(columnDefinition = "varchar(20)")
    private String modifier;  // 수정자

}
