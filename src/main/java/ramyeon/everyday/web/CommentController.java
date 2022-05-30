package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.comment.CommentService;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.ResultDto;

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
        commentService.createComment(principalDetails.getUsername(), createRequestDto);
        return new ResponseEntity<>(new ResultDto(200, "댓글 등록 성공"), HttpStatus.OK);
    }

    /**
     * 댓글 삭제 API
     */
    @PostMapping("/comments/{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails) {
        int result = commentService.deleteComment(principalDetails.getUsername(), commentId);
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "댓글 삭제 성공"), HttpStatus.OK);
        } else {  // 남의 댓글 삭제 시도
            return new ResponseEntity(new ResultDto(403, "해당 댓글의 삭제 권한이 없음"), HttpStatus.FORBIDDEN);
        }
    }

}
