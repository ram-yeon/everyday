package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum AccountAuthority {  // 계정 권한
    USER, MANAGER;  // 사용자, 관리자

    private static final Map<String, AccountAuthority> accountAuthorityMap = Stream.of(values()).collect(Collectors.toMap(AccountAuthority::name, Function.identity()));

    // String to AccountAuthority
    public static AccountAuthority findAccountAuthority(String accountAuthority) {
        return Optional.ofNullable(accountAuthorityMap.get(accountAuthority)).orElseThrow(() -> new NotFoundEnumException("잘못된 [계정 권한] 값"));
    }
}
