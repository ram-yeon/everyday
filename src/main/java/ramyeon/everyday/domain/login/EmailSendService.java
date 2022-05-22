package ramyeon.everyday.domain.login;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@AllArgsConstructor
public class EmailSendService {

    private final JavaMailSenderImpl javaMailSender;

    // 이메일 인증을 위한 인증코드 전송
    public String sendCode(String email) {
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        // 인증코드 생성
        for (int i = 0; i < 3; i++) {  // A~Z 랜덤 3자리 알파벳 생성
            int index = random.nextInt(25) + 65;
            code.append((char) index);
        }
        int numIndex = random.nextInt(8999) + 1000;  // 4자리 정수 생성
        code.append(numIndex);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("[에브리데이] 회원가입 인증코드 안내");
        message.setText("아래 인증코드를 인증코드 기입란에 입력하시기 바랍니다.\n\n인증 코드 : " + code);
        javaMailSender.send(message);

        return code.toString();
    }

}
