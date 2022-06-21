package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DuplicateResourceException extends RuntimeException {
    // 리소스가 중복될 때 발생
    public DuplicateResourceException(String message) {
        super(message);
    }
}
