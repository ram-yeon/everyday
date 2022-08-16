package ramyeon.everyday.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class BadFileUploadException extends RuntimeException {
    // 첨부 파일 업로드 규칙을 위반했을 때 발생
    public BadFileUploadException(String message) {
        super(message);
    }
}
