import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox } from '@mui/material';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action';
import * as UserAPI from '../../api/Users';
import { Message } from '../../component/Message';
import { useNavigate, useLocation } from 'react-router-dom';

function Login(props) {
    const [idVal, setIdVal] = useState("");
    const [pwVal, setPwVal] = useState("");
    const [checked, setChecked] = useState(false);
    const { state } = useLocation();  //이전페이지에서 받은 type값(user인지 manager인지)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
      };

    const handleBtn = (event) => {
        // event.preventDefualt();
        let isKeptLogin = '';
        if (checked) {
            isKeptLogin = 'Y'
        } else {
            isKeptLogin = 'N'
        }
        const data = {
            loginId: idVal,
            password: pwVal,
            type: state,
            isKeptLogin: isKeptLogin,
        }
        UserAPI.login(data).then(response => {
            props.loginCallBack(true);
            navigate("/");
        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        });
        // redux사용
        // dispatch(loginUser(data))
        //     .then(response => {
        //         if(response.payload.loginSuccess){
        //             props.history.phsh('/')
        //             // navigate("/");
        //         } else{
        //             alert('Error');
        //         }
        //     })
    }

    return (
        <div className="login-contain">
            <div className="login-content">
                <div >
                    <div className="login-header img-class">
                        <img src={"/images/logo.png"} id="img-id" alt="로고이미지" />
                    </div>
                    <div className="login-header">
                        <p style={{ color: 'dimgray', fontWeight: 'bold', fontStyle: 'italic' }}>지금 에브리데이를 시작해보세요!</p>
                    </div>
                </div>
                <input type="id" className="login-input" placeholder="아이디"
                    value={idVal} onChange={(e) => { setIdVal(e.target.value) }} />
                <input type="password" className="login-input" placeholder="비밀번호"
                    value={pwVal} onChange={(e) => setPwVal(e.target.value)} />
                <button onClick={handleBtn} type="submit" id="login-btn">로그인</button>
                <div>
                    <div className="login-footer">
                        <FormControlLabel control={<Checkbox value="remember" color="default" size="small" checked={checked} onChange={handleCheckBox} />}
                            label="로그인 유지" />
                    </div>
                    <div className="login-footer">
                        <Link id="forgot-link" to='/forgot'>아이디/비밀번호 찾기</Link>
                    </div>
                </div>

                <div>
                    <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem' }}>에브리데이에 처음이신가요? <Link id="register-link" to='/register'>회원가입</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login




