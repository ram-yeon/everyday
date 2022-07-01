import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';
import WriteBox from './WriteBox';

import BorderColorIcon from '@mui/icons-material/BorderColor';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';

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

function BoardList(props) {
    const {
        title,
        boardType,
    } = props;
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const [post, setPost] = useState([]);
    const postItems = [];
    // const [user, setUser] = useState('');
    // const [postTitle, setPostTitle] = useState('');
    // const [postContent, setPostContent] = useState('');
    // const [date, setDate] = useState('');
    // const [likeIcon, setLikeIcon] = useState('');
    // const [likeCount, setLikeCount] = useState('');
    // const [commentIcon, setCommentIcon] = useState('');
    // const [commentCount, setCommentCount] = useState('');

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const data = {
        boardType: boardType,
        page: page - 1,
    }
    //게시판 별 게시글 목록 조회
    BoardAPI.eachBoardSelect(data).then(response => {
        Object.keys(response.data).forEach(function (k) {
            // response.data.map(data => ({

            // }));
            if (k === 'content') {
                for (let i = 0; i <= 1; i++) {
                    let title = response.data[k][i].title;                          //제목
                    let contents = response.data[k][i].contents;                    //내용
                    let registrationDate = response.data[k][i].registrationDate;    //등록일
                    let isAnonymous = response.data[k][i].isAnonymous;              //익명여부
                    let checkAnonymous = ""                                         //익명여부체크
                    let likeCount = response.data[k][i].likeCount;                  //좋아요개수
                    let commentCount = response.data[k][i].commentCount;            //댓글개수
                    let views = response.data[k][i].views;                          //조회수
                    let fileCount = response.data[k][i].fileCount;                     //파일
                    let writer = response.data[k][i].writer;                        //작성자


                    if (isAnonymous === 'N') {
                        checkAnonymous = writer;
                    } else {
                        checkAnonymous = "익명";
                    }

                    postItems.push({
                        user: checkAnonymous, postTitle: title, postContent: contents, date: registrationDate,
                        likeCount: likeCount, commentCount: commentCount, fileCount: fileCount, views: views,
                    });
                }
            }
        });
        setPost(postItems);

    }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
    });


    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                {title}
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
                        key={item.postTitle}
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
                                    width: "10rem",
                                }} />
                            <ListItemText primary={item.user}
                                primaryTypographyProps={{
                                    fontSize: '0.7rem',
                                    width: "2rem",
                                    color: "#C00000"
                                }} />
                        </div>
                        <ListItemIcon sx={{ color: '#C00000', marginLeft: "30%" }}><FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} /></ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                color: '#C00000',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />

                        <ListItemIcon sx={{ color: '#0CDAE0', marginLeft: "-0.5rem" }}><TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} /></ListItemIcon>
                        <ListItemText primary={item.commentCount}
                            primaryTypographyProps={{
                                color: '#0CDAE0',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />
                        <ListItemIcon sx={{ color: '#6666ff', marginLeft: "-1rem" }}><VisibilityOutlinedIcon sx={{ fontSize: '1rem' }} /></ListItemIcon>
                        <ListItemText primary={item.views}
                            primaryTypographyProps={{
                                color: '#6666ff',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />
                        <ListItemIcon sx={{ color: 'gray', marginLeft: "-0.6rem" }}><InsertPhotoOutlinedIcon sx={{ fontSize: '1rem' }} /></ListItemIcon>
                        <ListItemText primary={item.fileCount}
                            primaryTypographyProps={{
                                color: 'gray',
                                width: "1rem",
                                fontSize: "0.5rem",
                                margin: "0.5rem auto auto -2.2rem"
                            }} />

                    </ListItem>
                ))}
            </List>

            <Stack spacing={2} style={{ float: 'right', marginTop: '1.5rem' }}>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>

        </div>
    )
}

export default BoardList;