package ramyeon.everyday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class SchoolDto {

    /**
     * 학교 조회 DTO
     */
    @Getter
    @AllArgsConstructor
    public static class SchoolResponseDto {
        private String schoolName;  // 학교명
        private int studentsCount;  // 학생 수
    }

}
