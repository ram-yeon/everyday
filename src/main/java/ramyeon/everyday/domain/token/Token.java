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
    public Token(String accessToken, User user, Manager manager) {
        this.accessToken = accessToken;
        this.user = user;
        this.manager = manager;
    }


    //== 생성 메서드 ==//

    // 사용자의 토큰 생성
    public static Token createUserToken(String accessToken, User user) {
        Token token = Token.builder()
                .accessToken(accessToken)
                .user(user).build();
        user.setToken(token);
        return token;
    }

    // 관리자의 토큰 생성
    public static Token createManagerToken(String accessToken, Manager manager) {
        Token token = Token.builder()
                .accessToken(accessToken)
                .manager(manager).build();
        manager.setToken(token);
        return token;
    }
}
