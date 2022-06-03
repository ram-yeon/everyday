import React, { useState } from 'react';
import './Board.css';
import WriteReply from './WriteReply';
// import { Link } from 'react-router-dom';
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from '@mui/material/';
// import { Avatar } from 'antd';
// import myImg from './img/myImg.png';
// import smallLogo from './img/smallLogo.png';

// import { Info } from '@material-ui/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// import TextsmsIcon from '@mui/icons-material/Textsms';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { FormControlLabel, Checkbox } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    writerIcon: {
        color: "gray",
        [theme.breakpoints.up("sm")]: {
            // fontSize: "18px",
        },
    },
    postUpdate: {
        color: "gray",
        fontSize: "0.8rem",
        display: "inline",
        cursor: "pointer",
    },
    postDelete: {
        color: "gray",
        fontSize: "0.8rem",
        display: "inline",
        marginLeft: "1rem",
        cursor: "pointer",
    },
    replyDelete: {
        color: "gray",
        fontSize: "0.6rem",
        // display: "inline",
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

    checkAnonymous: {
        // float: "right",
        // marginLeft: "3rem",
        marginTop: "-4.5rem",
    },
    registerBtn: {
        width: "1.5rem",
        height: "1.5rem",
        padding: "0.5rem",
        backgroundColor: "#C00000",
        color: "white",
        float: "right",
        cursor: "pointer",
        marginTop: "-2.7rem",
    },

}));

function BoardDetail() {
    const classes = useStyles();
    const [commentVal, setCommentVal] = useState("");

    const comment = [
        {
            writer: "익명",
            content: "나나나나나나",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            replyIcon: <AddBoxOutlinedIcon sx={{ fontSize: '0.8rem' }} />,
            reply: "답글 달기"
        },
        {
            writer: "익명",
            content: "나 남자 ",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            replyIcon: <AddBoxOutlinedIcon sx={{ fontSize: '0.8rem' }} />,
            reply: "답글 달기"
        },
        {
            writer: "익명",
            content: "가나다라 마바사 아자차카타파하",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            replyIcon: <AddBoxOutlinedIcon sx={{ fontSize: '0.8rem' }} />,
            reply: "답글 달기"
        },
        {
            writer: "익명",
            content: "어디임어디임어디임어디임나나나ㅏ어디임어디임어디임어디임나나나ㅏ어디임어디임어디임어디임나나나ㅏ어디임어디임어디임어디임나나나ㅏ어디임어디임어디임어디임나나나ㅏ어디임어디임어디임어디임나나나ㅏ",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            replyIcon: <AddBoxOutlinedIcon sx={{ fontSize: '0.8rem' }} />,
            reply: "답글 달기"
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
                    <Typography className={classes.postUpdate}>수정</Typography>
                    <Typography className={classes.postDelete}>삭제</Typography>
                </div>

                <Typography className={classes.writer}>익명</Typography>
                <Typography className={classes.date}>20/02/12/ 21:42</Typography>


                <Typography style={{ fontSize: '1.8rem', marginTop: "1rem" }}><strong>학교주변</strong></Typography>
                <Typography style={{ margin: "0.5rem auto auto 0.3rem" }}>만날사람~</Typography>

                <div style={{ margin: "2rem auto auto 0.3rem" }}>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000' }} /><Typography variant="" style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#C00000' }}>0</Typography>
                    <TextsmsOutlinedIcon sx={{ fontSize: '1rem', color: '#0CDAE0', marginLeft: "1rem" }} /><Typography variant="" style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#0CDAE0' }}>0</Typography>
                </div>
            </Box>

            <List sx={{ marginTop: "-0.4rem" }}>
                {comment.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "17vh" }}
                    // button
                    // key={item.date}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
                    >
                        <div>
                            <ListItemText primary={item.writer}
                                primaryTypographyProps={{
                                    color: 'black',
                                    fontWeight: "bold",
                                    fontSize: "0.8rem",
                                    width: "2rem",

                                }} />

                            <ListItemText primary={item.content}
                                primaryTypographyProps={{
                                    color: 'black',
                                    fontSize: '0.8rem',
                                    width: "50rem",

                                }} />

                            <ListItemText primary={item.date}
                                primaryTypographyProps={{
                                    color: 'gray',
                                    fontSize: '0.5rem',
                                    width: "5rem",
                                }} />
                            <div style={{ display: "inline-flex" }}>
                                <ListItemIcon sx={{ color: '#0CDAE0', cursor: "pointer" }}>{item.replyIcon}</ListItemIcon>
                                <ListItemText primary={item.reply}
                                    primaryTypographyProps={{
                                        fontSize: '0.7rem',
                                        width: "5rem",
                                        color: '#0CDAE0',
                                        cursor: "pointer",
                                        margin: "-0.35rem auto auto -2.3rem"
                                    }} />
                            </div>

                            <Typography className={classes.replyDelete}>삭제</Typography>
                        </div>

                        <ListItemIcon sx={{ marginLeft: "10%", color: '#C00000', cursor: "pointer" }}>{item.likeIcon}</ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                width: "1rem",
                                fontSize: "0.5rem",
                                color: '#C00000',
                                margin: "0.5rem auto auto -2.2rem",
                                cursor: "pointer",
                            }} />

                    </ListItem>
                ))}
            </List>
            <WriteReply />

            <input className="comment-input" type="text" name="comment" id="comment1" placeholder="댓글을 입력하세요."
                value={commentVal} onChange={(e) => { setCommentVal(e.target.value) }} />
            <FormControlLabel control={<Checkbox color="default" size="small" />}
                label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "85%" }} />
            <BorderColorIcon className={classes.registerBtn} />

        </div>
    )
}

export default BoardDetail