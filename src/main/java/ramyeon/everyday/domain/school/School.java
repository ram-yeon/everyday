package ramyeon.everyday.domain.school;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class School extends DateBaseEntity {  // 학교

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_id")
    private Long id;  // 학교 ID

    private String schoolName;  // 학교명

    private String registrant;  // 등록자
    private String modifier;  // 수정자


    @OneToMany(mappedBy = "school")
    private List<User> userList = new ArrayList<User>();  // 회원

}
