package ramyeon.everyday.domain.login.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.exception.NotFoundEnumException;
import ramyeon.everyday.exception.NotFoundResourceException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class EmailSendService {

    private final JavaMailSenderImpl javaMailSender;
    private final UserRepository userRepository;

    private Map<String, StringBuilder> emailAndCodeStore = new HashMap<>();  // 인증할 이메일과 인증코드 저장소

    // 이메일 인증을 위한 인증코드 전송
    public String sendCode(String email, String authType, String loginId) {

        Type type = Type.findType(authType);  // 회원가입, 비밀번호 찾기 구분

        if (type == Type.FINDPW)  // 비밀번호 찾기 시 아이디와 이메일 정보가 맞는지 확인
            userRepository.findByLoginIdAndEmail(loginId, email).orElseThrow(() -> new NotFoundResourceException("아이디와 이메일 정보가 다름"));

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
        message.setSubject("[에브리데이] " + type.getContents() + " 인증코드 안내");
        message.setText("아래 인증코드를 인증코드 기입란에 입력하시기 바랍니다.\n\n인증 코드 : " + code);
        javaMailSender.send(message);

        saveEmailAndAuthenticationCode(email, code);  // 이메일과 인증코드 저장

        return code.toString();
    }

    // 이메일과 인증코드 저장
    private void saveEmailAndAuthenticationCode(String email, StringBuilder code) {
        emailAndCodeStore.put(email, code);
    }

    // 아이디 찾기를 위한 아이디 전송
    public void sendLoginId(String email) {
        User findUser = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundResourceException("해당 이메일로 가입된 아이디 없음"));
        String loginId = findUser.getLoginId();

        // 이메일로 아이디 전송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[에브리데이] 아이디 찾기 안내");
        message.setText("본 이메일에 해당하는 아이디는 " + loginId + " 입니다.");
        javaMailSender.send(message);
    }

    // 인증코드 확인
    public int checkAuthenticationCode(String email, String inputAuthenticationCode) {
        StringBuilder authenticationCode = emailAndCodeStore.get(email);

        if (authenticationCode == null) {  // 이메일이 틀림
            return 2;
        }
        if (inputAuthenticationCode.contentEquals(authenticationCode)) {  // 인증 성공
            emailAndCodeStore.remove(email);  // 인증이 완료되었으므로 저장소에서 삭제
            return 0;
        } else {  // 인증코드가 틀림
            return 1;
        }
    }

    public enum Type {
        JOIN("회원가입"), FINDPW("비밀번호 찾기");

        private final String contents;  // 내용

        Type(String contents) {
            this.contents = contents;
        }

        public String getContents() {
            return contents;
        }

        private static final Map<String, Type> typeMap = Stream.of(values()).collect(Collectors.toMap(Type::name, Function.identity()));

        public static Type findType(String type) {
            return Optional.ofNullable(typeMap.get(type)).orElseThrow(() -> new NotFoundEnumException("잘못된 [type] 값 요청"));
        }

    }

}
