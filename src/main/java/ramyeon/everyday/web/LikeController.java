package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity createLike(@RequestBody LikeDto.LikeCreateRequestDto createRequestDto,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        likeService.createLike(principalDetails.getUsername(), createRequestDto);
        return new ResponseEntity<>(new ResultDto(200, "좋아요 등록 성공"), HttpStatus.OK);
    }

}
