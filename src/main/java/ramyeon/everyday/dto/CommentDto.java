package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.comment.CommentType;

import java.time.LocalDateTime;

public class CommentDto {

    /**
     * 게시글 상세 조회의 댓글 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class CommentInPostResponseDto {

        private Long id;  // 댓글 ID
        private String writer;  // 작성자
        private String contents;  // 내용
        private LocalDateTime registrationDate;  // 등록일시
        private CommentType commentType;  // 댓글 종류
        private Long preId;  // 상위 번호
        private Whether isAnonymous;  // 익명 여부
    }

    /**
     * 댓글 등록 DTO
     */
    @Getter
    public static class CommentCreateRequestDto {
        private Long postId;  // 게시글 ID

        private String contents;  // 내용
        private String commentType;  // 댓글 종류
        private String isAnonymous;  // 익명 여부
        private Long preId;  // 상위 번호
    }
}
