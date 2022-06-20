import React, { useState } from 'react'
import '../../Forgot.css'

import { TextField } from '@mui/material/';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as UserAPI from '../../../../api/Users';
import { Message } from '../../../../component/Message';
import { useNavigate } from "react-router-dom";

function ChangePW(props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [pwVal1, setPwVal1] = useState("");
    const [pwVal2, setPwVal2] = useState("");

    // 비밀번호 검사(영문, 숫자, 특문이 2종류 이상 포함)
    const pwSpecialLetter = pwVal1.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const pwNumLetter = pwVal1.search(/[0-9]/g);
    const pwEngLetter = pwVal1.search(/[a-z]/ig);
    const isValidPassword = pwVal1.length >= 8 && pwVal1.length <= 20 &&
        ((pwSpecialLetter >= 1 && pwNumLetter >= 1) || (pwSpecialLetter >= 1 && pwEngLetter >= 1) || (pwNumLetter >= 1 && pwEngLetter >= 1));
    // 비밀번호 확인
    const isValidConfirmPassword = (pwVal2 === pwVal1);

    const handleBtn = () => {
        if (!isValidPassword || !isValidConfirmPassword)
            alert('정확히 입력되었는지 다시 확인해주세요(영문, 숫자, 특문이 2종류 이상 조합된 8~20자)');
        else {
            const data = {
                email: props.email,
                password: pwVal1,
            }
            UserAPI.changePW(data).then(response => {
                console.log(JSON.stringify(response));
                Message.success(response.message);
                navigate('/login');
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            });
        }
    }

    return (
        <div className="forgot-content" style={{ padding: '1rem' }}>
            <h2 style={{ fontWeight: 'bold' }}>비밀번호 변경</h2>
            <div>
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

                <button onClick={handleBtn} type="submit" id="changePw-btn" >비밀번호 변경</button>
            </div>

        </div>
    )
}

export default ChangePW
