package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResultDto<T> {

    private int status;  // 상태 코드
    private String message;  // 메시지
    private T data;  // 데이터

    public ResultDto(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
