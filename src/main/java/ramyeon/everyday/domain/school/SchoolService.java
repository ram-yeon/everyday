package ramyeon.everyday.domain.school;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ramyeon.everyday.dto.SchoolDto;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public List<SchoolDto.SchoolResponseDto> getAllSchoolInfo() {
        List<School> schools = schoolRepository.findAll(Sort.by("schoolName"));
        List<SchoolDto.SchoolResponseDto> schoolInfo = new ArrayList<>();
        for (School school : schools) {
            schoolInfo.add(new SchoolDto.SchoolResponseDto(school.getSchoolName(), school.getUserList().size()));
        }
        return schoolInfo;
    }

    public String getSchoolNameByUserId(Long userId) {
        return schoolRepository.findSchoolNameByUserId(userId);
    }

}
