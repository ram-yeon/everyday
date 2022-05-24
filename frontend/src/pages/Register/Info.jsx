import React, { useState } from 'react'
import './Register.css';
import { Link } from 'react-router-dom';

function Info() {
  const [nameVal, setNameVal] = useState("");
  const [idVal, setIdVal] = useState("");
  const [pwVal1, setPwVal1] = useState("");
  const [pwVal2, setPwVal2] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [nickNameVal, setNickNameVal] = useState("");

  const handlesubmit = (event) => {
    event.preventDefualt();
  }


  return (
    <div className="main-register">

      <div className="register-longContain">
        <div className="register-content">

          <div id="info-inputGroup">
            <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}>회원 정보</h2>
            <form onSubmit={handlesubmit}>
            <div className="info-inputGroup">
                <h5 className="info-h5">이름</h5>
                <input className="register-input" type="text" name="name" id="name1" placeholder="성명 입력"
                  value={nameVal} onChange={(e) => { setNameVal(e.target.value) }} />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">아이디</h5>
                <input className="register-input" type="text" name="id" id="id1" placeholder="영문, 숫자 4~20자"
                  value={idVal} onChange={(e) => { setIdVal(e.target.value) }} />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">비밀번호</h5>
                <input className="register-input" type="password" name="pw1" id="pwId1" placeholder="영문, 숫자, 특문이 2종류 이상 조합된 8~20자"
                  value={pwVal1} onChange={(e) => { setPwVal1(e.target.value) }} />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">비밀번호 확인</h5>
                <input className="register-input" type="password" name="pw2" id="pwId2" placeholder="비밀번호 확인"
                  value={pwVal2} onChange={(e) => { setPwVal2(e.target.value) }} />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">이메일</h5>
                <input className="register-input" type="Email" name="email" id="email1" placeholder="아이디/비밀번호 찾기에 필요"
                  value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }} />
              </div>
              <div className="info-inputGroup">
                <h5 className="info-h5">닉네임</h5>
                <input className="register-input" type="text" name="nickName" id="nickName1" placeholder="커뮤니티 활동에 필요"
                  value={nickNameVal} onChange={(e) => { setNickNameVal(e.target.value) }} />
              </div>
              <button type="submit" id="signUp-btn">회원가입</button>
              <div>
                <p style={{ color: 'gray', textAlign: 'center', fontSize: '0.8rem' }}>이미 에브리데이 계정이 있으신가요? <Link id="login-link" to='../login'>로그인</Link></p>
              </div>
            </form>

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
//       </Form >