package ramyeon.everyday.domain.token;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ramyeon.everyday.domain.DateBaseEntity;
import ramyeon.everyday.domain.manager.Manager;
import ramyeon.everyday.domain.user.User;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Token extends DateBaseEntity {  // 토큰

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;  // 토큰 ID

    private String accessToken;  // 액세스 토큰

    @OneToOne(mappedBy = "token", fetch = FetchType.LAZY)
    private User user;  // 회원

    @OneToOne(mappedBy = "token", fetch = FetchType.LAZY)
    private Manager manager;  // 관리자

    @Builder
    public Token(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }


    //== 생성 메서드 ==//
    public static Token createToken(String accessToken, User user) {
        Token token = Token.builder()
                .accessToken(accessToken)
                .user(user).build();
        user.setToken(token);
        return token;
    }
}
