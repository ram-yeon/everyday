package ramyeon.everyday.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.like.service.LikeService;
import ramyeon.everyday.dto.LikeDto;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.exception.NotFoundResourceException;

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
    @PostMapping("/likes/delete")
    public ResponseEntity deleteLike(@RequestBody LikeDto.LikeRequestDto likeRequestDto,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        int result;
        try {
            result = likeService.deleteLike(principalDetails.getUsername(), likeRequestDto.getTargetType(), likeRequestDto.getTargetId());
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, "존재하지 않는 좋아요"), HttpStatus.NOT_FOUND);
        }
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "좋아요 삭제 성공"), HttpStatus.OK);
        } else {  // 남의 좋아요 삭제 시도
            return new ResponseEntity(new ResultDto(403, "해당 좋아요의 삭제 권한이 없음"), HttpStatus.FORBIDDEN);
        }
    }
}
