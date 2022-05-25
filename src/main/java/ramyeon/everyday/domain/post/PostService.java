package ramyeon.everyday.domain.post;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ramyeon.everyday.domain.Whether;
import ramyeon.everyday.domain.comment.Comment;
import ramyeon.everyday.domain.file.File;
import ramyeon.everyday.domain.like.LikeRepository;
import ramyeon.everyday.domain.like.TargetType;
import ramyeon.everyday.domain.user.User;
import ramyeon.everyday.domain.user.UserRepository;
import ramyeon.everyday.dto.CommentDto;
import ramyeon.everyday.dto.FileDto;
import ramyeon.everyday.dto.PostDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    // 게시판 별 게시글 목록 조회
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

    // 게시글 상세 조회
    public PostDto.PostDetailResponseDto getPostDetail(Long postId, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회
        Post post = postRepository.findByIdAndSchoolAndIsDeleted(postId, loginUser.getSchool(), Whether.N).orElse(null);  // 게시글 조회
        if (post == null) {
            return null;
        } else {
            Long likeCount = likeRepository.countByTargetTypeAndTargetId(TargetType.POST, post.getId());  // 좋아요 수 조회

            // File 엔티티를 FileInPostResponseDto로 변환
            List<File> fileList = post.getFileList();
            List<FileDto.FileInPostResponseDto> fileDtoList = new ArrayList<>();
            for (File file : fileList) {
                fileDtoList.add(new FileDto.FileInPostResponseDto(file.getSequence(), file.getUploadFilename(), file.getStoreFilename()));
            }

            // Comment 엔티티를 CommentInPostResponseDto로 변환
            List<Comment> commentList = post.getCommentList();
            List<CommentDto.CommentInPostResponseDto> commentDtoList = new ArrayList<>();
            for (Comment comment : commentList) {
                commentDtoList.add(new CommentDto.CommentInPostResponseDto(comment.getId(), comment.getUser().getNickname(), comment.getContents(), comment.getRegistrationDate(),
                        comment.getCommentType(), comment.getPreId(), comment.getIsAnonymous()));
            }

            return new PostDto.PostDetailResponseDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                    post.getBoardType(), post.getIsAnonymous(), post.getViews(), likeCount,
                    fileDtoList.size(), fileDtoList, commentDtoList.size(), commentDtoList);
        }
    }

    // 내가 쓴 게시글 목록 조회
    public List<PostDto.PostsMyResponseDto> getPostsMy(String type, String loginId) {
        User loginUser = userRepository.findByLoginId(loginId).orElse(null);  // 회원 조회

        List<Post> posts;
        if ("posts".equals(type)) {   // 내가 쓴 글
            posts = postRepository.findByUserAndIsDeleted(loginUser, Whether.N, Sort.by(Sort.Direction.DESC, "registrationDate"));// 내가 쓴 글 조회 최신순
        } else {
            return null;
        }

        // Post 엔티티를 PostsMyResponseDto로 변환
        List<PostDto.PostsMyResponseDto> postDtoList = new ArrayList<>();
        for (Post post : posts) {
            Long likeCount = likeRepository.countByTargetTypeAndTargetId(TargetType.POST, post.getId());  // 좋아요 수 조회
            postDtoList.add(new PostDto.PostsMyResponseDto(post.getId(), post.getUser().getNickname(), post.getTitle(), post.getContents(), post.getRegistrationDate(),
                    post.getBoardType(), post.getIsAnonymous(), post.getViews(), likeCount, post.getFileList().size(), post.getCommentList().size()));
        }
        return postDtoList;
    }

}
