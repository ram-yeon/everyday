import Axios from "../component/Axios/Axios";    
import { NewPromise } from "../component/Common";

//메인화면 게시글 목록 조회
export const mainBoardSelect = () => NewPromise(Axios.get('/posts/main'));

//회원 정보 배너 조회
export const userInfoSelect = () => NewPromise(Axios.get('/users/banner'));
//회원 등급(권한) 변경
export const userAuthorityEdit = (data) => NewPromise(Axios.post('/users/authority/edit', data));

//게시판 별 게시글 목록 조회
export const eachBoardSelect = (data) => NewPromise(Axios.get(`/posts/list/${data.boardType}?page=${data.page}&size=3`));

//공지사항 게시글 목록 조회
export const noticeBoardSelect = (data) => NewPromise(Axios.get(`/notices?page=${data.page}&size=3`));

//게시글 상세조회
export const boardDetailSelect = (data) => NewPromise(Axios.get('/posts/' + data.postId));
//게시글의 댓글 조회
export const boardCommentSelect = (data) => NewPromise(Axios.get('/posts/' + data.postId + '/comments'));
//게시글의 대댓글 조회
export const boardReplySelect = (data) => NewPromise(Axios.get('/posts/' + data.postId + '/comments/' + data.commentId));
//공지사항 상세조회
export const noticeBoardDetailSelect = (data) => NewPromise(Axios.get('/notices/' + data.noticeId));

//내가 쓴 글 목록조회
export const WritenByMe = (data) => NewPromise(Axios.get(`/posts/my/POST?page=${data.page}&size=3`));
//댓글 단 글 목록조회
export const commentByMe = (data) => NewPromise(Axios.get(`/posts/my/COMMENT?page=${data.page}&size=3`));
//좋아요 한 글 목록조회
export const likeByMe = (data) => NewPromise(Axios.get(`/posts/notices/like?page=${data.page}&size=3`));

//게시글 등록
export const registerBoard = (data) => NewPromise(Axios.post('/posts', data));
//게시글 수정
export const updateBoard = (postId, data) => NewPromise(Axios.patch('/posts/' + postId, data));
//게시글 삭제
export const deleteBoard = (data) => NewPromise(Axios.delete('/posts/' + data.postId));
//게시글 등록(관리자)
export const registerBoardByAdmin = (data) => NewPromise(Axios.post('/notices', data));
//게시글 수정(관리자)
export const updateBoardByAdmin = (postId, data) => NewPromise(Axios.patch('/notices/' + postId, data));
//게시글 삭제(관리자)
export const deleteBoardByAdmin = (data) => NewPromise(Axios.delete('/notices/' + data.postId));

//좋아요 추가
export const like = (data) => NewPromise(Axios.post('/likes', data));
//좋아요 삭제
export const likeCancel = (data) => NewPromise(Axios.post('/likes/delete', data));
//게시글 조회수 갱신
export const boardViews = (itemId, data) => NewPromise(Axios.patch('/posts/' + itemId + '/views', data));
//공지사항 조회수 갱신
export const noticeBoardViews = (itemId, data) => NewPromise(Axios.patch('/notices/' + itemId + '/views', data));

//게시글 검색
export const search = (data) => NewPromise(Axios.get(`/posts/search?keyword=${data.keyword}&page=${data.page}&size=3`));

//댓글,대댓글 등록
export const registerComment = (data) => NewPromise(Axios.post('/comments', data));

//댓글,대댓글 삭제
export const deleteComment = (commentId) => NewPromise(Axios.delete('/comments/' + commentId));
