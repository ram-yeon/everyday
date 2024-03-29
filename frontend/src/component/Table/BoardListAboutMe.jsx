import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { displayDateFormat } from "../CommentTool";
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

import { Box } from '@mui/material/';
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

function BoardListAboutMe() {
    const navigate = useNavigate();
    const location = useLocation();
    const headTitle = location.state.headTitle;
    const typeId = location.state.typeId;

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const [currentTypeId, setCurrentTypeId] = useState(typeId);
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialize, setIsInitialize] = useState(false);

    const handleChange = (event, value) => {
        setPage(value);
        getBoardList({
            page: value - 1,
        });
    };

    const getBoardList = (apiRequestData) => {
        if (tokenJson.account_authority === "USER") {
            if (typeId === 1) { //내가 쓴 글 조회
                BoardAPI.WritenByMe(apiRequestData).then(response => {
                    if (response.data.hasOwnProperty('content')) {
                        const postItems = [];
                        response.data.content.forEach((v, i) => {
                            let boardTypeToLowerCase = (v.boardType.toLowerCase());         //게시판타입(소문자)
                            let boardTypeToKor = v.boardType;                               //게시판타입(한글)
                            const title = (v.title).replaceAll("\"", "");
                            const contents = (v.contents).replaceAll("\"", "");
                            const registrationDate = displayDateFormat((v.registrationDate).replaceAll("\"", ""));
                            let writer = (v.writer).replaceAll("\"", "");
                            const likeCount = (v.likeCount)
                            const commentCount = (v.commentCount);
                            const views = (v.views);;
                            const fileCount = (v.fileCount);
                            switch (boardTypeToKor) {
                                case 'FREE':
                                    boardTypeToKor = '자유 게시판';
                                    break;
                                case 'INFO':
                                    boardTypeToKor = '정보 게시판';
                                    break;
                                case 'CLUB':
                                    boardTypeToKor = '동아리 게시판';
                                    break;
                                case 'NOTICE':
                                    boardTypeToKor = '공지사항';
                                    writer = '에브리데이';
                                    break;
                                default:
                                    break;
                            }
                            postItems.push({
                                boardTypeToLowerCase: boardTypeToLowerCase, boardTypeToKor: boardTypeToKor,
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
                    setIsInitialize(true);
                    setCurrentTypeId(typeId);
                });
            }
            if (typeId === 2) { //댓글 단 글 조회
                BoardAPI.commentByMe(apiRequestData).then(response => {
                    if (response.data.hasOwnProperty('content')) {
                        const postItems = [];
                        response.data.content.forEach((v, i) => {
                            let boardTypeToLowerCase = (v.boardType.toLowerCase());         //게시판타입(소문자)
                            let boardTypeToKor = v.boardType;                               //게시판타입(한글)
                            const title = (v.title).replaceAll("\"", "");
                            const contents = (v.contents).replaceAll("\"", "");
                            const registrationDate = displayDateFormat((v.registrationDate).replaceAll("\"", ""));
                            let writer = (v.writer).replaceAll("\"", "");
                            const likeCount = (v.likeCount)
                            const commentCount = (v.commentCount);
                            const views = (v.views);;
                            const fileCount = (v.fileCount);
                            switch (boardTypeToKor) {
                                case 'FREE':
                                    boardTypeToKor = '자유 게시판';
                                    break;
                                case 'INFO':
                                    boardTypeToKor = '정보 게시판';
                                    break;
                                case 'CLUB':
                                    boardTypeToKor = '동아리 게시판';
                                    break;
                                case 'NOTICE':
                                    boardTypeToKor = '공지사항';
                                    writer = '에브리데이';
                                    break;
                                default:
                                    break;
                            }
                            postItems.push({
                                boardTypeToLowerCase: boardTypeToLowerCase, boardTypeToKor: boardTypeToKor,
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
                    setIsInitialize(true);
                    setCurrentTypeId(typeId);
                });
            }
            if (typeId === 3) { //좋아요 한 글 조회
                BoardAPI.likeByMe(apiRequestData).then(response => {
                    if (response.data.hasOwnProperty('content')) {
                        const postItems = [];
                        response.data.content.forEach((v, i) => {
                            let boardTypeToLowerCase = (v.boardType.toLowerCase());         //게시판타입(소문자)
                            let boardTypeToKor = v.boardType;                               //게시판타입(한글)
                            const title = (v.title).replaceAll("\"", "");
                            const contents = (v.contents).replaceAll("\"", "");
                            const registrationDate = displayDateFormat((v.registrationDate).replaceAll("\"", ""));
                            let writer = (v.writer).replaceAll("\"", "");
                            const likeCount = (v.likeCount)
                            const commentCount = (v.commentCount);
                            const views = (v.views);;
                            const fileCount = (v.fileCount);
                            switch (boardTypeToKor) {
                                case 'FREE':
                                    boardTypeToKor = '자유 게시판';
                                    break;
                                case 'INFO':
                                    boardTypeToKor = '정보 게시판';
                                    break;
                                case 'CLUB':
                                    boardTypeToKor = '동아리 게시판';
                                    break;
                                case 'NOTICE':
                                    boardTypeToKor = '공지사항';
                                    writer = '에브리데이';
                                    break;
                                default:
                                    break;
                            }
                            postItems.push({
                                boardTypeToLowerCase: boardTypeToLowerCase, boardTypeToKor: boardTypeToKor,
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
                    setIsInitialize(true);
                    setCurrentTypeId(typeId);
                });
            }
        }
    };

    useEffect(() => {
        if (!isInitialize || currentTypeId !== typeId) {
            getBoardList({
                page: 0,
            });
        }
    });

    //조회수갱신
    const clickBoardList = (itemId, boardTypeToLowerCase, boardTypeToKor) => {
        navigate('/' + boardTypeToLowerCase + 'board/detail/' + itemId, { state: { postId: itemId, headTitle: boardTypeToKor } })
        if (tokenJson.account_authority === "USER") {
            const data = {
                views: 1,
            }
            if (boardTypeToLowerCase === 'notice') {
                BoardAPI.noticeBoardViews(itemId, data).then(response => {
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            } else {
                BoardAPI.boardViews(itemId, data).then(response => {
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            }
        }
    }

    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                {headTitle}
            </Box>
            <List sx={{ marginTop: "-0.4rem" }}>
                {post.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "17vh" }}
                        button
                        key={item.id}
                        onClick={() => clickBoardList(item.id, item.boardTypeToLowerCase, item.boardTypeToKor)}
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
                                    fontSize: '0.5rem',
                                    width: "5rem",
                                    color: "#C00000"
                                }} />
                            <ListItemText primary={'[' + item.boardTypeToKor + ']'}
                                primaryTypographyProps={{
                                    fontSize: '0.3rem',
                                    width: "7rem",
                                    color: "gray",
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

export default BoardListAboutMe;