import React, { useState } from 'react';
import '../Forgot.css';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function Password() {

  const [idVal, setIdVal] = useState("");

  const handlesubmit = (event) => {
    event.preventDefualt();
  }

  const [value, setValue] = useState('two');

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
        <Link className='finding-link' to='/forgot'><Tab value="one" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>아이디 찾기</span>} /></Link>
        <Tab value="two" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>비밀번호 찾기</span>} />
      </Tabs>

      <form onSubmit={handlesubmit}>
        <input className="forgot-input" type="text" name="id" id="id" placeholder="가입된 아이디"
          value={idVal} onChange={(e) => { setIdVal(e.target.value) }} />
        <Link to='/certification'><button type="submit" className="finding-btn" >비밀번호 찾기</button></Link>
      </form>
    </div>
  )
}

export default Password




