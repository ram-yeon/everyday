import React, { useState } from 'react'
import '../Forgot.css'

import { TextField } from '@mui/material/';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function ChangePW() {
    const [showPassword, setShowPassword] = useState(false);
    const [pwVal1, setPwVal1] = useState("");
    const [pwVal2, setPwVal2] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
    }

    return (

        <div className="forgot-content" style={{ padding: '1rem' }}>
            <form onSubmit={handlesubmit}>
                <h2 style={{ fontWeight: 'bold' }}>비밀번호 변경</h2>
                <div>
                    {/* <div>
                                <h5 className="info-h5">새 비밀번호</h5>
                                <input className="register-input" type="password" name="pw1" id="pwId1" placeholder="영문, 숫자, 특문이 2종류 이상 조합된 8~20자"
                                    value={pwVal1} onChange={(e) => { setPwVal1(e.target.value) }} />
                            </div>
                            <div className="info-inputGroup">
                                <h5 className="info-h5">새 비밀번호 확인</h5>
                                <input className="register-input" type="password" name="pw2" id="pwId2" placeholder="새 비밀번호 확인"
                                    value={pwVal2} onChange={(e) => { setPwVal2(e.target.value) }} />
                            </div> */}

                    <div style={{ marginTop: '0.5rem' }}>
                        <TextField
                            fullWidth
                            label="새 비밀번호 (*영문, 숫자, 특문이 2종류 이상 조합된 8~20자)"
                            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            helperText="에러메시지 노출예정"
                            onChange={(e) => { setPwVal1(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        <FormHelperText sx={{ float: "right" }}></FormHelperText>
                        <TextField
                            fullWidth
                            label="새 비밀번호 확인"
                            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            helperText="에러메시지 노출예정"
                            onChange={(e) => { setPwVal2(e.target.value) }} />
                    </div>

                    <button type="submit" id="changePw-btn" >비밀번호 변경</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePW
