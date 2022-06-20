package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NotFoundResourceException extends RuntimeException {
    // 리소스가 존재하지 않을 때 발생
    public NotFoundResourceException(String message) {
        super(message);
    }
}
