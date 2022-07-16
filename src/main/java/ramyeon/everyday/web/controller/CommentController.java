package ramyeon.everyday.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.comment.service.CommentService;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.exception.NotFoundResourceException;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * 댓글 등록 API
     */
    @PostMapping("/comments")
    public ResponseEntity createComment(@RequestBody CommentDto.CommentCreateRequestDto createRequestDto,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            CommentDto.CommentResponseDto data = commentService.createComment(principalDetails.getUsername(), createRequestDto);
            return new ResponseEntity<>(new ResultDto(200, "댓글 등록 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 댓글 조회 API
     */
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity comments(@PathVariable Long postId, @AuthenticationPrincipal PrincipalDetails principalDetails,
                                   @SortDefault(sort = "registrationDate", direction = Sort.Direction.ASC) Sort sort) {
        try {
            CommentDto.CommentsDto data = commentService.getComments(principalDetails.getUsername(), postId, sort);
            return new ResponseEntity<>(new ResultDto(200, "댓글 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 대댓글 조회 API
     */
    @GetMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity Reply(@PathVariable Long postId, @PathVariable Long commentId, @AuthenticationPrincipal PrincipalDetails principalDetails,
                                @SortDefault(sort = "registrationDate", direction = Sort.Direction.ASC) Sort sort) {
        try {
            CommentDto.CommentsDto data = commentService.getReply(principalDetails.getUsername(), postId, commentId, sort);
            return new ResponseEntity<>(new ResultDto(200, "대댓글 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 댓글 삭제 API
     */
    @PostMapping("/comments/{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails) {
        int result;
        try {
            result = commentService.deleteComment(principalDetails.getUsername(), commentId);
        } catch (NotFoundResourceException e) {
            return new ResponseEntity<>(new ResultDto(404, e.getMessage()), HttpStatus.NOT_FOUND);
        }
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "댓글 삭제 성공"), HttpStatus.OK);
        } else {  // 남의 댓글 삭제 시도
            return new ResponseEntity(new ResultDto(403, "해당 댓글의 삭제 권한이 없음"), HttpStatus.FORBIDDEN);
        }
    }

}
