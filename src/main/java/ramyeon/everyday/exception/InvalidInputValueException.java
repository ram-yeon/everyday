package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidInputValueException extends RuntimeException {
    // 입력 값이 유효하지 않을 때 발생
    public InvalidInputValueException(String message) {
        super(message);
    }
}
