package ramyeon.everyday.domain.file.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ramyeon.everyday.domain.file.entity.File;

public interface FileRepository extends JpaRepository<File, Long> {

}
