package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NoRightsOfAccessException extends RuntimeException {
    // 접근 권한이 없을 때 발생
    public NoRightsOfAccessException(String message) {
        super(message);
    }
}
