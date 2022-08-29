import * as CommonJs from "../lib/Common";
import {SESSION_TOKEN_KEY} from '../component/Axios/Axios'; //Axios파일에서 설정한 토큰키의 값 가져오기

export const NewPromise = (promise) => {
    return new Promise(function (resolve, reject) {
        promise
            .then((response) => {
                if (200 === response.status) {
                    if (response.config.url === '/login' || response.config.url === '/adminlogin') {
                        localStorage.setItem(SESSION_TOKEN_KEY, response.headers.authorization);    //토큰키에 응답받은 토큰값 set
                    }
                    resolve(response.data);
                } else {
                    reject({error: {}, message: response.statusText});
                }
            })
            .catch((error) => {
                const errorMessage = CommonJs.extractErrorMessage(error);
                reject({error: error, message: errorMessage});
            });
    });
};