package ramyeon.everyday.domain.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.like.LikeRepository;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.dto.NoticeDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LikeRepository likeRepository;

    // 공지사항 목록 조회
    public List<NoticeDto.NoticesResponseDto> getNotices() {
        List<Notice> notices = noticeRepository.findByIsDeleted(Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));

        // Notice 엔티티를 NoticesResponseDto로 변환
        List<NoticeDto.NoticesResponseDto> noticeDtoList = new ArrayList<>();
        for (Notice notice : notices) {
            Long likeCount = likeRepository.countByTargetTypeAndTargetId(TargetType.NOTICE, notice.getId());  // 좋아요 수 조회
            noticeDtoList.add(new NoticeDto.NoticesResponseDto(notice.getId(), notice.getManager().getName(), notice.getTitle(), notice.getRegistrationDate(), notice.getViews(), likeCount, notice.getFileList().size()));
        }
        return noticeDtoList;
    }

}
