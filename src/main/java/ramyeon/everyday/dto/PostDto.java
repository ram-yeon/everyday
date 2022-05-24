package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ramyeon.everyday.domain.Whether;

import java.time.LocalDateTime;

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

}
