package ramyeon.everyday.dto;

import lombok.Getter;

public class LikeDto {

    /**
     * 좋아요 등록 DTO
     */
    @Getter
    public static class LikeCreateRequestDto {
        private String targetType;  // 타깃 종류
        private Long targetId;  // 타깃 ID
    }
}