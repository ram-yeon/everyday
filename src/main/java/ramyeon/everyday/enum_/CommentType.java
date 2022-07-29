package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum CommentType {  // 댓글 종류
    COMMENT, REPLY;  // 댓글, 대댓글

    private static final Map<String, CommentType> commentTypeMap = Stream.of(values()).collect(Collectors.toMap(CommentType::name, Function.identity()));

    // String to CommentType
    public static CommentType findCommentType(String commentType) {
        return Optional.ofNullable(commentTypeMap.get(commentType)).orElseThrow(() -> new NotFoundEnumException("잘못된 [댓글 타입] 값"));
    }
}
