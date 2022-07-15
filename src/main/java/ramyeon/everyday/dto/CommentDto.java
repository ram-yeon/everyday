package ramyeon.everyday.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import ramyeon.everyday.enum_.Whether;
import ramyeon.everyday.enum_.CommentType;

import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {

    /**
     * 댓글 조회 DTO
     */
    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class CommentResponseDto {

        private Long id;  // 댓글 ID
        private String writer;  // 작성자(닉네임)
        private String writerLoginId;  // 작성자 아이디
        private String contents;  // 내용
        private LocalDateTime registrationDate;  // 등록일시
        private CommentType commentType;  // 댓글 종류
        private Long preId;  // 상위 번호
        private Whether isAnonymous;  // 익명 여부

        private Whether isLikeComment;  // 글을 조회한 회원의 댓글 좋아요 여부

        private Long likeCount;  // 좋아요 수
    }

    /**
     * 댓글 조회 DTO
     */
    @Getter
    @Builder
    public static class CommentsDto {

        private Integer commentCount;  // 댓글 수
        private List<CommentResponseDto> comment;  // 댓글
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
