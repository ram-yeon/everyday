import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WriteBox from './WriteBox';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { displayDateFormat } from "../CommentTool";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

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

function NoticeBoardList(props) {
    const {
        title,
    } = props;
    const classes = useStyles();
    const navigate = useNavigate();

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const [show, setShow] = useState(false);
    const [notice, setNotice] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isInitialize, setIsInitialize] = useState(false);

    const handleIsInitialize = (value) => {
        setIsInitialize(value);
    }
    const handleWriteBoxShow = (value) => {
        setShow(value);
    }
    const handleChange = (event, value) => {
        setPage(value);
        getBoardList({
            page: value - 1,    //추후 -1 제거 필요
        });
    };

    const getBoardList = (apiRequestData) => {
        //공지사항 게시글 목록 조회
        BoardAPI.noticeBoardSelect(apiRequestData).then(response => {
            if (response.data.hasOwnProperty('content')) {
                const noticeItems = [];
                response.data.content.forEach((v, i) => {
                    const title = JSON.stringify(v.title).replaceAll("\"", "");
                    const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                    const likeCount = JSON.stringify(v.likeCount);
                    const views = JSON.stringify(v.views);
                    const fileCount = JSON.stringify(v.fileCount);

                    noticeItems.push({
                        postTitle: title, date: registrationDate, likeCount: likeCount, fileCount: fileCount, views: views, id: v.id
                    });
                })
                setNotice(noticeItems);
            }
            if (response.data.hasOwnProperty('totalPages')) {
                setTotalPages(response.data.totalPages);
            }
        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        }).finally(() => {
            setIsInitialize(true);
        });
    };

    useEffect(() => {
        if (!isInitialize) {
            getBoardList({
                page: 0,    //추후 1로 수정필요
            });
        }
    });
    //조회수갱신
    const clickNoticeBoardList = (itemId) => {
        navigate('/noticeboard/detail/' + itemId, { state: { postId: itemId, headTitle: '공지사항' } })
        const data = {
            views: 1,
        }
        BoardAPI.noticeBoardViews(itemId, data).then(response => {
        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        })
    }

    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={1.5}>
                {title}
            </Box>
            {   //공지 등록은 관리자만 글작성박스 보이도록
                (tokenJson.account_authority === 'MANAGER') ?
                    <Box p={1.8} className={classes.writeBoxBtn} onClick={() => setShow(!show)}>
                        공지사항을 등록해주세요.
                        <BorderColorIcon sx={{ float: "right" }} />
                    </Box>
                    : null
            }
            {show && <WriteBox boardType='공지사항' handleWriteBoxShow={handleWriteBoxShow} handleIsInitialize={handleIsInitialize} />}
            <List sx={{ marginTop: "-0.4rem" }}>
                {notice.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "12vh" }}
                        button
                        key={item.id}
                        onClick={() => clickNoticeBoardList(item.id)} >
                        <div>
                            <ListItemText primary={item.postTitle}
                                primaryTypographyProps={{
                                    color: 'black',
                                    width: "30rem",

                                }} />

                            <ListItemText primary={item.date}
                                primaryTypographyProps={{
                                    color: 'gray',
                                    width: "10rem",
                                    fontSize: '0.5rem',
                                }} />


                            <ListItemText primary="에브리데이"
                                primaryTypographyProps={{
                                    fontSize: '0.7rem',
                                    width: "4rem",
                                    color: "#C00000"
                                }} />

                        </div>

                        <ListItemIcon sx={{ color: '#C00000', marginLeft: '35%' }}><FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} /></ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                color: '#C00000',
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

export default NoticeBoardList