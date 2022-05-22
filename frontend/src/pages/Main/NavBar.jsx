import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

import { Search } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { alpha } from '@mui/lab/node_modules/@mui/system';
import { Avatar } from 'antd';
import logo from '../img/smallLogo.png';


// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { RightCircleFilled } from '@ant-design/icons';


const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: "flex",
      justifyContent: "space-between"
    },
    iconLogo: {
      display: "flex",
      margin: "1rem 1rem 1rem 2rem",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        height:"2rem",
        margin: "2rem 0rem",
      },
    },
    textLogo: {
      color: "black",
      [theme.breakpoints.down("sm")]: { 
        fontSize:"0.4rem",
        paddingLeft:"0.8rem"
      },
    },
    schoolName: {
      color: "black",
      [theme.breakpoints.down("sm")]: {
        fontSize:"1rem",
        paddingLeft:"0.8rem"
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
      marginLeft:"58%",
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
    // searchBtn: {
    //   marginRight: theme.spacing(1),
    //   [theme.breakpoints.up("sm")]: {
    //     display: "none",
    //   },
    // }
  
  }));

function NavBar() {
    // const [value, setValue] = useState('one');
    const [searchOpen, setSearchOpen] = useState(false);
    const classes = useStyles({ searchOpen });

    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    return (
        <AppBar position="fixed" style={{ background: 'white', height: "5rem" }}>
            <Toolbar className={classes.Toolbar}>
                <Link to='/main'><Avatar alt="로고이미지" src={logo} className={classes.iconLogo}></Avatar></Link>

                <p>
                    <Typography className={classes.textLogo} style={{ fontSize: '0.8rem', color: '#C00000' }}>
                        에브리데이
                    </Typography>
                    <Typography variant="h6" className={classes.schoolName}>
                        명지전문대
                    </Typography>
                </p>


                {/* <Box sx={{ width: '40rem', marginLeft: "10%", marginRight: "10%" }} className={classes.menu}>
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
        </Box> */}


                <div className={classes.search}>
                    <Search />
                    <InputBase placeholder="전체 게시판의 글을 검색해보세요!" className={classes.input} />
                </div>

                {/* <Search className={classes.searchBtn} onClick={() => setSearchOpen(true)} />
        <InputBase placeholder="검색" className={classes.input} /> */}

            </Toolbar>

        </AppBar>
    );
}

export default NavBar