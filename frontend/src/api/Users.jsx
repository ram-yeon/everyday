import Axios from "../component/Axios/Axios";
import {NewPromise} from "../component/Common";


//이메일인증
export const authenticate = (data) => NewPromise(Axios.post('/email-authenticate', data));
//이메일인증 코드 확인
export const authenticateCodeCheck = (data) => NewPromise(Axios.post('/check-authenticationcode', data));
//가입
export const join = (data) => NewPromise(Axios.post('/users', data));
//로그인
export const login = (data) => NewPromise(Axios.post('/login', data));
//아이디 찾기
export const findID = (data) => NewPromise(Axios.post('/find-id', data));
//비번 찾기
export const findPW = (data) => NewPromise(Axios.post('/find-password', data));
//비번 변경
export const changePW = (data) => NewPromise(Axios.patch('/users/password/edit', data));


// EX)
// export const list = (data) => NewPromise(Axios.post('/admin/buyer/list', data));
// export const get = (data) => NewPromise(Axios.post('/admin/buyer/detail', data));
// export const add = (data) => NewPromise(Axios.post('/admin/buyer/add', data));
// export const update = (data) => NewPromise(Axios.post('/admin/buyer/update', data));
// export const del = (data) => NewPromise(Axios.post('/admin/buyer/delete', data));