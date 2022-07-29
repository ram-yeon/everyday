package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum MyPostType {  // 내가 쓴 글, 댓글 단 글, 좋아요 한 글 구분 종류
    POST, COMMENT, LIKE;  // 쓴 글, 댓글 단 글, 좋아요 한 글

    private static final Map<String, MyPostType> myPostTypeMap = Stream.of(values()).collect(Collectors.toMap(MyPostType::name, Function.identity()));

    // String to MyPostType
    public static MyPostType findMyPostType(String myPostType) {
        return Optional.ofNullable(myPostTypeMap.get(myPostType)).orElseThrow(() -> new NotFoundEnumException("잘못된 [글 구분 타입] 값"));
    }
}
