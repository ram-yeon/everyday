import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Search } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { alpha } from '@mui/lab/node_modules/@mui/system';
import { Avatar } from 'antd';
import logo from '../img/smallLogo.png';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  iconLogo: {
    display: "flex",
    margin: "1rem 1rem 1rem 2rem"
  },
  textLogoLg: {
    color: "black",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline",
    },
  },
  textLogoSm: {
    color: "black",
    display: "inline",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  schoolNameLg: {
    color: "black",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline",
    },
  },
  schoolNameSm: {
    color: "black",
    display: "inline",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    color: "gray",
    paddingLeft: "0.8rem",
    paddingTop: "0.5rem",
    display: "flex",
    marginRight: "3rem",
    height: "1.8rem",
    border: "2px lightgray solid",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    borderRadius: theme.shape.borderRadius,
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },

}));


function Main() {
  const classes = useStyles();

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar style={{ background: 'white', height: "5rem" }}>
      <Toolbar className={classes.Toolbar}>
        <Link to='/'><Avatar alt="로고이미지" src={logo} className={classes.iconLogo}></Avatar></Link>
        <div style={{ width:"8rem" }}>
          <Typography className={classes.textLogoLg} style={{ fontSize: '0.8rem', color: '#C00000' }}>
            에브리데이
          </Typography>
          <br />
          <Typography variant="h6" className={classes.schoolNameLg}>
            명지전문대
          </Typography>
        </div>
        <Typography variant="h6" className={classes.schoolNameSm}>
          명지전문대
        </Typography>

        <Box sx={{ width: '40rem', marginLeft:"10%", marginRight:"10%" }}>
          <Tabs
            sx={{ marginTop: '1rem' }}
            centered
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#C00000' } }}>
            <Tab value="one" label={<span style={{ color: 'black', fontWeight: 'bold' }}>HOT 게시물</span>} />
            <Tab value="two" label={<span style={{ color: 'black', fontWeight: 'bold' }}>자유 게시판</span>} />
            <Tab value="three" label={<span style={{ color: 'black', fontWeight: 'bold' }}>정보 게시판</span>} />
            <Tab value="four" label={<span style={{ color: 'black', fontWeight: 'bold' }}>동아리 게시판</span>} />
            <Tab value="five" label={<span style={{ color: 'black', fontWeight: 'bold' }}>공지사항</span>} />
          </Tabs>
        </Box>


        <div className={classes.search}>
          <Search />
          <InputBase placeholder="전체 게시판의 글을 검색해보세요!" className={classes.input} />
        </div>
      </Toolbar>
    </AppBar>
  );

}

export default Main