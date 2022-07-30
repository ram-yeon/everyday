import React, { useState } from 'react'
import './Certification.css'
import { TextField } from '@mui/material/';

import * as UserAPI from '../../api/Users';
import { Message } from '../../component/Message';

function Certification(props) {

    const [emailVal, setEmailVal] = useState("");
    const [codeVal, setCodeVal] = useState("");

    // '@', '.' 모두 포함
    const isValidEmail = emailVal.includes('@') && emailVal.includes('.');

    //인증번호 받기 버튼 클릭시
    const handleGetButton = () => {
        if (!isValidEmail)
            alert('정확히 입력되었는지 다시 확인해주세요.');
        else {
            const data = {
                email: emailVal,
                type: props.type,
            }
            if (props.id) {
                data['loginId'] = props.id;
            }
            UserAPI.authenticate(data).then(response => {
                console.log(JSON.stringify(response));
                Message.success(response.message);
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            });
        }
    };

    const isNext = false;  //다음페이지로 넘어갈지 여부체크
    //확인 버튼 클릭시
    const handleConfirmButton = () => {
        const data = {
            email: emailVal,
            authenticationCode: codeVal, 
        }
        UserAPI.authenticateCodeCheck(data).then(response => {
            console.log(JSON.stringify(response));
            Message.success(response.message);
            props.propFunction(emailVal, !isNext);

        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        });
    };

    return (
        <div className="certification-content">
            <h2 style={{ fontWeight: 'bold', marginTop: '1rem', marginLeft: "2rem" }}>이메일 인증</h2>
            <div style={{ marginTop: '2rem', marginLeft: '2rem' }}>
                <TextField
                    label="이메일을 입력하세요"
                    InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
                    style={{ width: '66%' }}
                    variant="outlined"
                    name="email"
                    onChange={(e) => { setEmailVal(e.target.value) }} />
                <button onClick={handleGetButton} type="submit" id="send-btn" >인증번호 받기</button>
            </div>
            <div style={{ margin: '0.5rem 2rem' }}>
                <TextField
                    fullWidth
                    label="인증번호를 입력하세요"
                    InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
                    variant="outlined"
                    name="code"
                    onChange={(e) => { setCodeVal(e.target.value) }} />
            </div>
            <div>
                <button onClick={handleConfirmButton} type="submit" id="confirm-btn" >확인</button>
            </div>
        </div>
    )
}

export default Certification
