package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.domain.notice.NoticeService;
import ramyeon.everyday.dto.NoticeDto;
import ramyeon.everyday.dto.ResultDto;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    /**
     * 공지사항 목록 조회 API
     */
    @GetMapping("/notices")
    public ResponseEntity notices(@PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeDto.NoticesResponseDto> data = noticeService.getNotices(pageable);
        return new ResponseEntity<>(new ResultDto(200, "공지사항 목록 조회 성공", data), HttpStatus.OK);
    }

    /**
     * 공지사항 상세 조회 API
     */
    @GetMapping("/notices/{noticeId}")
    public ResponseEntity noticeDetail(@PathVariable Long noticeId) {
        NoticeDto.NoticeDetailResponseDto data = noticeService.getNoticeDetail(noticeId);
        if (data == null) {
            return new ResponseEntity<>(new ResultDto(404, "존재하지 않는 공지사항"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(new ResultDto(200, "공지사항 상세 조회 성공", data), HttpStatus.OK);
        }
    }

    /**
     * 공지사항 조회수 갱신 API
     */
    @PatchMapping("/notices/{noticeId}/views")
    public ResponseEntity noticeViewsUpdate(@PathVariable Long noticeId, @RequestBody NoticeDto.NoticeViewsUpdateDto viewsUpdateDto) {
        noticeService.updateViews(noticeId, viewsUpdateDto.getViews());
        return new ResponseEntity<>(new ResultDto(200, "공지사항 조회수 갱신 성공"), HttpStatus.OK);
    }
}
