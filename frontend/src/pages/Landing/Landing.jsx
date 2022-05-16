import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      방문페이지(로그인전)
      <br />
      <Link to='/login'>로그인</Link>
      <br />
      <Link to='/register'>회원가입</Link>
    </div>
  )
}

export default Landing