package ramyeon.everyday.domain.school;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.dto.SchoolDto;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public List<SchoolDto.SchoolResponseDto> getAllSchoolInfo() {
        // 학교 및 학생 수 조회 - fetch join을 통한 성능 최적화로 쿼리 1번 호출
        List<School> schools = schoolRepository.findAllWithUserList();
        List<SchoolDto.SchoolResponseDto> schoolInfo = new ArrayList<>();
        for (School school : schools) {
            schoolInfo.add(new SchoolDto.SchoolResponseDto(school.getSchoolName(), school.getUserList().size()));  // 학교명, 학생 수
        }
        return schoolInfo;
    }

    public String getSchoolNameByUserId(Long userId) {
        return schoolRepository.findSchoolNameByUserId(userId);
    }

}
