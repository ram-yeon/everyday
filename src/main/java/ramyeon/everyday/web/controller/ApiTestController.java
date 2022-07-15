package ramyeon.everyday.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class ApiTestController {

    @GetMapping("/testapi")
    public String testapi() {
        return "저는 Spring입니다~ 현재 서버 시간은 " + new Date() + "입니다.";
    }

}
