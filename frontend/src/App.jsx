import React, { useState } from 'react';
import './App.css';
import AfterLoginContainer from './container/AfterLoginContainer';
import BeforeLoginContainer from './container/BeforeLoginContainer';
import { SESSION_TOKEN_KEY } from './component/Axios/Axios';

function App() {
  // localStorage.removeItem(SESSION_TOKEN_KEY);

  function isValidLoginToken() {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (token) {
      return true;
    }
    return false;
  }

  const [isLogin, setIsLogin] = useState(isValidLoginToken());  //로그인상태체크

  function loginCallBack(login) {
    setIsLogin(login);
  }
  
  return (
    <div className='stop-dragging'>
      {
        //로그인 후
        isLogin &&
        <AfterLoginContainer loginCallBack={loginCallBack} />
      }
      {
        //로그인 전
        !isLogin &&
        <BeforeLoginContainer loginCallBack={loginCallBack} />
      }
    </div>
  );
}

export default App;