import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';
// import { Avatar } from 'antd';
// import myImg from './img/myImg.png';
// import smallLogo from './img/smallLogo.png';

import { Info } from '@material-ui/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// import TextsmsIcon from '@mui/icons-material/Textsms';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const useStyles = makeStyles((theme) => ({
    writerIcon: {
        color: "gray",
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
    },
    date: {

        color: "gray",
        fontSize: "0.7rem",
    },

}));

function BoardDetail() {
    const classes = useStyles();

    const comment = [
        {
            writer: "익명",
            content: "댓글내용1",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem'}}/>,
            likeCount: "0",
            recomment: "대댓글"
        },
        {
            writer: "익명",
            content: "댓글내용2",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem'}}/>,
            likeCount: "0",
            recomment: "대댓글"
        },
        {
            writer: "익명",
            content: "댓글내용3",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem'}}/>,
            likeCount: "0",
            recomment: "대댓글"
        },
        {
            writer: "익명",
            content: "댓글내용2",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem'}}/>,
            likeCount: "0",
            recomment: "대댓글"
        }

    ]

    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                게시판 상세
            </Box>
            <Box border="2px lightgray solid" color="black" textAlign="left" marginTop="0.3rem" p={2} >

                <AccountCircleIcon className={classes.writerIcon} />
                <div style={{ float: "right" }}>
                    <Typography className={classes.update}>수정</Typography>
                    <Typography className={classes.delete}>삭제</Typography>
                </div>

                <Typography className={classes.writer}>익명</Typography>
                <Typography className={classes.date}>20/02/12/ 21:42</Typography>


                <Typography style={{ fontSize: '1.8rem', marginTop: "1rem" }}><strong>학교주변</strong></Typography>
                <Typography style={{ margin: "0.5rem auto auto 0.3rem" }}>만날사람~</Typography>

                <div style={{ margin: "2rem auto auto 0.3rem" }}>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000' }} /><Typography variant="" style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#C00000' }}>0</Typography>
                    <TextsmsOutlinedIcon sx={{ fontSize: '1rem', color: '#0CDAE0', marginLeft: "1rem" }} /><Typography variant="" style={{ marginLeft: "0.2rem", fontSize: "0.7rem",color: '#0CDAE0' }}>0</Typography>
                </div>
            </Box>

            <List sx={{ marginTop: "-0.4rem" }}>
                {comment.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "12vh" }}
                        button
                        key={item.date}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
                    >
                        <ListItemText primary={item.writer}
                            primaryTypographyProps={{
                                color: 'black',
                                display: 'inline-block',
                                border: "red 1px solid",
                                marginRight: "0rem"
                            }} />

                        <ListItemText primary={item.date}
                            primaryTypographyProps={{
                                color: 'gray',
                                display: 'inline-block',
                                fontSize: '0.5rem',
                                border: "red 1px solid",
                            }} />


                        <ListItemText primary={item.content}
                            primaryTypographyProps={{
                                color: 'black',
                                fontSize: '0.7rem',
                                width: "5rem",
                                border: "red 1px solid",

                            }} />

                        <ListItemIcon sx={{ border: "red 1px solid", color: '#C00000' }}>{item.likeIcon}</ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                border: "red 1px solid",
                                width: "1rem",
                                paddingRight:"0rem",
                                fontSize: "0.5rem",
                                color: '#C00000'
                            }} />
                        <ListItemText primary={item.recomment}
                            primaryTypographyProps={{
                                color: 'black',
                                fontSize: '0.7rem',
                                width: "3rem",
                                border: "red 1px solid",

                            }} />

                        {/* <ListItemText primary={item.user}
                            primaryTypographyProps={{                                
                                width: "20rem",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                // border:"solid 2px red"

                            }} /> */}
                    </ListItem>
                ))}
            </List>

        </div>
    )
}

export default BoardDetail