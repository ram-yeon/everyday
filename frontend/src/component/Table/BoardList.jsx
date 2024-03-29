import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import WriteBox from './WriteBox';
import { displayDateFormat } from "../CommentTool";
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

import { Box } from '@mui/material/';
import { makeStyles } from "@material-ui/core";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';                  //댓글
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';            //조회수
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';          //사진첨부

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    const boardTypeToLowerCase = boardType.toLowerCase();
    const classes = useStyles();
    const navigate = useNavigate();

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialize, setIsInitialize] = useState(false);
    const [show, setShow] = useState(false);

    const handleIsInitialize = (value) => {
        setIsInitialize(value);
    }
    const handleWriteBoxShow = (value) => {
        setShow(value);
    }
    const handleChange = (event, value) => {
        setPage(value);

        getBoardList({
            boardType: boardType,
            page: value - 1,
        });
    };

    const getBoardList = (apiRequestData) => {
        if (tokenJson.account_authority === "USER") {
            //게시판 별 게시글 목록 조회
            BoardAPI.eachBoardSelect(apiRequestData).then(response => {
                if (response.data.hasOwnProperty('content')) {
                    const postItems = [];

                    response.data.content.forEach((v, i) => {
                        const title = JSON.stringify(v.title).replaceAll("\"", "");
                        const contents = (v.contents).replaceAll("\"", "");
                        const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                        const writer = JSON.stringify(v.writer).replaceAll("\"", "");
                        const likeCount = JSON.stringify(v.likeCount);
                        const commentCount = JSON.stringify(v.commentCount);
                        const views = JSON.stringify(v.views);
                        const fileCount = JSON.stringify(v.fileCount);

                        postItems.push({
                            user: writer, postTitle: title, postContent: contents, date: registrationDate,
                            likeCount: likeCount, commentCount: commentCount, fileCount: fileCount, views: views, id: v.id
                        });
                    })
                    setPost(postItems);
                }
                if (response.data.hasOwnProperty('totalPages')) {
                    setTotalPages(response.data.totalPages);
                }
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            }).finally(() => {
                handleIsInitialize(true);
            });
        }
    };

    useEffect(() => {
        if (!isInitialize) {
            getBoardList({
                boardType: boardType,
                page: 0,
            });
        }
    });
    //조회수갱신
    const clickBoardList = (itemId) => {
        navigate('/' + boardTypeToLowerCase + 'board/detail/' + itemId, { state: { postId: itemId, headTitle: title } })
        if (tokenJson.account_authority === "USER") {
            const data = {
                views: 1,
            }
            BoardAPI.boardViews(itemId, data).then(response => {
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            })
        }
    }

    return (
        <div>
            <Box border="2px lightgray solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={1.5}>
                {title}
            </Box>
            {   //HOT게시물이면 글작성박스 안보이도록
                (boardType !== "HOT") ?
                    <Box p={1.8} className={classes.writeBoxBtn} onClick={() => setShow(!show)}>
                        새 글을 작성하세요.
                        <BorderColorIcon sx={{ float: "right" }} />
                    </Box>
                    : null
            }
            {show && <WriteBox boardType={boardType} handleWriteBoxShow={handleWriteBoxShow} handleIsInitialize={handleIsInitialize} />}
            <List sx={{ marginTop: "-0.4rem" }}>
                {post.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "15vh" }}
                        button
                        key={item.id}
                        onClick={() => clickBoardList(item.id)}>
                        <div>
                            <ListItemText primary={item.postTitle}
                                primaryTypographyProps={{
                                    color: 'black',
                                    width: "30rem",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }} />
                            <ListItemText
                                primary={item.postContent.replaceAll("\n", " ")}
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
                                    width: "5rem",
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

            <Stack spacing={2} style={{ marginTop: '1.5rem' }}>
                <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>

        </div>
    )
}

export default BoardList;