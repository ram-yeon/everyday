import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WriteBox from './WriteBox';

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
    writeBoxBtn: {
        border: "2px lightgray solid",
        color: "gray",
        backgroundColor: "#F6F6F6",
        fontSize: "0.9rem",
        textAlign: "left",
        cursor: "pointer",
        margin: "0.3rem auto",
    },
}));

function NoticeBoard() {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const post = [
        {
            writer: "에브리타임",
            postTitle: "주기적 재인증에 관한 안내",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'

        },
        {
            writer: "에브리타임",
            postTitle: "오픈채팅을 이용한 각종 피해 예방 안내",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'
        },
        {
            writer: "에브리타임",
            postTitle: "6/21(월) 게시판 오류에 따른 롤백 안내",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'
        },
        {
            writer: "에브리타임",
            postTitle: "에브리타임 커뮤니티 이용규칙 업데이트 안내",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'
        }

    ]

    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                공지사항
            </Box>
            <Box p={1.8} className={classes.writeBoxBtn} onClick={() => setShow(!show)}>
                공지사항을 등록해주세요. //일반사용자는 이 칸 안보임
                <BorderColorIcon sx={{ float: "right" }} />
            </Box>

            {
                show ? <WriteBox show={show} /> : null
            }

            <List sx={{ marginTop: "-0.4rem" }}>
                {post.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "12vh" }}
                        button
                        key={item.date}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
                    >
                        <div>
                            <ListItemText primary={item.postTitle}
                                primaryTypographyProps={{
                                    color: 'black',
                                    width:"30rem",
                                    
                                }} />
                            
                                <ListItemText primary={item.date}
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        width:"5rem",
                                        fontSize: '0.5rem',
                                    }} />


                                <ListItemText primary={item.writer}
                                    primaryTypographyProps={{
                                        color: 'black',
                                        fontSize: '0.7rem',
                                        width: "4rem",
                                        color: "#C00000"

                                    }} />
                            
                        </div>
                        
                            <ListItemIcon sx={{ color: '#C00000', marginLeft:"45%"}}>{item.likeIcon}</ListItemIcon>
                            <ListItemText primary={item.likeCount}
                                primaryTypographyProps={{
                                    color: '#C00000',
                                    width: "1rem",
                                    fontSize: "0.5rem",
                                    margin:"0.5rem auto auto -2.2rem"
                                }} />
                        
                    </ListItem>
                ))}
            </List>

        </div>
    )
}

export default NoticeBoard