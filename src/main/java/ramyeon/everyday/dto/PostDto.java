package ramyeon.everyday.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import ramyeon.everyday.enum_.BoardType;
import ramyeon.everyday.enum_.Whether;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    /**
     * 게시글 조회 DTO
     */
    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class PostResponseDto {

        private Long id;  // 게시글 ID
        private String writer;  // 작성자(닉네임)
        private String writerLoginId;  // 작성자 아이디

        private String title;  // 제목
        private String contents;  // 내용

        private LocalDateTime registrationDate;  // 등록일시
        private BoardType boardType;  // 게시판 종류
        private Whether isAnonymous;  // 익명 여부
        private Long views;  // 조회수

        private Whether isLikePost;  // 글을 조회한 회원의 게시글 좋아요 여부

        private Long likeCount;  // 좋아요 수

        private Integer fileCount;  // 파일 수
        private List<FileDto.FileResponseDto> file;  // 파일

        private Integer commentCount;  // 댓글 수
        private List<CommentDto.CommentResponseDto> comment;  // 댓글
    }

    /**
     * 게시글 검색 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostsSearchResponseDto {
        private String keyword;  // 검색어
        private Page<PostResponseDto> post;  // 게시글
    }

    /**
     * 게시글 등록, 수정 DTO
     */
    @Getter
    public static class PostRequestDto {
        private String boardType;  // 게시판 종류
        private String isAnonymous;  // 익명 여부

        @NotBlank(message = "제목을 입력하세요")
        private String title;  // 제목

        @NotBlank(message = "내용을 입력하세요")
        private String contents;  // 내용
    }

    /**
     * 게시글 조회수 갱신 DTO
     */
    @Getter
    public static class PostViewsUpdateDto {
        private Long views;  // 조회수
    }
}