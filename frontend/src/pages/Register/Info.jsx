import React, { useState, useHistory, useEffect } from 'react'
import './Register.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material/';

// import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import * as UserAPI from '../../api/Users';

function Info() {
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const data = {}
      UserAPI.join(data).then(response => {

      }).catch(error => {

      });
      
    });
  const onhandlePost = async (data) => {
    const { email, name, password } = data;
    const postData = { email, name, password };

    

    // api
    await axios
      .post('/users/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        history.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
    };
    const { age, city, email, name, password, rePassword } = joinData;

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) 
    ) {
      onhandlePost(joinData);
    }
  };


  const [inputValue, setInputValue] = useState({
    userName: '',
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickName: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { userName, id, password, confirmPassword, email, nickName } = inputValue;

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // '@', '.' 모두 포함
  const isValidEmail = email.includes('@') && email.includes('.');
  // 아이디 검사(영문, 숫자 4-20자)
  const idNumLetter = password.search(/[0-9]/g);
  const idEngLetter = password.search(/[a-z]/ig);
  const isValidId = id.length >= 4 && id.length <= 20 && idNumLetter >= 1 && idEngLetter >= 1;
  // 비밀번호 검사(영문, 숫자, 특문이 2종류 이상 포함)
  const pwSpecialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const pwNumLetter = password.search(/[0-9]/g);
  const pwEngLetter = password.search(/[a-z]/ig);
  const isValidPassword = password.length >= 8 && password.length <= 20 &&
    ((pwSpecialLetter >= 1 && pwNumLetter >= 1) || (pwSpecialLetter && pwEngLetter >= 1) || (pwNumLetter >= 1 && pwEngLetter >= 1));
  // 비밀번호 확인
  const isValidConfirmPassword = confirmPassword === password;

  // 모든 input의 value가 1자 이상이 되어야 하
  const isValidInput = userName.length >= 1 && nickName.length >= 1;
  // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive함수가 작동(버튼 클릭 이벤트가 발생할때 넣어줄 함수)
  const getIsActive =
    isValidEmail && isValidPassword && isValidConfirmPassword && isValidInput && isValidId === true;

  // 유효성 검사 중 하나라도 만족하지못할때 즉, 버튼이 비활성화 될 때 버튼을 클릭하면 아래와 같은 경고창이 뜸
  const handleButtonValid = () => {
    if (!isValidInput || !isValidId || !isValidEmail || !isValidPassword || !isValidConfirmPassword)
      alert('정확히 입력되었는지 다시 확인해주세요.');
  }

  const onSubmit = (data) => {
    data.preventDefualt();
    console.log('data', data)
  }

  return (

    <div className="register-content" style={{ padding: '1rem' }}>
      <h2 style={{ fontWeight: 'bold', textAlign: 'left' }}>회원 정보</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '2rem' }}>
          <TextField
            fullWidth
            label="이름 (*성명 입력)"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            name="userName"
            helperText="에러메시지 노출예정"
            onChange={handleInput} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <TextField
            fullWidth
            label="아이디 (*영문, 숫자 4~20자)"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            name="userName"
            helperText="에러메시지 노출예정"
            onChange={handleInput} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <TextField
            fullWidth
            label="비밀번호 (*영문, 숫자, 특문이 2종류 이상 조합된 8~20자)"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            name="password"
            helperText="에러메시지 노출예정"
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
        <div style={{ marginTop: '0.5rem' }}>
          {/* <FormHelperText sx={{ float: "right" }}></FormHelperText> */}
          <TextField
            fullWidth
            label="비밀번호 확인"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            type="password"
            name="confirmPassword"
            helperText="에러메시지 노출예정"
            onChange={handleInput} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <TextField
            fullWidth
            label="이메일 (*아이디/비밀번호 찾기에 필요)"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            name="email"
            helperText="에러메시지 노출예정"
            onChange={handleInput} />
        </div>
        {/* <FormHelperTexts>{emailError}</FormHelperTexts> */}
        <div style={{ marginTop: '0.5rem' }}>
          <TextField
            fullWidth
            label="닉네임 (*커뮤니티 활동에 필요)"
            InputLabelProps={{ style: { fontSize: '0.9rem', paddingTop: '4px' } }}
            variant="outlined"
            name="nickName"
            helperText="에러메시지 노출예정"
            onChange={handleInput} />
        </div>
        <button
          type="submit"
          className={
            getIsActive ? 'signUpBtnAction' : 'signUpBtnInaction'
          }
          onClick={handleButtonValid}
        >
          회원가입
        </button>
      </form >

      <div>
        <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem' }}>이미 에브리데이 계정이 있으신가요? <Link id="login-link" to='../login'>로그인</Link></p>
      </div>
    </div >
  )
}

export default Info