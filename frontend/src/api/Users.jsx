import Axios from "../component/Axios/Axios";
import { NewPromise } from "../component/Common";


//이메일인증
export const authenticate = (data) => NewPromise(Axios.post('/email-authenticate', data));
//이메일인증 코드 확인
export const authenticateCodeCheck = (data) => NewPromise(Axios.post('/check-authenticationcode', data));

//가입
export const join = (data) => NewPromise(Axios.post('/users', data));

//로그인
export const login = (data) => NewPromise(Axios.post('/login', data));
//로그아웃
export const logout = (data) => NewPromise(Axios.get('/logout', data));

//아이디 찾기
export const findID = (data) => NewPromise(Axios.post('/find-id', data));
//비번 찾기
export const findPW = (data) => NewPromise(Axios.post('/find-password', data));
//비번 변경
export const changePW = (data) => NewPromise(Axios.patch('/users/password/edit', data));
