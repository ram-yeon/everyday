import Axios from "../component/Axios/Axios";
import {NewPromise} from "../component/Common";


//메인화면 게시글 목록 조회
export const mainBoardSelect = (data) => NewPromise(Axios.get('/posts/main', data));