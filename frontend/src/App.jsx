import React from 'react';
import './App.css';
import AfterLoginContainer from './container/AfterLoginContainer';
import BeforeLoginContainer from './container/BeforeLoginContainer';


function App() {
  const pathname = window.location.pathname;
  const isLogin = false;

  return (
    <div>

      {
        //로그인 후
        ((pathname === "/" && isLogin) || pathname.indexOf("/main") === 0) &&
        <AfterLoginContainer />
      }
      {
        //로그인 전
        ((pathname === "/" && !isLogin) || pathname.indexOf("/") === 0) &&
        <BeforeLoginContainer />
      }


    </div>
  );
}

export default App;