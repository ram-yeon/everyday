//회원정보 입력
import React, { useState } from 'react'
import './Register.css';
import { Link } from 'react-router-dom';

import { TextField } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as UserAPI from '../../../api/Users';
import { Message } from '../../../component/Message';
import { useNavigate } from "react-router-dom";

function Info(props) {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    userName: '',
    id: '',
    password: '',
    confirmPassword: '',
    nickName: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { userName, id, password, confirmPassword, nickName } = inputValue;

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // *** Validation check ***
  // 아이디 검사(영문, 숫자 4-20자)
  const idNumLetter = id.search(/[0-9]/g);
  // const idEngLetter = id.search(/[a-z]/ig);
  const isValidId = id.length >= 4 && id.length <= 20 && idNumLetter >= 1; //&& idEngLetter >= 1
  // 비밀번호 검사(영문, 숫자, 특문이 2종류 이상 포함)
  const pwSpecialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const pwNumLetter = password.search(/[0-9]/g);
  const pwEngLetter = password.search(/[a-z]/ig);
  const isValidPassword = password.length >= 8 && password.length <= 20 &&
    ((pwSpecialLetter >= 1 && pwNumLetter >= 1) || (pwSpecialLetter >= 1 && pwEngLetter >= 1) || (pwNumLetter >= 1 && pwEngLetter >= 1));
  // 비밀번호 확인
  const isValidConfirmPassword = (confirmPassword === password);
  // 이름과 닉네임은 1자 이상이 되어야 함
  const isValidInput = userName.length >= 1 && nickName.length >= 1;

  // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive가 작동
  const getIsActive =
    isValidPassword && isValidConfirmPassword && isValidInput && isValidId === true;

  // 유효성 검사 중 하나라도 만족하지못할때 즉, 버튼이 비활성화 될 때 버튼을 클릭하면 아래와 같은 경고창이 뜸
  const handleButton = () => {
    if (!isValidInput || !isValidId || !isValidPassword || !isValidConfirmPassword)
      alert('정확히 입력되었는지 다시 확인해주세요.');
    else {
      const data = {
        loginId: id,
        password: password,
        name: userName,
        email: props.email,
        nickname: nickName,
        admissionYear: props.admissionYear,
        schoolName: props.schoolName
      }
      UserAPI.join(data).then(response => {
        console.log(JSON.stringify(response));
        navigate('/login');
      }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
      });

    }
  }

  return (
    <div className="register-content" style={{ padding: '1rem' }}>
      <h2 style={{ fontWeight: 'bold', textAlign: 'left', margin: '1rem auto auto 0.5rem' }}>회원 정보</h2>

      <div style={{ marginTop: '2rem' }}>
        <TextField
          fullWidth
          label="이름 (*성명 입력)"
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          name="userName"
          helperText=""
          onChange={handleInput} />
      </div>
      <div style={{ marginTop: '0.8rem' }}>
        <TextField
          fullWidth
          label="아이디 (*영문+숫자 4~20자)"
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          name="id"
          helperText=""
          onChange={handleInput} />
      </div>
      <div style={{ marginTop: '0.8rem' }}>
        <TextField
          fullWidth
          label="비밀번호 (*영문+숫자+특문 2종류 이상 조합된 8~20자)"
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          name="password"
          helperText=""
          onChange={handleInput}
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
      <div style={{ marginTop: '0.8rem' }}>
        <TextField
          fullWidth
          label="비밀번호 확인"
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          type="password"
          name="confirmPassword"
          helperText=""
          onChange={handleInput} />
      </div>
      <div style={{ marginTop: '0.8rem' }}>
        <TextField
          fullWidth
          label="닉네임 (*커뮤니티 활동에 필요)"
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          name="nickName"
          helperText=""
          onChange={handleInput} />
      </div>
      <div style={{ marginTop: '0.8rem' }}>
        <TextField
          disabled
          fullWidth
          label="이메일 (*아이디/비밀번호 찾기에 필요)"
          style={{ background: "#F6F6F6" }}
          InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
          variant="outlined"
          name="email"
          helperText=""
          defaultValue={props.email}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop:'1rem' }}>
        <button onClick={() => props.goBack(4)} className="cancelBtn">이전</button>
        <button
          type="submit"
          className={
            getIsActive ? 'signUpBtnAction' : 'signUpBtnInaction'
          }
          onClick={handleButton}
        >회원가입</button>
      </div>


      <div>
        <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem' }}>이미 에브리데이 계정이 있으신가요? <Link id="login-link" to='../login'>로그인</Link></p>
      </div>

    </div >
  )
}

export default Info