import React, { useState } from 'react'
import ModalContainer from './ModalContainer';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

import { Search } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { alpha } from '@mui/lab/node_modules/@mui/system';
import { Avatar } from 'antd';

import * as UserAPI from '../api/Users';
import * as BoardAPI from '../api/Board';
import { Message } from '../component/Message';
import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  imgLogo: {
    display: "flex",
    margin: "1rem 1rem 1rem 2rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      height: "2rem",
      margin: "2rem 0rem",
    },
  },
  textLogo: {
    color: "black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.4rem",
      paddingLeft: "0.8rem"
    },
  },
  schoolName: {
    color: "black",
    fontSize: "1.3rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      paddingLeft: "0.8rem"
    },
  },
  search: {
    color: "gray",
    paddingLeft: "0.7rem",
    display: "flex",
    height: "2.5rem",
    width: "25%",
    marginLeft: "55%",
    marginTop: "5px",
    border: "2px lightgray solid",
    backgroundColor: alpha(theme.palette.common.white, 1),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "100%",

  },
  myImg: {
    marginLeft: "1rem",
    marginTop: "0.3rem",
    cursor: "pointer",
  },
  adminLogout: {
    marginLeft: "82%",
    cursor: "pointer",
    border: "none",
    background: "white",
    color: "gray",
    textDecoration: "underline",
  }
}));

function NavBar(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({});
  const [schoolName, setSchoolName] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  let token = localStorage.getItem(SESSION_TOKEN_KEY);
  const tokenJson = JSON.parse(atob(token.split(".")[1]));

  //회원 정보 배너 조회
  if (tokenJson.account_authority === 'USER') {
    BoardAPI.userInfoSelect().then(response => {
      setSchoolName(response.data.schoolName);
      setId(response.data.loginId);
      setName(response.data.name);
      setNickname(response.data.nickname);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //관리자로그아웃버튼
  const adminLogoutBtn = () => {
    UserAPI.logout().then(response => {
      console.log(JSON.stringify(response));
      localStorage.removeItem(SESSION_TOKEN_KEY);
      props.loginCallBack(false);
      navigate("/");
    }).catch(error => { //만료된 토큰이거나 존재하지않는 토큰이면 강제로그아웃
      console.log(JSON.stringify(error));
      Message.error(error.message);
      localStorage.removeItem(SESSION_TOKEN_KEY);
      props.loginCallBack(false);
      navigate("/");
    });
  }

  //게시글 검색
  const onChangeKeyword = (searchKeyword) => {
    const keyword = searchKeyword;
    navigate('/mySearch', { state: { keyword: keyword } });
  };

  return (
    <>
      {
        (tokenJson.account_authority === 'MANAGER')                                                               //관리자일때,
          ?
          <AppBar position="fixed" style={{ background: 'white', height: "5rem" }}>
            <Toolbar className={classes.Toolbar}>
              <Link to='/'><Avatar alt="로고이미지" src={"/images/smallLogo.png"} className={classes.imgLogo}></Avatar></Link>
              <div>
                <Typography className={classes.textLogo} style={{ fontSize: '0.8rem', color: '#C00000' }}>
                  에브리데이
                </Typography>
              </div>
              <button className={classes.adminLogout} onClick={adminLogoutBtn}>로그아웃</button>
            </Toolbar>
          </AppBar>
          :                                                                                                         //사용자일때,
          <AppBar position="fixed" style={{ background: 'white', height: "5rem" }}>
            <Toolbar className={classes.Toolbar}>
              <Link to='/'><Avatar alt="로고이미지" src={"/images/smallLogo.png"} className={classes.imgLogo}></Avatar></Link>
              <div>
                <Typography className={classes.textLogo} style={{ fontSize: '0.8rem', color: '#C00000' }}>
                  에브리데이
                </Typography>
                <Typography className={classes.schoolName}>
                  {schoolName}
                </Typography>
              </div>

              <div className={classes.search}>
                {/* <Search onClick={() => onChangeKeyword(searchKeyword)} sx={{ cursor: 'pointer' }} />
                <InputBase value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value) }} placeholder="전체 게시판의 글을 검색해보세요!" className={classes.input} /> */}
                <Search sx={{marginTop:'0.3rem'}}/>
                <InputBase value={searchKeyword} onChange={(e) => { setSearchKeyword(e.target.value); onChangeKeyword(searchKeyword); }} placeholder="전체 게시판의 글을 검색해보세요!" className={classes.input} />
              </div>
              <div className={classes.myImg}>
                <Avatar alt="My계정 이미지" src={"/images/myImg.png"}
                  onClick={handleOpen} />
              </div>
              <ModalContainer
                open={open}
                handleClose={handleClose}
                loginCallBack={props.loginCallBack}
                id={id}
                name={name}
                nickname={nickname}
              >
              </ModalContainer>
            </Toolbar>
          </AppBar>
      }

    </>
  );
}

export default NavBar