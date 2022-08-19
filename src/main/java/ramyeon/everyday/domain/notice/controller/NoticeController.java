package ramyeon.everyday.domain.notice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ramyeon.everyday.auth.ManagerDetails;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.notice.service.NoticeService;
import ramyeon.everyday.dto.NoticeDto;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.exception.BadFileUploadException;
import ramyeon.everyday.exception.InvalidInputValueException;
import ramyeon.everyday.exception.NotFoundEnumException;
import ramyeon.everyday.exception.NotFoundResourceException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    /**
     * 공지사항 목록 조회 API
     */
    @GetMapping("/notices")
    public ResponseEntity notices(@PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeDto.NoticeResponseDto> data = noticeService.getNotices(pageable);
        return new ResponseEntity<>(new ResultDto(200, "공지사항 목록 조회 성공", data), HttpStatus.OK);
    }

    /**
     * 공지사항 상세 조회 API
     */
    @GetMapping("/notices/{noticeId}")
    public ResponseEntity noticeDetail(@PathVariable Long noticeId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        NoticeDto.NoticeResponseDto data;
        try {
            if (principalDetails != null)  // 사용자가 조회
                data = noticeService.getNoticeDetail(noticeId, principalDetails.getUsername());
            else  // 관리자가 조회
                data = noticeService.getNoticeDetail(noticeId, null);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ResultDto(200, "공지사항 상세 조회 성공", data), HttpStatus.OK);
    }

    /**
     * 공지사항 등록 API
     */
    @PostMapping(value = "/notices/files")
    public ResponseEntity createNoticeWithFile(@RequestPart(value = "imageFiles", required = false) List<MultipartFile> files,
                                               @RequestPart(value = "noticeInfo") NoticeDto.NoticeRequestDto noticeRequestDto,
                                               @AuthenticationPrincipal ManagerDetails managerDetails) throws Exception {
        try {
            NoticeDto.NoticeResponseDto data = noticeService.createNoticeWithFile(managerDetails.getUsername(), noticeRequestDto.getTitle(), noticeRequestDto.getContents(), files);
            return new ResponseEntity<>(new ResultDto(200, "게시글 등록 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (NotFoundEnumException | BadFileUploadException | InvalidInputValueException ee) {
            return new ResponseEntity<>(new ResultDto(400, ee.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 공지사항 등록 API (첨부 파일 제외)
     */
    @PostMapping("/notices")
    public ResponseEntity createNotice(@Valid @RequestBody NoticeDto.NoticeRequestDto noticeRequestDto,
                                       @AuthenticationPrincipal ManagerDetails managerDetails) {
        try {
            NoticeDto.NoticeResponseDto data = noticeService.createNotice(managerDetails.getUsername(), noticeRequestDto.getTitle(), noticeRequestDto.getContents());
            return new ResponseEntity<>(new ResultDto(200, "공지사항 등록 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 공지사항 수정 API
     */
    @PatchMapping("/notices/{noticeId}/files")
    public ResponseEntity updateNoticeWithFile(@PathVariable Long noticeId,
                                               @RequestPart(value = "imageFiles", required = false) List<MultipartFile> files,
                                               @RequestPart(value = "noticeInfo") NoticeDto.NoticeRequestDto noticeRequestDto,
                                               @AuthenticationPrincipal ManagerDetails managerDetails) throws Exception {
        try {
            noticeService.updateNoticeWithFile(managerDetails.getUsername(), noticeId, noticeRequestDto.getTitle(), noticeRequestDto.getContents(), files);
            return new ResponseEntity<>(new ResultDto(200, "공지사항 수정 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (BadFileUploadException | InvalidInputValueException ee) {
            return new ResponseEntity<>(new ResultDto(400, ee.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 공지사항 수정 API (첨부 파일 제외)
     */
    @PatchMapping("/notices/{noticeId}")
    public ResponseEntity updateNotice(@PathVariable Long noticeId,
                                       @Valid @RequestBody NoticeDto.NoticeRequestDto noticeRequestDto,
                                       @AuthenticationPrincipal ManagerDetails managerDetails) {
        try {
            noticeService.updateNotice(managerDetails.getUsername(), noticeId, noticeRequestDto.getTitle(), noticeRequestDto.getContents());
            return new ResponseEntity<>(new ResultDto(200, "공지사항 수정 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 공지사항 삭제 API
     */
    @DeleteMapping("/notices/{noticeId}")
    public ResponseEntity deleteNotice(@PathVariable Long noticeId,
                                       @AuthenticationPrincipal ManagerDetails managerDetails) {
        try {
            noticeService.deleteNotice(managerDetails.getUsername(), noticeId);
            return new ResponseEntity<>(new ResultDto(200, "공지사항 삭제 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    /**
     * 공지사항 조회수 갱신 API
     */
    @PatchMapping("/notices/{noticeId}/views")
    public ResponseEntity noticeViewsUpdate(@PathVariable Long noticeId, @RequestBody NoticeDto.NoticeViewsUpdateDto viewsUpdateDto) {
        try {
            noticeService.updateViews(noticeId, viewsUpdateDto.getViews());
            return new ResponseEntity<>(new ResultDto(200, "공지사항 조회수 갱신 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
