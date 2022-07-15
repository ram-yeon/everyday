package ramyeon.everyday.domain.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.manager.entity.Manager;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {

    Optional<Manager> findByLoginId(String loginId);
}
