import * as UserAPI from '../api/Users';
import { Message } from '../component/Message';
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit) {
    const request = UserAPI.login(dataToSubmit).then(response => response.data)
                
    // }).catch(error => {
    //     console.log(JSON.stringify(error));
    //     Message.error(error.message);
    // });

    return {
        type: LOGIN_USER,
        payload: request
    }
}