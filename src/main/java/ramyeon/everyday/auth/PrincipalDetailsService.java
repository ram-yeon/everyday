package ramyeon.everyday.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.user.entity.User;
import ramyeon.everyday.domain.user.repository.UserRepository;
import ramyeon.everyday.enum_.Whether;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByLoginIdAndIsDeleted(username, Whether.N);

        return new PrincipalDetails(optionalUser.orElseThrow(() -> new UsernameNotFoundException("아이디가 틀립니다.")));
    }

}
