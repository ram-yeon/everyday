import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Forgot from './pages/Forgot/Forgot.jsx';
import Password from './pages/Forgot/Password/Password.jsx';
import ChangePW from './pages/Forgot/Password/ChangePW';
import Register from './pages/Register/Register.jsx';
import Agreement from './pages/Register/Agreement.jsx';
import Info from './pages/Register/Info.jsx';
import Certification from './pages/Certification/Certification.jsx';
import TestApi from './pages/TestApi/TestApi';

import NavBar from './pages/Main/NavBar';
import LeftBar from './pages/Main/LeftBar';
import MainBoard from './pages/Main/Board/MainBoard';
import Board from './pages/Main/Board/Board';
import BoardDetail from './pages/Main/Board/BoardDetail';
import NoticeBoard from './pages/Main/Board/NoticeBoard';
import NoticeBoardDetail from './pages/Main/Board/NoticeBoardDetail';
import Footer from './pages/Main/Footer/Footer';
import UseTerms from './pages/Main/Footer/UseTerms';
import PrivacyPolicy from './pages/Main/Footer/PrivacyPolicy';
import CommunityRule from './pages/Main/Footer/CommunityRule';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     paddingLeft: "0rem",
//     margin: "10rem 4rem",
//     textAlign: "center",
//     [theme.breakpoints.down("sm")]: {
//       margin: "3rem auto auto 2rem",
//     },

//   }
// }));



function App() {
  // const classes = useStyles();

  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <LeftBar />
        </Grid>
        <Grid item sm={8} xs={10} style={{margin: '10rem auto auto 5rem'}}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/forgot/password" element={<Password />} />
            <Route path="/forgot/password/changepw" element={<ChangePW />} />

            <Route path="/register" element={<Register />} />
            <Route path="/register/agreement" element={<Agreement />} />
            <Route path="/register/info" element={<Info />} />

            <Route path="/certification" element={<Certification />} />
            <Route path="/testapi" element={<TestApi />} />

            <Route path="/main" element={<MainBoard />} />
            <Route path="/main/mainboard" element={<MainBoard />} />
            <Route path="/main/board" element={<Board />} />
            <Route path="/main/boarddetail" element={<BoardDetail />} />
            <Route path="/main/noticeboard" element={<NoticeBoard />} />
            <Route path="/main/noticeboarddetail" element={<NoticeBoardDetail />} />

            <Route path="/main/useterms" element={<UseTerms />} />
            <Route path="/main/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/main/communityRule" element={<CommunityRule />} />

          </Routes>


        </Grid>
      </Grid>
      <Footer />

    </div>
  );
}

export default App;