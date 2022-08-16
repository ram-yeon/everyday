package ramyeon.everyday.domain.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.file.service.FileService;
import ramyeon.everyday.domain.like.repository.LikeRepository;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.domain.manager.repository.ManagerRepository;
import ramyeon.everyday.domain.notice.entity.Notice;
import ramyeon.everyday.domain.notice.repository.NoticeRepository;
import ramyeon.everyday.domain.post.service.PostService;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.NoticeDto;
import ramyeon.everyday.enum_.TargetType;
import ramyeon.everyday.enum_.Whether;
import ramyeon.everyday.exception.NotFoundResourceException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LikeRepository likeRepository;
    private final ManagerRepository managerRepository;
    private final UserRepository userRepository;
    private final FileService fileService;

    /**
     * 공지사항 목록 조회
     */
    public Page<NoticeDto.NoticeResponseDto> getNotices(Pageable pageable) {
        // 공지사항 및 관리자, 파일 조회 - fetch join을 통한 쿼리 수 감소
        List<Notice> notices = noticeRepository.findByIsDeletedWithManagerFile(Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));

        List<NoticeDto.NoticeResponseDto> noticeDtoList = new ArrayList<>();
        for (Notice notice : notices) {
            noticeDtoList.add(
                    // Notice 엔티티를 NoticeResponseDto로 변환
                    NoticeDto.NoticeResponseDto.builder()
                            .id(notice.getId())
                            .writer(notice.getManager().getName())
                            .title(notice.getTitle())
                            .registrationDate(notice.getRegistrationDate())
                            .views(notice.getViews())
                            .likeCount(getLikeCount(notice))  // 좋아요 수 조회
                            .fileCount(notice.getFileList().size())
                            .build()
            );
        }

        // List를 Page로 변환
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), noticeDtoList.size());
        PageImpl<NoticeDto.NoticeResponseDto> noticeDtosPage = new PageImpl<>(new ArrayList<>(), pageable, noticeDtoList.size());
        try {
            List<NoticeDto.NoticeResponseDto> noticeResponseDtos = noticeDtoList.subList(start, end);
            noticeDtosPage = new PageImpl<>(noticeResponseDtos, pageable, noticeDtoList.size());
        } catch (IllegalArgumentException ie) {
            // illegal endpoint index value
        }
        return noticeDtosPage;
    }

    /**
     * 공지사항 상세 조회
     */
    public NoticeDto.NoticeResponseDto getNoticeDetail(Long noticeId, String userLoginId) {
        // 공지사항 및 관리자, 파일 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        Notice notice = noticeRepository.findByIdAndIsDeletedWithManagerFile(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));  // 공지사항 조회

        // File 엔티티를 FileInPostAndNoticeResponseDto로 변환
        List<File> fileList = notice.getFileList();
        List<FileDto.FileResponseDto> fileDtoList = new ArrayList<>();
        for (File file : fileList) {
            fileDtoList.add(new FileDto.FileResponseDto(file.getSequence(), file.getUploadFilename(), file.getStoreFilename()));
        }

        // 사용자가 조회
        if (userLoginId != null) {
            // 사용자 및 좋아요 조회- fetch join을 통한 성능 최적화로 쿼리 수 감소
            User loginUser = userRepository.findByLoginIdTargetTypeInWithLike(userLoginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 회원"));  // 회원 조회

            return NoticeDto.NoticeResponseDto.builder()
                    .id(notice.getId())
                    .writer(notice.getManager().getName())
                    .title(notice.getTitle())
                    .contents(notice.getContents())
                    .registrationDate(notice.getRegistrationDate())
                    .views(notice.getViews())
                    .isLikeNotice(PostService.checkUserLike(loginUser.getLikeList(), TargetType.NOTICE, notice.getId()))  // 해당 공지사항을 좋아요 했는지 확인
                    .likeCount(getLikeCount(notice))  // 좋아요 수 조회
                    .fileCount(notice.getFileList().size())
                    .file(fileDtoList)
                    .build();
        }

        // 관리자가 조회
        return NoticeDto.NoticeResponseDto.builder()
                .id(notice.getId())
                .writer(notice.getManager().getName())
                .title(notice.getTitle())
                .contents(notice.getContents())
                .registrationDate(notice.getRegistrationDate())
                .views(notice.getViews())
                .likeCount(getLikeCount(notice))  // 좋아요 수 조회
                .fileCount(notice.getFileList().size())
                .file(fileDtoList)
                .build();
    }

    /**
     * 공지사항 목록 조회
     */
    public Page<Notice> getNoticesPaging(Pageable pageable) {
        return noticeRepository.findByIsDeleted(Whether.N, pageable);
    }

    /**
     * 공지사항 등록
     */
    public NoticeDto.NoticeResponseDto createNoticeWithFile(String loginId, String title, String contents, List<MultipartFile> fileList) throws Exception {
        fileService.checkFileType(fileList);  // 첨부 파일 종류 확인
        fileService.checkFileCountLimitExceeded(fileList);  // 파일 최대 업로드 개수 초과여부 확인

        Manager manager = managerRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 관리자"));  // 관리자 조회
        Notice notice = Notice.createNotice(manager, Whether.N, 0L, title, contents);  // 공지사항 생성
        Notice savedNotice = noticeRepository.save(notice);  // 공지사항 등록
        fileService.createFiles(fileList, savedNotice);  // 파일 등록

        return NoticeDto.NoticeResponseDto.builder()
                .id(savedNotice.getId())  // 등록된 공지사항 번호 반환
                .build();
    }

    /**
     * 공지사항 등록 (첨부 파일 제외)
     */
    public NoticeDto.NoticeResponseDto createNotice(String loginId, String title, String contents) {
        Manager manager = managerRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 관리자"));  // 관리자 조회
        Notice notice = Notice.createNotice(manager, Whether.N, 0L, title, contents);  // 공지사항 생성
        return NoticeDto.NoticeResponseDto.builder()
                .id(noticeRepository.save(notice).getId())  // 공지사항 등록 및 등록된 공지사항 번호 반환
                .build();
    }

    /**
     * 공지사항 수정 (첨부 파일 제외)
     */
    @Transactional
    public void updateNotice(String loginId, Long noticeId, String title, String contents) {
        managerRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 관리자"));  // 관리자 조회
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));  // 공지사항 조회
        notice.edit(title, contents);  // 공지사항 수정
    }

    /**
     * 공지사항 삭제
     */
    @Transactional
    public void deleteNotice(String loginId, Long noticeId) {
        managerRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 관리자"));  // 관리자 조회
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));  // 공지사항 조회

        // 파일 삭제
        List<File> fileList = notice.getFileList();
        for (int i = fileList.size() - 1; i >= 0; i--) {
            fileList.get(i).delete(notice);
        }

        notice.delete();  // 공지사항 삭제
    }

    /**
     * 공지사항 조회수 갱신
     */
    @Transactional
    public void updateViews(Long noticeId, Long views) {
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));  // 공지사항 조회
        Long totalViews = notice.getViews() + views;  // 기존 조회수에 갱신
        notice.changeViews(totalViews);
    }

    // 좋아요 수 조회
    public Long getLikeCount(Notice notice) {
        return likeRepository.countByTargetTypeAndTargetId(TargetType.NOTICE, notice.getId());
    }
}
