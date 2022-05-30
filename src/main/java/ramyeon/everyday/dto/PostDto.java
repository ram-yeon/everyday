package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.post.BoardType;

import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    /**
     * 게시판 별 게시글 목록 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostsBoardDto {

        private Long id;  // 게시글 ID
        private String writer;  // 작성자

        private String title;  // 제목
        private String contents;  // 내용

        private LocalDateTime registrationDate;  // 등록일시
        private Whether isAnonymous;  // 익명 여부
        private Long views;  // 조회수

        private Long likeCount;  // 좋아요 수

        private int fileCount;  // 파일 수
        private int commentCount;  // 댓글 수

    }

    /**
     * 게시글 상세 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostDetailResponseDto {

        private Long id;  // 게시글 ID
        private String writer;  // 작성자

        private String title;  // 제목
        private String contents;  // 내용

        private LocalDateTime registrationDate;  // 등록일시
        private BoardType boardType;  // 게시판 종류
        private Whether isAnonymous;  // 익명 여부
        private Long views;  // 조회수

        private Long likeCount;  // 좋아요 수

        private int fileCount;  // 파일 수
        private List<FileDto.FileInPostAndNoticeResponseDto> file;  // 파일

        private int commentCount;  // 댓글 수
        private List<CommentDto.CommentInPostResponseDto> comment;  // 댓글
    }

    /**
     * 내가 쓴, 댓글 단, 좋아요한 게시글 목록 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostsMyResponseDto {

        private Long id;  // 게시글 ID
        private String writer;  // 작성자

        private String title;  // 제목
        private String contents;  // 내용

        private LocalDateTime registrationDate;  // 등록일시
        private BoardType boardType;  // 게시판 종류
        private Whether isAnonymous;  // 익명 여부
        private Long views;  // 조회수

        private Long likeCount;  // 좋아요 수

        private int fileCount;  // 파일 수
        private int commentCount;  // 댓글 수

    }

    /**
     * 메인화면 게시글 목록 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostsMainResponseDto {
        private Long id;  // 게시글 ID
        private String title;  // 제목
        private LocalDateTime registrationDate;  // 등록일시
    }

    /**
     * 게시글 검색 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class PostsSearchResponseDto {
        private String keyword;  // 검색어
        private Page<PostsMyResponseDto> post;  // 게시글
    }


    /**
     * 게시글 조회수 갱신 DTO
     */
    @Getter
    public static class PostViewsUpdateDto {
        private Long views;  // 조회수
    }
}