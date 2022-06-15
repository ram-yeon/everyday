import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from '@mui/material/';
// import { Avatar } from 'antd';
// import myImg from './img/myImg.png';
// import smallLogo from './img/smallLogo.png';

import { Info } from '@material-ui/icons';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';



const useStyles = makeStyles((theme) => ({
    writerIcon: {
        color: "#C00000",
        [theme.breakpoints.up("sm")]: {
            // fontSize: "18px",
        },
    },
    update: {
        color: "gray",
        fontSize: "0.8rem",
        display: "inline",
        cursor: "pointer",
    },
    delete: {
        color: "gray",
        fontSize: "0.8rem",
        display: "inline",
        marginLeft: "1rem",
        cursor: "pointer",
    },

    writer: {
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#C00000",
    },
    date: {

        color: "gray",
        fontSize: "0.7rem",
    },
    listBtn: {
        width: "10%",
        height: "2.5rem",
        background: "#C00000",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0.1rem 0.1rem 0.3rem 0.1rem gray",
        borderRadius:"0.5rem",
        marginTop: "1rem",
        float:"right",
    },

}));


function NoticeBoardDetail() {
    const classes = useStyles();

    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                공지사항 상세
            </Box>
            <Box border="2px lightgray solid" color="black" textAlign="left" marginTop="0.3rem" p={2} >

                <Info className={classes.writerIcon} />
                <div style={{ float: "right" }}>
                    <Typography className={classes.update}>수정</Typography>
                    <Typography className={classes.delete}>삭제</Typography>
                </div>

                <Typography className={classes.writer}>에브리타임</Typography>
                <Typography className={classes.date}>20/02/12/ 21:42</Typography>


                <Typography style={{ fontSize: '1.8rem', marginTop: "1rem" }}><strong>주기적 재인증에 관한 안내</strong></Typography>
                <Typography style={{ margin: "0.5rem auto auto 0.3rem" }}>안녕하세요, 에브리타임입니다.
                    에브리타임은 반수, 편입 등 학적이 변동된 재학생, 계정 매매 및 다중 계정 이용자의 인증을 해제하기 위해 주기적 재인증을 진행하고 있습니다</Typography>

                <div style={{ margin: "2rem auto auto 0.3rem" }}>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000' }} /><Typography style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#C00000' }}>0</Typography>

                </div>
            </Box>
            <Link to='/noticeboard'><button className={classes.listBtn}>목록</button></Link>
        </div>
    )
}

export default NoticeBoardDetail