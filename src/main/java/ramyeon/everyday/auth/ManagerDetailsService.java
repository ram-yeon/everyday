package ramyeon.everyday.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.manager.Manager;
import ramyeon.everyday.domain.manager.ManagerRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ManagerDetailsService implements UserDetailsService {

    private final ManagerRepository managerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Manager> optionalManager = managerRepository.findByLoginId(username);

        return new ManagerDetails(optionalManager.orElseThrow(() -> new UsernameNotFoundException("아이디가 틀립니다.")));
    }

}
