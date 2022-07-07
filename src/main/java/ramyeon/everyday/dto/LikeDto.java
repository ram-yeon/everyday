package ramyeon.everyday.dto;

import lombok.Getter;

public class LikeDto {

    /**
     * 좋아요 DTO
     */
    @Getter
    public static class LikeRequestDto {
        private String targetType;  // 타깃 종류
        private Long targetId;  // 타깃 ID
    }
}