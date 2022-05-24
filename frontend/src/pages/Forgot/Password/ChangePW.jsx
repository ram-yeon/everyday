import React, { useState } from 'react'
import '../Forgot.css'


function ChangePW() {

    const [pwVal1, setPwVal1] = useState("");
    const [pwVal2, setPwVal2] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
    }

    return (
        <div className="main-forgot">
            <div className="forgot-contain">
                <div className="forgot-content">
                    <form onSubmit={handlesubmit}>
                        <h2 style={{ fontWeight: 'bold', marginBottom: "3rem" }}>비밀번호 변경</h2>
                        <div className="info-inputGroup">
                            <div className="info-inputGroup">
                                <h5 className="info-h5">새 비밀번호</h5>
                                <input className="register-input" type="password" name="pw1" id="pwId1" placeholder="영문, 숫자, 특문이 2종류 이상 조합된 8~20자"
                                    value={pwVal1} onChange={(e) => { setPwVal1(e.target.value) }} />
                            </div>
                            <div className="info-inputGroup">
                                <h5 className="info-h5">새 비밀번호 확인</h5>
                                <input className="register-input" type="password" name="pw2" id="pwId2" placeholder="새 비밀번호 확인"
                                    value={pwVal2} onChange={(e) => { setPwVal2(e.target.value) }} />
                            </div>
                            <button type="submit" id="changePw-btn" >비밀번호 변경</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePW
