package ramyeon.everyday.domain.school;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class School extends DateBaseEntity {  // 학교

    @Id
    @Column(name = "school_id", columnDefinition = "bigint")
    private Long id;  // 학교 ID

    @NotNull
    @Column(columnDefinition = "varchar(30)")
    private String schoolName;  // 학교명

    @NotNull
    @Column(columnDefinition = "varchar(20)")
    private String registrant;  // 등록자

    @Column(columnDefinition = "varchar(20)")
    private String modifier;  // 수정자


    @OneToMany(mappedBy = "school")
    private List<User> userList = new ArrayList<User>();  // 회원

}
