import React, { useState } from 'react'
import ModalContainer from './ModalContainer';
import { Link } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

import { Search } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { alpha } from '@mui/lab/node_modules/@mui/system';
import { Avatar } from 'antd';


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
    paddingLeft: "0.8rem",
    paddingTop: "0.5rem",
    display: "flex",
    height: "1.8rem",
    width: "25%",
    marginLeft: "55%",
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
    // display: "flex",
    marginLeft: "1rem",
    marginTop: "0.3rem",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {

    },
  },

}));

function NavBar(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed" style={{ background: 'white', height: "5rem" }}>
      <Toolbar className={classes.Toolbar}>
        <Link to='/'><Avatar alt="로고이미지" src={"/images/smallLogo.png"} className={classes.imgLogo}></Avatar></Link>

        <div>
          <Typography className={classes.textLogo} style={{ fontSize: '0.8rem', color: '#C00000' }}>
            에브리데이
          </Typography>
          <Typography className={classes.schoolName}>
            명지전문대
          </Typography>
        </div>

        <div className={classes.search}>
          <Search />
          <InputBase placeholder="전체 게시판의 글을 검색해보세요!" className={classes.input} />

        </div>
        <div className={classes.myImg}>
          <Avatar alt="My계정 이미지" src={"/images/myImg.png"}
            onClick={handleOpen} />
        </div>
        <ModalContainer
          open={open}
          handleClose={handleClose}
          loginCallBack={props.loginCallBack}
        >
        </ModalContainer>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar