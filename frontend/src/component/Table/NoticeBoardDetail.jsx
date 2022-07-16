import React, { useState, useEffect } from 'react'
import EditBox from './EditBox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from '@mui/material/';
import { Info } from '@material-ui/icons';

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';            //조회수
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';          //사진첨부

import moment from 'moment';
import 'moment/locale/ko';

import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

const useStyles = makeStyles((theme) => ({
    headLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'black',
    },
    writerIcon: {
        color: "#C00000",
        [theme.breakpoints.up("sm")]: {
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
        borderRadius: "0.5rem",
        marginTop: "1rem",
        float: "right",
    },
}));


function NoticeBoardDetail() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.state.postId;
    const headTitle = location.state.headTitle;

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [dateFormat, setDateFormat] = useState('');
    const [fileCount, setFileCount] = useState('');
    const [views, setViews] = useState('');
    const [likeCount, setLikeCount] = useState('');
    const [likeState, setLikeState] = useState('');

    const [isInitialize, setIsInitialize] = useState(false);
    const data = {
        noticeId: postId,
    }
    useEffect(() => {
        if (!isInitialize) {
            //공지사항 상세조회
            BoardAPI.noticeBoardDetailSelect(data).then(response => {
                // file 처리필요  
                // if (response.data.hasOwnProperty('file')) {
                //
                // }
                setTitle(response.data.title);
                setContents(response.data.contents);
                setDateFormat(moment(response.data.registrationDate, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
                setLikeCount(Number(response.data.likeCount));
                setViews(response.data.views);
                setFileCount(response.data.fileCount);

            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            }).finally(() => {
                setIsInitialize(true);
            });
        }
    });
    const [displayEditBox, setDisplayEditBox] = useState(false);
    //게시글 수정 버튼
    const editPost = (value) => {
        if (tokenJson.account_authority === 'MANAGER') {
            setDisplayEditBox(value);
        }
    }
    //게시글 삭제
    const deletePost = () => {
        if (tokenJson.account_authority === 'MANAGER') {
            const data = {
                postId: postId,
            }
            BoardAPI.deleteBoardByAdmin(data).then(response => {
                Message.success(response.message);
                navigate('/noticeboard');
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            })
        } else {
            alert("삭제할 권한이 없습니다.");
        }
    }

    return (
        <>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                <Link to='/noticeboard' className={classes.headLink}>{headTitle}</Link>
            </Box>
            {!displayEditBox ?
                <div>
                    <Box border="2px lightgray solid" color="black" textAlign="left" marginTop="0.3rem" p={2} >
                        <Info className={classes.writerIcon} />
                        {
                            (tokenJson.account_authority === 'MANAGER') ?
                                < div style={{ float: "right" }}>
                                    <Typography className={classes.update} onClick={()=>editPost(true)}>수정</Typography>
                                    <Typography className={classes.delete} onClick={deletePost}>삭제</Typography>
                                </div>
                                : null
                        }
                        <Typography className={classes.writer}>에브리데이</Typography>
                        <Typography className={classes.date}>{dateFormat}</Typography>
                        <Typography style={{ fontSize: '1.8rem', marginTop: "1rem" }}><strong>{title}</strong></Typography>
                        <Typography style={{ margin: "0.5rem auto auto 0.3rem" }}>{contents}</Typography>
                        <div style={{ margin: "2rem auto auto 0.3rem" }}>
                            {
                                (!likeState) ?
                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000' }} />
                                    :
                                    <FavoriteOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000' }} />
                            }<span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#C00000' }}>{likeCount}</span>
                            <VisibilityOutlinedIcon sx={{ fontSize: '1rem', color: '#6666ff', marginLeft: "1rem" }} /><span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: '#6666ff' }}>{views}</span>
                            <InsertPhotoOutlinedIcon sx={{ fontSize: '1rem', color: 'gray', marginLeft: "1rem" }} /><span style={{ marginLeft: "0.2rem", fontSize: "0.7rem", color: 'gray' }}>{fileCount}</span>
                        </div>
                    </Box>
                    <Link to='/noticeboard'><button className={classes.listBtn}>목록</button></Link>
                </div>
                :
                <EditBox boardType="NOTICE" postId={postId} writtenTitle={title} writtenContents={contents} editPost={editPost} />
            }
        </>
    )
}

export default NoticeBoardDetail