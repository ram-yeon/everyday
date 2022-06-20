package ramyeon.everyday.domain.manager;

import lombok.Getter;
import ramyeon.everyday.domain.DateBaseEntity;

import javax.persistence.*;

@Getter
@Entity
public class Manager extends DateBaseEntity {  // 관리자

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id")
    private Long id;  // 관리자 ID

    private String loginId;  // 아이디
    private String password;  // 비밀번호

    private String name;  // 이름

    @Enumerated(EnumType.STRING)
    private ManagerAuthority authority;  // 권한

    private String registrant;  // 등록자
    private String modifier;  // 수정자

}
