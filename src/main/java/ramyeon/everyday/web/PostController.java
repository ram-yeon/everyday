package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 메인화면 게시글 목록 조회 API
     */
    @GetMapping("/posts/main")
    public ResponseEntity postsMain(
            @PageableDefault(size = 4, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, List<PostDto.PostsMainResponseDto>> data = postService.getPostsMain(principalDetails.getUsername(), pageable);
        return new ResponseEntity<>(new ResultDto(200, "메인화면 게시글 목록 조회 성공", data), HttpStatus.OK);
    }

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

    /**
     * 게시글 상세 조회 API
     */
    @GetMapping("/posts/{postId}")
    public ResponseEntity postDetail(@PathVariable Long postId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        PostDto.PostDetailResponseDto data = postService.getPostDetail(postId, principalDetails.getUsername());
        if (data == null) {
            return new ResponseEntity<>(new ResultDto(404, "존재하지 않는 게시글"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(new ResultDto(200, "게시글 상세 조회 성공", data), HttpStatus.OK);
        }
    }

    /**
     * 내가 쓴, 댓글 단, 좋아요한 게시글 목록 조회 API
     */
    @GetMapping("/posts/my/{type}")
    public ResponseEntity postsMy(@PathVariable String type, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<PostDto.PostsMyResponseDto> data = postService.getPostsMy(type, principalDetails.getUsername());
        if (data == null) {
            return new ResponseEntity<>(new ResultDto(400, "잘못된 API URI 요청"), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ResultDto(200, "내가 쓴 or 댓글 단 or 좋아요한 게시글 목록 조회 성공", data), HttpStatus.OK);
        }
    }
}
