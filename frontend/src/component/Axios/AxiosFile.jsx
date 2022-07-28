import CommonAxios from 'axios';

const AxiosFile = CommonAxios.create({
    // timeout: 30000,
    headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8; boundary=----WebKitFormBoundarydaeFwpUryMQuuI8t',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    },
});

if (process.env.NODE_ENV === 'development') {
    AxiosFile.defaults.baseURL = 'http://localhost:8080'
}

export const SESSION_TOKEN_KEY = "__EVERYDAY__auth__";

AxiosFile.interceptors.request.use(function (config) {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);  //api요청시 토큰키 값 넣어서 요청
    config.headers.Authorization = token;
    const test = Object.fromEntries(config.data);
    // config.data = JSON.stringify(config.data);
    config.data = test;
    return config;
});

AxiosFile.interceptors.response.use(function (response) {
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


export default AxiosFile;
