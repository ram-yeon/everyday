import React, { useState, useEffect } from 'react';
import './Board.css';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';                  //댓글
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';            //조회수
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';          //사진첨부
import { makeStyles, Typography } from "@material-ui/core";
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';
import Comment from '../Table/Comment';

const useStyles = makeStyles((theme) => ({
    headLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'black',
    },
    writerIcon: {
        color: "gray",
        [theme.breakpoints.up("sm")]: {
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
    listBtn: {
        width: "10%",
        height: "2.5rem",
        background: "#C00000",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0.1rem 0.1rem 0.3rem 0.1rem gray",
        borderRadius: "0.5rem",
        marginTop: "1rem",
        float: "right",
    },
}));

function BoardDetail() {
    const location = useLocation();
    const postId = location.state.postId;
    const headTitle = location.state.headTitle;

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const classes = useStyles();
    const [boardTypeToLowerCase, setBoardTypeToLowerCase] = useState('');
    const [writer, setWriter] = useState('');
    const [writerLoginId, setWriterLoginId] = useState('');
    const [id, setId] = useState('');
    const [likeCount, setLikeCount] = useState('');
    const [likeState, setLikeState] = useState('');

    const [commentCount, setCommentCount] = useState('');
    const [views, setViews] = useState('');
    const [fileCount, setFileCount] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [dateFormat, setDateFormat] = useState('');

    const [comment, setComment] = useState([]);
    const [isInitialize, setIsInitialize] = useState(false);
    const data = {
        postId: postId,
    }

    useEffect(() => {
        if (!isInitialize) {
            if (tokenJson.account_authority === "USER") {
                //게시글 상세조회
                BoardAPI.boardDetailSelect(data).then(response => {
                    // file 처리필요
                    if (response.data.hasOwnProperty('comment')) {
                        const commentItems = [];
                        response.data.comment.forEach((v, i) => {
                            const commentWriter = (JSON.stringify(v.writer).replaceAll("\"", ""));
                            const commentContents = (JSON.stringify(v.contents).replaceAll("\"", ""));
                            const commentDateFormat = (moment(v.registrationDate, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
                            const commentId = (v.id);
                            // const commentLikeCount = (v.likeCount);
                            const isLikeComment = (JSON.stringify(v.isLikeComment).replaceAll("\"", ""));     //해당 댓글 좋아요했는지에 대한 상태값  
                            const commentType = (JSON.stringify(v.commentType).replaceAll("\"", ""));         //댓글인지 대댓글인지
                            let preId = '';
                            //preId가있는경우(->대댓글)
                            if (v.hasOwnProperty('preId')) {
                                preId = (v.preId);
                            }
                            commentItems.push({
                                commentWriter: commentWriter, commentContents: commentContents, commentDateFormat: commentDateFormat,
                                commentId: commentId, isLikeComment: isLikeComment, commentType: commentType, preId: preId
                            });
                        })
                        setComment(commentItems);
                    } else if (response.data.hasOwnProperty('file')) {

                    }
                    const boardType = response.data.boardType;
                    setBoardTypeToLowerCase(boardType.toLowerCase());
                    setTitle(JSON.stringify(response.data.title).replaceAll("\"", ""));
                    setContents(JSON.stringify(response.data.contents).replaceAll("\"", ""));
                    setDateFormat(moment(response.data.registrationDate, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
                    setWriter(JSON.stringify(response.data.writer).replaceAll("\"", ""));
                    setWriterLoginId(JSON.stringify(response.data.writerLoginId));
                    setId(JSON.stringify(response.data.id));
                    setLikeCount(Number(response.data.likeCount));
                    let isLikePost = JSON.stringify(response.data.isLikePost).replaceAll("\"", ""); //해당 게시글 좋아요했는지에 대한 상태값  
                    if (isLikePost === "Y") {
                        setLikeState(true);
                    } else {
                        setLikeState(false);
                    }
                    setCommentCount(JSON.stringify(response.data.commentCount));
                    setViews(JSON.stringify(response.data.views));
                    setFileCount(JSON.stringify(response.data.fileCount));
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                }).finally(() => {
                    setIsInitialize(true);
                });
            }
        }
    });

    const clickLike = () => {
        if (tokenJson.account_authority === "USER") {
            if (!likeState) {  //좋아요추가
                setLikeState(true);
                setLikeCount(likeCount + 1);
                const data = {
                    targetType: "POST",
                    targetId: id
                }
                BoardAPI.like(data).then(response => {
                    Message.success(response.message);
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            } else { //좋아요취소
                setLikeState(false);
                setLikeCount(likeCount - 1);
                const data = {
                    targetType: "POST",
                    targetId: id
                }
                BoardAPI.likeCancel(data).then(response => {
                    Message.success(response.message);
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            }
        } else {
            alert("좋아요 권한이 없습니다.");
        }
    }
    //게시글 삭제
    const deletePost = () => {
        if (tokenJson.sub === writerLoginId) {
            const data = {
                postId: id,
            }
            BoardAPI.deleteBoard(data).then(response => {
                Message.success(response.message);
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            })
        } else {
            alert("삭제할 권한이 없습니다.");
        }
    }
    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                <Link to={'/' + boardTypeToLowerCase + 'board'} className={classes.headLink}>{headTitle}</Link>
            </Box>
            <Box border="2px lightgray solid" color="black" textAlign="left" marginTop="0.3rem" p={2} >
                <AccountCircleIcon className={classes.writerIcon} />
                {
                    (tokenJson.sub === writerLoginId) ?
                        < div style={{ float: "right" }}>
                            <Typography className={classes.postUpdate}>수정</Typography>
                            <Typography className={classes.postDelete} onClick={deletePost}>삭제</Typography>
                        </div>
                        : null
                }
                <Typography className={classes.writer}>{writer}</Typography>
                <Typography className={classes.date}>{dateFormat}</Typography>
                <Typography style={{ fontSize: '1.8rem', marginTop: "1rem" }}><strong>{title}</strong></Typography>
                <Typography style={{ margin: "0.5rem auto auto 0.3rem" }}>{contents}</Typography>

                <div style={{ margin: "2rem auto auto 0.3rem" }}>
                    {
                        (!likeState) ?
                            <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} onClick={clickLike} />
                            :
                            <FavoriteOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} onClick={clickLike} />
                    }<span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#C00000', cursor: 'pointer' }} onClick={clickLike}>{likeCount}</span>
                    <TextsmsOutlinedIcon sx={{ fontSize: '1rem', color: '#0CDAE0', marginLeft: "1rem" }} /><span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#0CDAE0' }}>{commentCount}</span>
                    <VisibilityOutlinedIcon sx={{ fontSize: '1rem', color: '#6666ff', marginLeft: "1rem" }} /><span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#6666ff' }}>{views}</span>
                    <InsertPhotoOutlinedIcon sx={{ fontSize: '1rem', color: 'gray', marginLeft: "1rem" }} /><span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: 'gray' }}>{fileCount}</span>
                </div>
            </Box >

            {/* 댓글 */}
            <Comment comment={comment} postId={postId}/>

            {/* 게시판따라경로분기처리 */}
            <Link to={'/' + boardTypeToLowerCase + 'board'}><button className={classes.listBtn}>목록</button></Link>
        </div >
    )
}

export default BoardDetail