import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';
import WriteBox from './WriteBox';

import BorderColorIcon from '@mui/icons-material/BorderColor';

// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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

function Board(props) {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const post = [
        {
            user: "익명",
            postTitle: "퍼스널 컬러 잘 아는 사람~~~!~!~!",
            postContent: "진단 받으러 갔는데 어쩌고 저쩌고 어쩌구 저쩌구",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'

        },
        {
            user: "익명",
            postTitle: "학점이 낮으면 생기는 문제가 뭔가요....?..",
            postContent: "학점낮아도 졸업할수있는거죠 나중에 취업할떄 불리하게 작용하는 건가요? 그러면 어쩌구 저쩌구 블라부ㅡㄹ라",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'
        },
        {
            user: "익명",
            postTitle: "내일 1교시에 공학관 수업인 사람",
            postContent: "부탁좀 들어죠,,,,,,,,,,,",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",
            commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
            commentCount: "0",
            path: '/'
        },
        {
            user: "익명",
            postTitle: "홍대",
            postContent: "지금 홍대인 사람~~~",
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
                게시판
            </Box>
            <Box p={1.8} className={classes.writeBoxBtn} onClick={() => setShow(!show)}>
                새 글을 작성해주세요! //HOT 게시물엔 이 칸 안보임
                <BorderColorIcon sx={{ float: "right" }} />
            </Box>
            {
                show ? <WriteBox show={show} /> : null
            }


            <List sx={{ marginTop: "-0.4rem" }}>
                {post.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "15vh" }}
                        button
                        key={item.date}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
                    >
                        <div>
                            <ListItemText primary={item.postTitle}
                                primaryTypographyProps={{
                                    color: 'black',
                                    width: "30rem",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }} />
                            <ListItemText primary={item.postContent}
                                primaryTypographyProps={{
                                    color: 'gray',
                                    width: "30rem",
                                    fontSize: '0.8rem',
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }} />
                            <ListItemText primary={item.date}
                                primaryTypographyProps={{
                                    color: 'gray',
                                    fontSize: '0.5rem',
                                    width: "5rem",
                                }} />
                            <ListItemText primary={item.user}
                                primaryTypographyProps={{
                                    fontSize: '0.7rem',
                                    width: "2rem",
                                    color: "#C00000"
                                }} />
                        </div>
                        <ListItemIcon sx={{ color: '#C00000', marginLeft: "40%" }}>{item.likeIcon}</ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                color: '#C00000',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />

                        <ListItemIcon sx={{ color: '#0CDAE0', marginLeft: "-1rem" }}>{item.commentIcon}</ListItemIcon>
                        <ListItemText primary={item.commentCount}
                            primaryTypographyProps={{
                                color: '#0CDAE0',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />

                        {/* <ListItemText primary={item.user}
                            primaryTypographyProps={{
                                
                                height: '1rem',
                                width: "20rem",
                                

                            }} /> */}
                    </ListItem>
                ))}
            </List>

        </div>
    )
}

export default Board