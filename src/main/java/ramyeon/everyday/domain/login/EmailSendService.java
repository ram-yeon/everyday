package ramyeon.everyday.domain.login;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;

import java.util.Random;

@Service
@AllArgsConstructor
public class EmailSendService {

    private final JavaMailSenderImpl javaMailSender;
    private final UserRepository userRepository;

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

    // 아이디 찾기를 위한 아이디 전송
    public boolean sendLoginId(String email) {
        User findUser = userRepository.findByEmail(email).orElse(null);
        if (findUser == null) {  // 이메일로 가입된 회원이 없음
            return false;
        } else {  // 이메일로 아이디 전송
            String loginId = findUser.getLoginId();

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("[에브리데이] 아이디 찾기 안내");
            message.setText("본 이메일에 해당하는 아이디는 " + loginId + " 입니다.");
            javaMailSender.send(message);

            return true;
        }
    }

}
