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
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      paddingLeft: "0.8rem"
    },
  },
  // menu: {
  //   [theme.breakpoints.down("sm")]: {
  //     display: "none",
  //   },
  // },
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
    cursor:"pointer",
    [theme.breakpoints.down("sm")]: {
      
    },
  },
  // modal: {
  //   width: 200,
  //   height: 350,
  //   backgroundColor: "white",
  //   position: "absolute",
  //   top: 80,
  //   right: 50,
  //   margin: "auto",
  //   [theme.breakpoints.down("sm")]: {
  //     top:10,
  //     right:10,
  //   },
  // },

}));

function NavBar() {
  // const [value, setValue] = useState('one');
  const [open, setOpen] = useState(false);
  const classes = useStyles({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('testing')
    setOpen(false);
  };

  return (
    <AppBar position="fixed" style={{ background: 'white', height: "5rem" }}>
      <Toolbar className={classes.Toolbar}>
        <Link to='/main'><Avatar alt="로고이미지" src={"/images/smallLogo.png"} className={classes.imgLogo}></Avatar></Link>
        
        <p>
          <Typography className={classes.textLogo} style={{ fontSize: '0.8rem', color: '#C00000' }}>
            에브리데이
          </Typography>
          <Typography variant="h6" className={classes.schoolName}>
            명지전문대
          </Typography>
        </p>

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
        >
        </ModalContainer>

      </Toolbar>

    </AppBar>
  );
}

export default NavBar