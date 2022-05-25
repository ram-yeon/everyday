package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class NoticeDto {

    /**
     * 공지사항 목록 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class NoticesResponseDto {
        private Long id;  // 공지사항 ID
        private String writer;  // 작성자

        private String title;  // 제목
        private LocalDateTime registrationDate;  // 등록일시
        private Long views;  // 조회수

        private Long likeCount;  // 좋아요 수
        private int fileCount;  // 파일 수
    }

}
