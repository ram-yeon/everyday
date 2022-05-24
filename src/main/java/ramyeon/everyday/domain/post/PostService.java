package ramyeon.everyday.domain.post;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.like.LikeRepository;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.PostDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public List<PostDto.PostsBoardDto> getPostsBoard(String loginId, String boardType) {
        BoardType board = BoardType.valueOf(boardType);
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        List<Post> posts = postRepository.findBySchoolAndBoardTypeAndIsDeleted(loginUser.getSchool(), board, Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));  // 게시글 조회 최근순 정렬
        List<PostDto.PostsBoardDto> postsBoardDtos = new ArrayList<>();
        for (Post post : posts) {
            Long likeCount = likeRepository.countByTargetTypeAndTargetId(TargetType.POST, post.getId());  // 좋아요 수 조회
            postsBoardDtos.add(new PostDto.PostsBoardDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                    post.getIsAnonymous(), post.getViews(), likeCount, post.getFileList().size(), post.getCommentList().size()));
        }
        return postsBoardDtos;
    }

}
