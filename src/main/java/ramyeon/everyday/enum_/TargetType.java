package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum TargetType {  // 타깃 종류
    POST, COMMENT, NOTICE;  // 게시글, 댓글, 공지사항

    private static final Map<String, TargetType> targetTypeMap = Stream.of(values()).collect(Collectors.toMap(TargetType::name, Function.identity()));

    // String to TargetType
    public static TargetType findTargetType(String targetType) {
        return Optional.ofNullable(targetTypeMap.get(targetType)).orElseThrow(() -> new NotFoundEnumException("잘못된 [타깃 종류] 값"));
    }
}
