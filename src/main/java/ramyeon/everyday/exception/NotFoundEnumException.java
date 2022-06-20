package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NotFoundEnumException extends RuntimeException {
    // ENUM 값이 존재하지 않을 때 발생
    public NotFoundEnumException(String message) {
        super(message);
    }
}
