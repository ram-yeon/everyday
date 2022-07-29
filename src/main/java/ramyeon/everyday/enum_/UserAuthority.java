package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserAuthority {  // 사용자 권한(등급)
    ROLE_BASIC, ROLE_UPGRADE;  // 일반, 업그레이드

    private static final Map<String, UserAuthority> userAuthorityMap = Stream.of(values()).collect(Collectors.toMap(UserAuthority::name, Function.identity()));

    // String to UserAuthority
    public static UserAuthority findUserAuthority(String userAuthority) {
        return Optional.ofNullable(userAuthorityMap.get(userAuthority)).orElseThrow(() -> new NotFoundEnumException("잘못된 [사용자 권한(등급)] 값"));
    }
}
