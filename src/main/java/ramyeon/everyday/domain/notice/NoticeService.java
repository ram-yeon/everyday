package ramyeon.everyday.domain.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.like.LikeRepository;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.manager.Manager;
import ramyeon.everyday.domain.manager.ManagerRepository;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.NoticeDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LikeRepository likeRepository;
    private final ManagerRepository managerRepository;

    // 공지사항 목록 조회
    public Page<NoticeDto.NoticeResponseDto> getNotices(Pageable pageable) {
        Page<Notice> notices = getNoticesPaging(pageable);  // 공지사항 목록 조회

        return notices.map(
                notice -> NoticeDto.NoticeResponseDto.builder()
                        .id(notice.getId())
                        .writer(notice.getManager().getName())
                        .title(notice.getTitle())
                        .registrationDate(notice.getRegistrationDate())
                        .views(notice.getViews())
                        .likeCount(likeRepository.countByTargetTypeAndTargetId(TargetType.NOTICE, notice.getId()))  // 좋아요 수 조회
                        .fileCount(notice.getFileList().size())
                        .build()
        );
    }

    // 공지사항 상세 조회
    public NoticeDto.NoticeResponseDto getNoticeDetail(Long noticeId) {
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElse(null);  // 공지사항 조회
        if (notice == null) {
            return null;
        } else {
            Long likeCount = likeRepository.countByTargetTypeAndTargetId(TargetType.NOTICE, notice.getId());  // 좋아요 수 조회

            // File 엔티티를 FileInPostAndNoticeResponseDto로 변환
            List<File> fileList = notice.getFileList();
            List<FileDto.FileInPostAndNoticeResponseDto> fileDtoList = new ArrayList<>();
            for (File file : fileList) {
                fileDtoList.add(new FileDto.FileInPostAndNoticeResponseDto(file.getSequence(), file.getUploadFilename(), file.getStoreFilename()));
            }

            return NoticeDto.NoticeResponseDto.builder()
                    .id(notice.getId())
                    .writer(notice.getManager().getName())
                    .title(notice.getTitle())
                    .contents(notice.getContents())
                    .registrationDate(notice.getRegistrationDate())
                    .views(notice.getViews())
                    .likeCount(likeCount)
                    .fileCount(notice.getFileList().size())
                    .file(fileDtoList)
                    .build();
        }
    }

    // 공지사항 목록 조회
    public Page<Notice> getNoticesPaging(Pageable pageable) {
        return noticeRepository.findByIsDeleted(Whether.N, pageable);
    }

    // 공지사항 삭제
    @Transactional
    public int deleteNotice(String loginId, Long noticeId) {
        Manager manager = managerRepository.findByLoginId(loginId).orElse(null);  // 관리자 조회
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElse(null);  // 공지사항 조회
        if (notice.getManager() != manager) {  // 다른 관리자의 공지사항 삭제
            return 1;
        }
        notice.delete();  // 공지사항 삭제
        return 0;
    }

    // 좋아요 수 조회
    public Long getLikeCount(Notice notice) {
        return likeRepository.countByTargetTypeAndTargetId(TargetType.NOTICE, notice.getId());
    }

    // 공지사항 조회수 갱신
    @Transactional
    public void updateViews(Long noticeId, Long views) {
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElse(null);
        Long totalViews = notice.getViews() + views;  // 기존 조회수에 갱신
        notice.changeViews(totalViews);
    }
}
