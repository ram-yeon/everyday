package ramyeon.everyday.domain.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.file.repository.FileRepository;
import ramyeon.everyday.domain.file.service.FileService;
import ramyeon.everyday.domain.like.repository.LikeRepository;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.domain.manager.service.ManagerService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final LikeRepository likeRepository;
    private final ManagerService managerService;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final FileRepository fileRepository;

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
        fileService.checkRequestFileIsEmpty(fileList);  // "imageFiles" 요청 객체에 값이 있나 확인
        fileService.checkFileType(fileList);  // 첨부 파일 종류 확인
        fileService.checkFileCountLimitExceeded(fileList);  // 파일 최대 업로드 개수 초과여부 확인

        Manager manager = managerService.getLoginManager(loginId);  // 관리자 조회
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
        Manager manager = managerService.getLoginManager(loginId);  // 관리자 조회
        Notice notice = Notice.createNotice(manager, Whether.N, 0L, title, contents);  // 공지사항 생성
        return NoticeDto.NoticeResponseDto.builder()
                .id(noticeRepository.save(notice).getId())  // 공지사항 등록 및 등록된 공지사항 번호 반환
                .build();
    }

    /**
     * 공지사항 수정
     */
    @Transactional
    public void updateNoticeWithFile(String loginId, Long noticeId, String title, String contents, List<MultipartFile> fileList) throws Exception {
        fileService.checkRequestFileIsEmpty(fileList);  // "imageFiles" 요청 객체에 값이 있나 확인
        fileService.checkFileType(fileList);  // 첨부 파일 종류 확인
        fileService.checkFileCountLimitExceeded(fileList);  // 파일 최대 업로드 개수 초과여부 확인

        managerService.getLoginManager(loginId);  // 관리자 조회

        // 공지사항 및 파일 조회 - fetch join을 통한 성능 최적화로 쿼리 수 감소
        Notice notice = noticeRepository.findByIsDeletedWithFile(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));// 공지사항 조회
        List<File> originalFiles = notice.getFileList();  // 공지사항이 기존에 가지고 있던 파일들

        // 파일 존재 여부에 따른 처리 방식
        // Server | Client | 처리
        //      X | X      | #1. skip
        //      X | O      | #2. 추가
        //      O | X      | #3. 삭제
        //      O | O      | #4. 추가 or 삭제 or 변경

        if (CollectionUtils.isEmpty(originalFiles)) {  // 파일이 존재하지 않는 공지사항
            if (!CollectionUtils.isEmpty(fileList)) {  // 수정할 새 파일 존재 (#2 처리)
                fileService.createFiles(fileList, notice);  // 파일 추가
            }

        } else {  // 파일이 존재하는 공지사항
            if (CollectionUtils.isEmpty(fileList)) {  // 수정할 새 파일이 존재하지 않음 (#3 처리)
                // 기존 파일 삭제
                for (int i = originalFiles.size() - 1; i >= 0; i--) {
                    File originalFile = originalFiles.get(i);
                    originalFile.delete(notice);
                    fileRepository.delete(originalFile);  // DB에서 제거
                }

            } else {  // 수정할 새 파일 존재 (#4 처리)

                // 서버에 저장되어있는 파일과 새 파일의 존재 여부에 따른 처리 방식
                // Server | Client | 처리
                //      X | X      | #5. skip
                //      X | O      | #6. 추가
                //      O | X      | #7. 삭제
                //      O | O      | #8. 기존 파일의 sequence 변경

                // 서버에 저장되어 있는 파일의 원본명과 인스턴스 저장
                Map<String, File> originalFileInfo = new HashMap<>();
                for (File originalFile : originalFiles) {
                    originalFileInfo.put(originalFile.getUploadFilename(), originalFile);
                }

                // 서버에 저장되어 있는 파일이 요청 온 새 파일에도 존재하는지 확인
                for (Map.Entry<String, File> fileEntry : originalFileInfo.entrySet()) {
                    // 서버에 저장되어 있는 파일이 요청 온 새 파일에는 존재하지 않음 (#7 처리)
                    if (fileList.stream().noneMatch(f -> f.getOriginalFilename().equals(fileEntry.getKey()))) {  // 원본명이 같은 파일이 없음
                        fileEntry.getValue().delete(notice);  // 서버에 저장되어 있던 파일 삭제
                        fileRepository.delete(fileEntry.getValue());  // DB에서 제거
                    }
                }

                // 요청 온 새 파일이 서버에도 존재하는지 확인
                long fileSequence = 1L;  // 파일 순서
                for (MultipartFile newFile : fileList) {
                    String newFileName = newFile.getOriginalFilename();
                    // 요청 온 새 파일이 서버에도 존재 (#8 처리)
                    if (originalFileInfo.containsKey(newFileName)) {  // 원본명이 같은 파일이 존재
                        originalFileInfo.get(newFileName).changeSequence(fileSequence);  // 기존 파일의 sequence 변경

                    } else {  // 요청 온 새 파일이 서버에는 존재하지 않음 (#6 처리)
                        fileRepository.save(fileService.uploadFile(newFile, fileSequence, notice));  // 파일 업로드 후, DB에 파일 저장
                    }
                    fileSequence++;  // 파일 순서 누적
                }
            }
        }
        notice.edit(title, contents);  // 공지사항 내용 수정
    }

    /**
     * 공지사항 수정 (첨부 파일 제외)
     */
    @Transactional
    public void updateNotice(String loginId, Long noticeId, String title, String contents) {
        managerService.getLoginManager(loginId);  // 관리자 조회
        Notice notice = noticeRepository.findByIdAndIsDeleted(noticeId, Whether.N).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 공지사항"));  // 공지사항 조회
        notice.edit(title, contents);  // 공지사항 수정
    }

    /**
     * 공지사항 삭제
     */
    @Transactional
    public void deleteNotice(String loginId, Long noticeId) {
        managerService.getLoginManager(loginId);  // 관리자 조회
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
