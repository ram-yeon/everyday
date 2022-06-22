package ramyeon.everyday.domain.token;

import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;

@Entity
public class Token extends DateBaseEntity {  // 토큰

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;  // 토큰 ID

    private String accessToken;  // 액세스 토큰

    @OneToOne(mappedBy = "token", fetch = FetchType.LAZY)
    private User user;  // 회원
}
