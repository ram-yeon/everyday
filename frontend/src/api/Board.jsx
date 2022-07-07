import Axios from "../component/Axios/Axios";
import { NewPromise } from "../component/Common";


//메인화면 게시글 목록 조회ㅇ
export const mainBoardSelect = () => NewPromise(Axios.get('/posts/main'));

//회원 정보 배너 조회ㅇ
export const userInfoSelect = () => NewPromise(Axios.get('/users/banner'));
//회원 등급(권한) 변경 ㅇ
export const userAuthorityEdit = (data) => NewPromise(Axios.post('/users/authority/edit', data));

//게시판 별 게시글 목록 조회ㅇ
export const eachBoardSelect = (data) => NewPromise(Axios.get('/posts/list/' + data.boardType + '?page=' + data.page + '&size=' + '3'));
//공지사항 게시글 목록 조회ㅇ
export const noticeBoardSelect = (data) => NewPromise(Axios.get('/notices?page=' + data.page + '&size=' + '3'));

//게시글 상세조회(파일,댓글제외) ㅇ
export const boardDetailSelect = (data) => NewPromise(Axios.get('/posts/' + data.postId));
//공지사항 상세조회(파일,댓글제외) ㅇ
export const noticeBoardDetailSelect = (data) => NewPromise(Axios.get('/notices/' + data.noticeId));

//내가 쓴 글 목록조회 ㅇ
export const WritenByMe = (data) => NewPromise(Axios.get('/posts/my/POST?page=' + data.page + '&size=' + '3'));
//댓글 단 글 목록조회 ㅇ
export const commentByMe = (data) => NewPromise(Axios.get('/posts/my/COMMENT?page=' + data.page + '&size=' + '3'));
//좋아요 한 글 목록조회 ㅇ
export const likeByMe = (data) => NewPromise(Axios.get('/posts/notices/like?page=' + data.page + '&size=' + '3'));

//게시글 등록(파일제외) ㅇ
export const registerBoard = (data) => NewPromise(Axios.post('/posts', data));
//게시글 수정
export const updateBoard = (data) => NewPromise(Axios.patch('/posts' + data.postId));
//게시글 삭제
export const deleteBoard = (data) => NewPromise(Axios.delete('/posts' + data.postId));
//게시글 등록(관리자)(파일제외) ㅇ
export const registerBoardByAdmin = (data) => NewPromise(Axios.post('/posts', data));
//게시글 수정(관리자)
export const updateBoardByAdmin = (data) => NewPromise(Axios.patch('/posts' + data.postId));
//게시글 삭제(관리자)
export const deleteBoardByAdmin = (data) => NewPromise(Axios.delete('/posts' + data.postId));

//좋아요 추가
export const like = (data) => NewPromise(Axios.post('/likes', data));
//좋아요 삭제
export const likeCancel = (data) => NewPromise(Axios.post('/likes/delete', data));
//게시글 조회수 갱신
export const boardViews = (itemId, data) => NewPromise(Axios.patch('/posts/' + itemId + '/views', data));
//공지사항 조회수 갱신
export const noticeBoardViews = (itemId, data) => NewPromise(Axios.patch('/notices/' + itemId + '/views', data));