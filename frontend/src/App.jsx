import React, { useState } from 'react';
import './App.css';
import AfterLoginContainer from './container/AfterLoginContainer';
import BeforeLoginContainer from './container/BeforeLoginContainer';
import {SESSION_TOKEN_KEY} from './component/Axios/Axios';

function App() {

  function isValidLoginToken() {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (token) {
      return true; //token jwt 에 적합한 토큰인지 체크하는 로직도 필요
    } 
    return false;
  }

  const [isLogin, setIsLogin] = useState(isValidLoginToken());
  
  function loginCallBack(login) {
    setIsLogin(login);
  }

  return (
    <div>
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