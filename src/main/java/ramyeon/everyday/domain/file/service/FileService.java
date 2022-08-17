package ramyeon.everyday.domain.file.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import ramyeon.everyday.domain.file.entity.File;
import ramyeon.everyday.domain.file.repository.FileRepository;
import ramyeon.everyday.exception.BadFileUploadException;
import ramyeon.everyday.exception.InvalidInputValueException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;

    @Value("${file.dir}")
    private String fileDir;  // 파일 저장 경로

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    // 파일 여러개 업로드
    private List<ramyeon.everyday.domain.file.entity.File> uploadFiles(List<MultipartFile> multipartFiles, Object type) throws IOException {
        long fileSequence = 1L;  // 파일 순서
        List<ramyeon.everyday.domain.file.entity.File> fileList = new ArrayList<>();
        // 파일이 존재하는 경우
        if (!CollectionUtils.isEmpty(multipartFiles)) {
            for (MultipartFile multipartFile : multipartFiles) {
                File uploadedFile = uploadFile(multipartFile, fileSequence, type);
                if (uploadedFile != null) {
                    fileList.add(uploadedFile);
                    fileSequence++;
                }
            }
        }
        return fileList;
    }

    // 파일 1개 업로드
    public ramyeon.everyday.domain.file.entity.File uploadFile(MultipartFile multipartFile, long sequence, Object type) throws IOException {
        if (multipartFile == null)  // 파일이 존재하지 않는 경우
            return null;

        String originalFilename = multipartFile.getOriginalFilename();  // 사용자가 업로드한 파일명
        String storeFileName = createStoreFileName(originalFilename);  // 서버에 저장하는 파일명
        multipartFile.transferTo(new java.io.File(getFullPath(storeFileName)));  // 서버에 파일 저장
        Long fileSize = multipartFile.getSize();  // 파일 용량

        return File.addFile(originalFilename, storeFileName, String.valueOf(fileSize), sequence, type);  // 파일 등록
    }

    // 확장자를 붙여서 파일 이름 관리
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 확장자 가져오기
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    // 파일 업로드 개수 초과 여부 확인
    public void checkFileCountLimitExceeded(List<MultipartFile> fileList) {
        // 파일이 존재하는 경우
        if (!CollectionUtils.isEmpty(fileList)) {
            int uploadFileCnt = fileList.size();  // 업로드 파일 개수
            if (uploadFileCnt > 20)  // 업로드 가능한 파일 개수 초과
                throw new BadFileUploadException("파일은 최대 20개 까지 업로드 가능" + System.lineSeparator() + "현재 업로드 파일 개수: " + uploadFileCnt);
        }
    }

    // 첨부 파일 종류 확인
    public void checkFileType(List<MultipartFile> fileList) {
        // 파일이 존재하는 경우
        if (!CollectionUtils.isEmpty(fileList)) {
            for (MultipartFile file : fileList) {
                if (!file.getContentType().startsWith("image"))  // 이미지 파일만 업로드 가능
                    throw new BadFileUploadException("이미지 파일만 첨부할 수 있습니다.");
            }
        }
    }

    // "imageFiles" 요청 객체에 값이 없을 때
    public void checkRequestFileIsEmpty(List<MultipartFile> fileList) {
        // "imageFiles" 요청 객체가 존재하는 경우
        if (!CollectionUtils.isEmpty(fileList)) {
            if (fileList.get(0).getContentType() == null)  // "imageFiles" 요청 객체에 값이 없을 때
                throw new InvalidInputValueException("파일을 첨부하세요");
        }
    }

    /**
     * 파일 등록
     */
    public void createFiles(List<MultipartFile> multipartFiles, Object type) throws IOException {
        List<File> uploadFiles = uploadFiles(multipartFiles, type);  // 서버에 파일 업로드
        for (ramyeon.everyday.domain.file.entity.File uploadFile : uploadFiles) {
            fileRepository.save(uploadFile);  // DB에 파일 저장
        }
    }
}
