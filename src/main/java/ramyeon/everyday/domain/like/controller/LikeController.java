package ramyeon.everyday.domain.like.controller;

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
import ramyeon.everyday.exception.NoRightsOfAccessException;
import ramyeon.everyday.exception.NotFoundEnumException;
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
        try {
            likeService.createLike(principalDetails.getUsername(), createRequestDto);
            return new ResponseEntity<>(new ResultDto(200, "좋아요 등록 성공"), HttpStatus.OK);
        } catch (NotFoundEnumException nfe) {
            return new ResponseEntity<>(new ResultDto(400, nfe.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 좋아요 삭제 API
     */
    @PostMapping("/likes/delete")
    public ResponseEntity deleteLike(@RequestBody LikeDto.LikeRequestDto likeRequestDto,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            likeService.deleteLike(principalDetails.getUsername(), likeRequestDto.getTargetType(), likeRequestDto.getTargetId());
            return new ResponseEntity<>(new ResultDto(200, "좋아요 삭제 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        } catch (NotFoundEnumException nfe) {
            return new ResponseEntity<>(new ResultDto(400, nfe.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (NoRightsOfAccessException nre) {
            return new ResponseEntity(new ResultDto(403, nre.getMessage()), HttpStatus.FORBIDDEN);
        }
    }
}
