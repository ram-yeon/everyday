package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class FileDto {

    /**
     * 게시글, 공지사항 상세 조회의 파일 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class FileInPostAndNoticeResponseDto {

        private Long sequence;  // 순서
        private String uploadFilename;  // 업로드 파일명
        private String storeFilename;  // 저장 파일명
    }

}
