package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.like.LikeService;
import ramyeon.everyday.dto.LikeDto;
import ramyeon.everyday.dto.ResultDto;

@RestController
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    /**
     * 좋아요 등록 API
     */
    @PostMapping("/likes")
    public ResponseEntity createLike(@RequestBody LikeDto.LikeRequestDto createRequestDto,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        likeService.createLike(principalDetails.getUsername(), createRequestDto);
        return new ResponseEntity<>(new ResultDto(200, "좋아요 등록 성공"), HttpStatus.OK);
    }

    /**
     * 좋아요 삭제 API
     */
    @DeleteMapping("/likes/{likeId}")
    public ResponseEntity deleteLike(@PathVariable Long likeId,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        int result = likeService.deleteLike(principalDetails.getUsername(), likeId);
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "좋아요 삭제 성공"), HttpStatus.OK);
        } else {  // 남의 좋아요 삭제 시도
            return new ResponseEntity(new ResultDto(403, "해당 좋아요의 삭제 권한이 없음"), HttpStatus.FORBIDDEN);
        }
    }
}
