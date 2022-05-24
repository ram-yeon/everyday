package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.post.PostService;
import ramyeon.everyday.dto.PostDto;
import ramyeon.everyday.dto.ResultDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 게시판 별 게시글 목록 조회 API
     */
    @GetMapping("/posts/list/{boardType}")
    public ResponseEntity postsBoard(@PathVariable String boardType, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            List<PostDto.PostsBoardDto> data = postService.getPostsBoard(principalDetails.getUsername(), boardType);
            return new ResponseEntity<>(new ResultDto(200, boardType + " 게시판 게시글 목록 조회 성공", data), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ResultDto(400, "존재하지 않는 게시판"), HttpStatus.BAD_REQUEST);
        }
    }
}
