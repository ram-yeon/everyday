import React, { useState } from 'react'
import './Certification.css'
import { TextField } from '@mui/material/';


function Certification() {

    // const [emailVal, setEmailVal] = useState("");
    const [codeVal, setCodeVal] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
    };

    return (
        <div className="certification-content">
            <form onSubmit={handlesubmit}>
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
                        onChange={(e) => { setCodeVal(e.target.value) }} />

                    <button type="submit" id="send-btn" >인증번호 받기</button>
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
                    <button type="submit" id="confirm-btn" >확인</button>
                </div>
            </form>
        </div>
    )
}

export default Certification
