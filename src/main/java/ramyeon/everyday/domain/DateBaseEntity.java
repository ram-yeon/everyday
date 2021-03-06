package ramyeon.everyday.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class DateBaseEntity {

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(columnDefinition = "datetime(6)")
    private LocalDateTime registrationDate;  // 등록일시

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(columnDefinition = "datetime(6)")
    private LocalDateTime modificationDate;  // 수정일시

}
