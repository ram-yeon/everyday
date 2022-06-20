import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing/Landing.jsx';
import Login from '../pages/Login/Login.jsx';
import AdminLogin from '../pages/Login/AdminLogin.jsx';
import Forgot from '../pages/Forgot/Forgot.jsx';

import UserPassword from '../pages/Forgot/UserPassword/UserPassword.jsx';
import Password from '../pages/Forgot/UserPassword/Password/Password.jsx';
import ChangePW from '../pages/Forgot/UserPassword/Password/ChangePW';
import UserRegister from '../pages/UserRegister/UserRegister.jsx';
// import Register from '../pages/UserRegister/Register/Register.jsx';
// import Agreement from '../pages/UserRegister/Register/Agreement.jsx';
// import Info from '../pages/UserRegister/Register/Info.jsx';
import Certification from '../pages/Certification/Certification.jsx';

import TestApi from '../TestApi/TestApi';

import Error from "../component/Error";


function AfterLoginRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/forgot" element={<Forgot />} />

                <Route path="/forgot/password" element={<UserPassword />} />
                <Route path="/forgot/password" element={<Password />} />
                <Route path="/forgot/password/changepw" element={<ChangePW />} />

                <Route path="/register" element={<UserRegister />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="/register/agreement" element={<Agreement />} />
                <Route path="/register/info" element={<Info />} /> */}

                <Route path="/certification" element={<Certification />} />

                <Route path="/testapi" element={<TestApi />} />

                <Route path="*" element={<Error />} />

            </Routes>

        </div>
    )
}

export default AfterLoginRouter