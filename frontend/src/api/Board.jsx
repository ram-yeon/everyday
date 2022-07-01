import Axios from "../component/Axios/Axios";
import {NewPromise} from "../component/Common";


//메인화면 게시글 목록 조회
export const mainBoardSelect = () => NewPromise(Axios.get('/posts/main'));

//회원 정보 배너 조회
export const userInfoSelect = () => NewPromise(Axios.get('/users/banner'));

//게시판 별 게시글 목록 조회
export const eachBoardSelect = (data) => NewPromise(Axios.get('/posts/list/'+data.boardType+'?page='+data.page +'&size='+'3'));
