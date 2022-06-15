import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing/Landing.jsx';
import Login from '../pages/Login/Login.jsx';
import AdminLogin from '../pages/Login/AdminLogin.jsx';
import Forgot from '../pages/Forgot/Forgot.jsx';
import Password from '../pages/Forgot/password/Password.jsx';
import ChangePW from '../pages/Forgot/password/ChangePW';
import Register from '../pages/Register/Register.jsx';
import Agreement from '../pages/Register/Agreement.jsx';
import Info from '../pages/Register/Info.jsx';
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
                <Route path="/forgot/password" element={<Password />} />
                <Route path="/forgot/password/changepw" element={<ChangePW />} />

                <Route path="/register" element={<Register />} />
                <Route path="/register/agreement" element={<Agreement />} />
                <Route path="/register/info" element={<Info />} />

                <Route path="/certification" element={<Certification />} />
                
                <Route path="/testapi" element={<TestApi />} />

                <Route path="*" element={<Error/>}/>

            </Routes>

        </div>
    )
}

export default AfterLoginRouter