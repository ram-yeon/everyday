package ramyeon.everyday.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ramyeon.everyday.domain.school.SchoolService;
import ramyeon.everyday.dto.ResultDto;
import ramyeon.everyday.dto.SchoolDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    /**
     * 학교 조회 API
     */
    @GetMapping("/schools")
    public ResponseEntity schools() {
        List<SchoolDto.SchoolResponseDto> data = schoolService.getAllSchoolInfo();

        return new ResponseEntity<>(new ResultDto(200, "학교 조회 성공", data), HttpStatus.OK);
    }

}
