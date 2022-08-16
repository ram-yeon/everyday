package ramyeon.everyday.domain.manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.manager.entity.Manager;
import ramyeon.everyday.domain.manager.repository.ManagerRepository;
import ramyeon.everyday.exception.NotFoundResourceException;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;

    // 로그인한 관리자 조회
    public Manager getLoginManager(String loginId) {
        return managerRepository.findByLoginId(loginId).orElseThrow(() -> new NotFoundResourceException("존재하지 않는 관리자"));  // 관리자 조회
    }
}
