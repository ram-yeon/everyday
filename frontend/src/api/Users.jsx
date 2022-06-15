import Axios from "../component/Axios/Axios";
import {NewPromise} from "../component/Common";

export const join = (data) => NewPromise(Axios.post('/users', data));