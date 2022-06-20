import React, { useState } from 'react';
import '../../Forgot.css';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

import * as UserAPI from '../../../../api/Users';
import { Message } from '../../../../component/Message';

function Password(props) {
  const navigate = useNavigate();

  const [idVal, setIdVal] = useState("");
  const [value, setValue] = useState('two');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 아이디 검사(영문, 숫자 4-20자)
  const idNumLetter = idVal.search(/[0-9]/g);
  // const idEngLetter = idVal.search(/[a-z]/ig);
  const isValidId = idVal.length >= 4 && idVal.length <= 20 && idNumLetter >= 1; //&& idEngLetter >= 1

  let type = "FINDPW";  //해당 기능의 플로우가 어떤페이지인지 따라 api요청해줄 타입(비번찾기)
  const nextPath="/forgot/password/changepw"; //다다음페이지경로
  const isNext = false;                       //다음페이지로 넘어갈지 여부체크

  const handleBtn = () => {
    if (!isValidId)
      alert('아이디를 다시 확인해주세요(영문, 숫자 4-20자)');
    else {
      const data = {
        loginId: idVal,
      }
      UserAPI.findPW(data).then(response => {
        console.log(JSON.stringify(response));
        Message.success(response.message);
        props.propFunction(type, nextPath, !isNext);
        navigate('/certification');

      }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
      });
    }
  }

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

      <input className="forgot-input" type="text" name="id" id="id" placeholder="가입된 아이디"
        value={idVal} onChange={(e) => { setIdVal(e.target.value) }} />
      <button onClick={handleBtn} type="submit" className="finding-btn" >비밀번호 찾기</button>
    </div>
  )
}

export default Password




