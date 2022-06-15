import React, { useState } from 'react'
import './Login.css'
// import { Link } from 'react-router-dom';
// import { FormControlLabel, Checkbox } from '@mui/material';


function AdminLogin() {

    const [idval, setidval] = useState("");
    const [pwval, setpwval] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
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
                <form onSubmit={handlesubmit}>
                    <input type="id" className="login-input" placeholder="아이디"
                        value={idval} onChange={(e) => { setidval(e.target.value) }} />
                    <input type="password" className="login-input" placeholder="비밀번호"
                        value={pwval} onChange={(e) => setpwval(e.target.value)} />
                    <button type="submit" id="login-btn">로그인</button>
                </form>

                {/* <div>
                    <div className="login-footer">
                        <FormControlLabel control={<Checkbox value="remember" color="default" size="small" />}
                            label="로그인 유지" />
                    </div>
                    <div className="login-footer">
                        <Link id="forgot-link" to='/forgot'>아이디/비밀번호 찾기</Link>
                    </div>
                </div>

                <div>
                    <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem' }}>에브리데이에 처음이신가요? <Link id="register-link" to='/register'>회원가입</Link></p>
                </div> */}
            </div>




        </div>

    )
}

export default AdminLogin
