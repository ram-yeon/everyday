package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.domain.notice.NoticeService;
import ramyeon.everyday.dto.NoticeDto;
import ramyeon.everyday.dto.ResultDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    /**
     * 공지사항 목록 조회 API
     */
    @GetMapping("/notices")
    public ResponseEntity notices() {
        List<NoticeDto.NoticesResponseDto> data = noticeService.getNotices();
        return new ResponseEntity<>(new ResultDto(200, "공지사항 목록 조회 성공", data), HttpStatus.OK);
    }
}
