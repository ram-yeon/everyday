package ramyeon.everyday.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import ramyeon.everyday.enum_.Whether;

import java.time.LocalDateTime;
import java.util.List;

public class NoticeDto {

    /**
     * 공지사항 조회 DTO
     */
    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class NoticeResponseDto {
        private Long id;  // 공지사항 ID
        private String writer;  // 작성자

        private String title;  // 제목
        private String contents;  // 내용
        private LocalDateTime registrationDate;  // 등록일시
        private Long views;  // 조회수

        private Whether isLikeNotice;  // 공지사항을 조회한 회원의 공지사항 좋아요 여부

        private Long likeCount;  // 좋아요 수
        private Integer fileCount;  // 파일 수
        private List<FileDto.FileResponseDto> file;  // 파일
    }

    /**
     * 공지사항 등록, 수정 DTO
     */
    @Getter
    public static class NoticeRequestDto {
        private String title;  // 제목
        private String contents;  // 내용
    }

    /**
     * 공지사항 조회수 갱신 DTO
     */
    @Getter
    public static class NoticeViewsUpdateDto {
        private Long views;  // 조회수
    }

}
