import React, { useState } from 'react'
import './Forgot.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'


function Forgot() {

  const [emailVal, setEmailVal] = useState("");

  const handlesubmit = (event) => {
    event.preventDefualt();
  }

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div className="main-forgot">
      <div className="forgot-contain">
        <div className="forgot-content">
          <Box sx={{ width: '100%' }}>

            <Tabs
              sx={{ marginTop: '1.5rem' }}
              centered
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { background: '#C00000' } }}>
              <Tab value="one" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>아이디 찾기</span>} />
              <Tab value="two" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>비밀번호 찾기</span>} />
            </Tabs>
          </Box>

          <form onSubmit={handlesubmit}>
            <div className="forgot-inputGroup">
              <input className="forgot-input" type="Email" name="email" id="email1" placeholder="가입된 이메일"
                value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }} />
            </div>
            <button type="submit" className="finding-btn" >아이디 찾기</button>
            <div>
              <p style={{ color: 'gray', fontSize: '0.8rem', textAlign: 'left', margin: '2rem' }}>※ 가입된 아이디가 있을 경우, 입력하신 이메일로 아이디를 안내해 드립니다.<br />
                ※ 만약 이메일이 오지 않는다면, 스팸 편지함으로 이동하지 않았는지 확인해주세요.<br />
                ※ 이메일 서비스 제공자 사정에 의해 즉시 도착하지 않을 수 있으니, 최대 30분 정도 기다리신 후 다시 시도해주세요. </p>
            </div>
          </form>


        </div>
      </div>
    </div >
  )
}

export default Forgot




