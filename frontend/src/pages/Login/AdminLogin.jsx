import React, { useState } from 'react'
import './Login.css'

import * as UserAPI from '../../api/Users';
import { Message } from '../../component/Message';
import { useNavigate } from 'react-router-dom';

function AdminLogin(props) {
    const [idVal, setIdVal] = useState("");
    const [pwVal, setPwVal] = useState("");
    // const { state } = useLocation();  //이전페이지에서 받은 type값(user인지 manager인지)
    const navigate = useNavigate();

    const handleBtn = (event) => {
        // event.preventDefualt();
        const data = {
            loginId: idVal,
            password: pwVal,
            type: 'MANAGER',
        }
        UserAPI.login(data).then(response => {
            props.loginCallBack(true);
            navigate('/');
        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        });
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

            </div>
        </div>
    )
}

export default AdminLogin
