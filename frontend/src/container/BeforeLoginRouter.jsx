import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing/Landing.jsx';
import Login from '../pages/Login/Login.jsx';
import AdminLogin from '../pages/Login/AdminLogin.jsx';
import Forgot from '../pages/Forgot/Forgot.jsx';

import UserPassword from '../pages/Forgot/UserPassword/UserPassword.jsx';
import UserRegister from '../pages/UserRegister/UserRegister.jsx';
import Certification from '../pages/Certification/Certification.jsx';

import Error from "../component/Error";

function BeforeLoginRouter(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login loginCallBack={props.loginCallBack} />} />
                <Route path="/adminlogin" element={<AdminLogin loginCallBack={props.loginCallBack} />} />
                <Route path="/forgot" element={<Forgot />} />

                <Route path="/forgot/password" element={<UserPassword />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/certification" element={<Certification />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    )
}

export default BeforeLoginRouter