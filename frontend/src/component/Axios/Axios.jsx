//Axios 컴포넌트 (Axios에 대한 설정값 공통화)
import CommonAxios from 'axios';

const Axios = CommonAxios.create({
    headers: {
        'Content-Type': 'application/json; charset=UTF-8;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    },
});

if (process.env.NODE_ENV === 'development') {
    Axios.defaults.baseURL = 'http://localhost:8080'
}

export const SESSION_TOKEN_KEY = "__EVERYDAY__auth__";

Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);  //api요청시 토큰키 값 넣어서 요청
    // config.headers.Authorization = "Bearer" + token;
    config.headers.Authorization = token;
    config.data = JSON.stringify(config.data);
    return config;
});

Axios.interceptors.response.use(function (response) {
    if (401 === response.status) {
        window.location.href = '/login';
    } else if (403 === response.status) {
        window.history.back();
    }

    if (response.data) {
        const data = response.data;
        if (!data.code || data.code !== 1000) {
            // todo 필요한 처리
            // return Promise.reject("호출이 실패하였습니다.");
        }
    }

    return response;
}, function (error) {
    if (error.hasOwnProperty('response')) {
        const response = error.response;
        if (401 === response.status) {
            window.location.href = '/login';
        } else if (403 === response.status) {
            window.history.back();
        }
    }

    return Promise.reject(error);
});


export default Axios;
