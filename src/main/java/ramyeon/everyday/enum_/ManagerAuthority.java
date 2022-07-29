package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum ManagerAuthority {  // 관리자 권한(등급)
    ROLE_MANAGER;  // 관리자

    private static final Map<String, ManagerAuthority> managerAuthorityMap = Stream.of(values()).collect(Collectors.toMap(ManagerAuthority::name, Function.identity()));

    // String to ManagerAuthority
    public static ManagerAuthority findManagerAuthority(String managerAuthority) {
        return Optional.ofNullable(managerAuthorityMap.get(managerAuthority)).orElseThrow(() -> new NotFoundEnumException("잘못된 [관리자 권한] 값"));
    }
}
