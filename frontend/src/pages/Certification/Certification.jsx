import React, { useState } from 'react'
import './Certification.css'
import { TextField } from '@mui/material/';

import * as UserAPI from '../../api/Users';
import { Message } from '../../component/Message';
import { useNavigate } from 'react-router-dom';


function Certification() {

    const [emailVal, setEmailVal] = useState("");
    const [codeVal, setCodeVal] = useState("");

    // '@', '.' 모두 포함
    const isValidEmail = emailVal.includes('@') && emailVal.includes('.');
    let code = "";
    let referrer = document.referrer;
    const navigate = useNavigate();

    //인증번호 받기 버튼 클릭시
    const handleGetButton = () => {
        if (!isValidEmail)
            alert('정확히 입력되었는지 다시 확인해주세요.');
        else {
            const data = {
                email: emailVal,
            }
            UserAPI.authenticate(data).then(response => {
                console.log(JSON.stringify(response));
                Message.success(response.message);
                code = Message.success(response.authenticationCode);
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            });

        }
    };
    //확인 버튼 클릭시
    const handleConfirmButton = () => {
        // const data = {
        //     email: emailVal,
        //     code: codeVal,
        // }
        // UserAPI.authenticate(data).then(response => {
        //     console.log(JSON.stringify(response));
        //     Message.success(response.message);
        //      if (referrer) {
        //         navigate('/register/info');
        //      }
        //      else if (referrer) {
        //         navigate('/forgot/password/changepw');
        //      }
        // }).catch(error => {
        //     console.log(JSON.stringify(error));
        //     Message.error(error.message);
        // });

    };

    return (
        <div className="certification-content">
            <h2 style={{ fontWeight: 'bold', marginLeft: "2rem" }}>이메일 인증</h2>
            {/* <div className="certification-inputGroup">
                    <TextField label="이메일 아이디" variant="standard" id="email1" type="text" name="email"
                        className="email-txf" value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }}
                        style={{ marginTop: "-1rem" }} />
                    <stong style={{ margin: "auto 1rem" }}>@</stong>
                    <FormControl variant="standard" sx={{ width: 140 }} >
                        <Select
                            displayEmpty
                            value={mailYearVal}
                            onChange={handleChange}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>메일 선택</em>;
                                }
                                return selected.join(', ');
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="">
                                <em>메일 선택</em>
                            </MenuItem>
                            {mailValues.map((mailValue) => (
                                <MenuItem

                                    key={mailValue}
                                    value={mailValue}
                                    style={getStyles(mailValue, mailYearVal, theme)}
                                >
                                    {mailValue}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <button type="submit" id="send-btn" >인증번호 전송</button>
                    <div>
                        <TextField label="인증번호 입력" variant="standard" id="code1" type="text" name="code"
                            className="code-txf" value={codeVal} onChange={(e) => { setCodeVal(e.target.value) }}
                            style={{ float: "left", marginLeft: "3.7rem", marginTop: "1rem" }} />
                    </div>
                </div> */}

            <div style={{ marginTop: '2rem', marginLeft: '2rem' }}>
                <TextField
                    label="이메일을 입력하세요"
                    InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
                    style={{ width: '66%' }}
                    variant="outlined"
                    name="email"
                    helperText="에러메시지 노출예정"
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
