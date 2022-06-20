import React from 'react';
import './App.css';
import AfterLoginContainer from './container/AfterLoginContainer';
import BeforeLoginContainer from './container/BeforeLoginContainer';

function App() {
  const isLogin = false;

  return (
    <div>

      {
        //로그인 후
        isLogin &&
        <AfterLoginContainer />
      }
      {
        //로그인 전
        !isLogin &&
        <BeforeLoginContainer />
      }


    </div>
  );
}

export default App;