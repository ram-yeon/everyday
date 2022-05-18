import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Forgot from './pages/Forgot/Forgot.jsx';
import Password from './pages/Forgot/Password/Password.jsx';
import UserId from './pages/Forgot/Password/UserId.jsx';
import Register from './pages/Register/Register.jsx';
import Agreement from './pages/Register/Agreement.jsx';
import Info from './pages/Register/Info.jsx';
import Main from './pages/Main/Main.jsx';
import TestApi from './pages/TestApi/TestApi';

function App() {

  return (
    <div>
        
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forgot/password" element={<Password />} />
          <Route path="/forgot/password/userid" element={<UserId />} />

          <Route path="/register" element={<Register />} />
          {/* <Route path="agreement" element={<Agreement />} />
          <Route path="info" element={<Info />} />
        </Route> */}
          <Route path="/register/agreement" element={<Agreement />} />
          <Route path="/register/info" element={<Info />} />
          <Route path="/main" element={<Main />} />
          <Route path="/testapi" element={<TestApi />} />

        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
