package ramyeon.everyday.auth;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import ramyeon.everyday.enum_.AccountAuthority;

import java.util.Collection;

public class CustomAuthenticationToken extends AbstractAuthenticationToken {
    private Object principal;
    private Object credentials;
    private AccountAuthority accountAuthority;  // 계정 권한 [사용자, 관리자]

    public CustomAuthenticationToken(Object principal, Object credentials, AccountAuthority accountAuthority) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        this.accountAuthority = accountAuthority;
        setAuthenticated(false);
    }

    public CustomAuthenticationToken(Object principal, Object credentials, AccountAuthority accountAuthority, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        this.accountAuthority = accountAuthority;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }

    public AccountAuthority getAccountAuthority() {
        return this.accountAuthority;
    }
}
