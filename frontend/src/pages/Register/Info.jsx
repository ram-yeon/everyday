import React, { useState } from 'react'
import './Register.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material/';

import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid brown",
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: "black",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
      
    }
  },
  focused: {}
}));
function StyledTextField(props) {
  const classes = useStyles();
  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

function Info() {
  const { handleSubmit } = useForm();
  // register, watch, formState: { errors },
  const [inputValue, setInputValue] = useState({
    userName: '',
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickName: '',
  });

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
    <div className="main-register">

      <div className="register-longContain">
        <div className="register-content">

          <div id="info-inputGroup">
            <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}>회원 정보</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="info-inputGroup">
                <h5 className="info-h5">이름</h5>
                <TextField
                  label="성명 입력" variant="outlined"
                  inputProps={{ style: { fontSize: "0.5rem" } }}
                  name="userName"
                  // placeholder="성명 입력"
                  onChange={handleInput}
                // {...register("name", { required: true, maxLength: 10 })}
                />
                {/* {errors.name && errors.name.type === "required" && <p>이름을 입력해주세요</p>}
                {errors.name && errors.name.type === "maxLength" && <p>최대 입력은 10글자입니다</p>} */}
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">아이디</h5>
                <input
                  className="register-input"
                  name="id"
                  placeholder="영문, 숫자 4~20자"
                  onChange={handleInput}
                />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">비밀번호</h5>
                <input
                  className="register-input"
                  type="password"
                  name="password"
                  placeholder="영문, 숫자, 특문이 2종류 이상 조합된 8~20자"
                  onChange={handleInput}
                />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">비밀번호 확인</h5>
                <input
                  className="register-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  onChange={handleInput}
                />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">이메일</h5>
                <input
                  className="register-input"
                  type="email"
                  name="email"
                  placeholder="아이디/비밀번호 찾기에 필요"
                  onChange={handleInput}
                />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">닉네임</h5>
                <input
                  className="register-input"
                  name="nickName"
                  placeholder="커뮤니티 활동에 필요"
                  onChange={handleInput}
                />
              </div>
              <StyledTextField
                id="filled-primary"
                label="Filled primary"
                variant="filled"
                color="primary"
              />
              <button
                type="submit"
                className={
                  getIsActive ? 'signUpBtnAction' : 'signUpBtnInaction'
                }
                onClick={handleButtonValid}
              >
                회원가입
              </button>
            </form>
            <div>
              <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem' }}>이미 에브리데이 계정이 있으신가요? <Link id="login-link" to='../login'>로그인</Link></p>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Info

//   < Form
// name = "basic"
// labelCol = {{
//   span: 8,
//         }}
// wrapperCol = {{
//   span: 16,
//         }}
// autoComplete = "off"
//   >
//         <Form.Item
//           label="이름"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: '이름을 입력해주세요!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="아이디"
//           name="id"
//           rules={[
//             {
//               required: true,
//               message: '아이디를 입력해주세요!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="비밀번호"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: '비밀번호를 입력해주세요!',
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>
//         <Form.Item
//           label="비밀번호 확인"
//           name="confirmPassword"
//           rules={[
//             {
//               required: true,
//               message: '비밀번호를 입력해주세요!',
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           label="이메일"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: '이메일을 입력해주세요!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="닉네임"
//           name="nickName"
//           rules={[
//             {
//               required: true,
//               message: '닉네임을 입력해주세요!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             회원가입
//           </Button>
//         </Form.Item>
      // </Form >