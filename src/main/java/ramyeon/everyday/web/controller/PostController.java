package ramyeon.everyday.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ramyeon.everyday.auth.PrincipalDetails;
import ramyeon.everyday.domain.post.service.PostService;
import ramyeon.everyday.dto.PostDto;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.enum_.BoardType;
import ramyeon.everyday.exception.NotFoundResourceException;

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
        try {
            Map<BoardType, List<PostDto.PostResponseDto>> data = postService.getPostsMain(principalDetails.getUsername(), pageable);
            return new ResponseEntity<>(new ResultDto(200, "메인화면 게시글 목록 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 게시판 별 게시글 목록 조회 API
     */
    @GetMapping("/posts/list/{boardType}")
    public ResponseEntity postsBoard(@PathVariable String boardType, @AuthenticationPrincipal PrincipalDetails principalDetails,
                                     @PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<PostDto.PostResponseDto> data = postService.getPostsBoard(principalDetails.getUsername(), boardType, pageable);
            return new ResponseEntity<>(new ResultDto(200, boardType + " 게시판 게시글 목록 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException iae) {
            return new ResponseEntity<>(new ResultDto(400, "존재하지 않는 게시판"), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 게시글 상세 조회 API
     */
    @GetMapping("/posts/{postId}")
    public ResponseEntity postDetail(@PathVariable Long postId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            PostDto.PostResponseDto data = postService.getPostDetail(postId, principalDetails.getUsername());
            return new ResponseEntity<>(new ResultDto(200, "게시글 상세 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 내가 쓴, 댓글 단 게시글 목록 조회 API
     */
    @GetMapping("/posts/my/{type}")
    public ResponseEntity postsMy(@PathVariable String type, @AuthenticationPrincipal PrincipalDetails principalDetails,
                                  @PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<PostDto.PostResponseDto> data = postService.getPostsMy(type, principalDetails.getUsername(), pageable);
            return new ResponseEntity<>(new ResultDto(200, "내가 쓴 or 댓글 단 게시글 목록 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ResultDto(400, "잘못된 API URI 요청"), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 좋아요한 게시글, 공지사항 목록 조회 API
     */
    @GetMapping("/posts/notices/like")
    public ResponseEntity likePostsAndNotice(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                             @PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<PostDto.PostResponseDto> data = postService.getLikePostsAndNotices(principalDetails.getUsername(), pageable);
            return new ResponseEntity<>(new ResultDto(200, "좋아요한 게시글, 공지사항 목록 조회 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 게시글 검색 API
     */
    @GetMapping("/posts/search")
    public ResponseEntity deletePost(@RequestParam("keyword") String keyword,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails,
                                     @PageableDefault(size = 20, sort = "registrationDate", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            PostDto.PostsSearchResponseDto data = postService.getPostsSearch(keyword, principalDetails.getUsername(), pageable);
            return new ResponseEntity<>(new ResultDto(200, "게시글 검색 성공", data), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 게시글 삭제 API
     */
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity deletePost(@PathVariable Long postId,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        int result;
        try {
            result = postService.deletePost(principalDetails.getUsername(), postId);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
        if (result == 0) {
            return new ResponseEntity<>(new ResultDto(200, "게시글 삭제 성공"), HttpStatus.OK);
        } else {  // 다른 회원의 게시글 삭제 시도
            return new ResponseEntity(new ResultDto(403, "해당 게시글의 삭제 권한이 없음"), HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 게시글 조회수 갱신 API
     */
    @PatchMapping("/posts/{postId}/views")
    public ResponseEntity postViewsUpdate(@PathVariable Long postId, @RequestBody PostDto.PostViewsUpdateDto viewsUpdateDto) {
        try {
            postService.updateViews(postId, viewsUpdateDto.getViews());
            return new ResponseEntity<>(new ResultDto(200, "게시글 조회수 갱신 성공"), HttpStatus.OK);
        } catch (NotFoundResourceException re) {
            return new ResponseEntity<>(new ResultDto(404, re.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
