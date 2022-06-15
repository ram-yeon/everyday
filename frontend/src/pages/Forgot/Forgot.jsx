import React, { useState } from 'react';
import './Forgot.css';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    <div className="forgot-content">

      <Tabs
        centered
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { background: '#C00000' } }}>
        <Tab value="one" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>아이디 찾기</span>} />
        <Link className='finding-link' to='/forgot/password'><Tab value="two" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>비밀번호 찾기</span>} /></Link>
      </Tabs>

      <form onSubmit={handlesubmit}>
        <input className="forgot-input" type="Email" name="email" id="email1" placeholder="가입된 이메일"
          value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }} />
        <button type="submit" className="finding-btn" >아이디 찾기</button>
      </form>
      <div>
        <p style={{ color: 'gray', fontSize: '0.8rem', textAlign: 'left', margin: '1.5rem 3rem auto 3rem' }}>※ 가입된 아이디가 있을 경우, 입력하신 이메일로 아이디를 안내해 드립니다.<br />
          ※ 만약 이메일이 오지 않는다면, 스팸 편지함으로 이동하지 않았는지 확인해주세요.<br />
          ※ 이메일 서비스 제공자 사정에 의해 즉시 도착하지 않을 수 있으니, 최대 30분 정도 기다리신 후 다시 시도해주세요. </p>
      </div>

    </div>
  )
}

export default Forgot




