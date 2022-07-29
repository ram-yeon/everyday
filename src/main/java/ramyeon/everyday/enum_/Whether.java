package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Whether {  // 여부
    Y, N;  // 예, 아니오

    private static final Map<String, Whether> whetherMap = Stream.of(values()).collect(Collectors.toMap(Whether::name, Function.identity()));

    // String to Whether
    public static Whether findWhether(String whether) {
        return Optional.ofNullable(whetherMap.get(whether)).orElseThrow(() -> new NotFoundEnumException("잘못된 [여부] 값"));
    }
}
