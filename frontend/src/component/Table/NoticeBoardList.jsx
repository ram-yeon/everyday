import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WriteBox from './WriteBox';

// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

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

    const [show, setShow] = useState(false);
    const [notice, setNotice] = useState([]);
    const noticeItems = [];
    const [page, setPage] = useState(1);
    const [isInitialize, setIsInitialize] = useState(false);

    const handleChange = (event, value) => {
        setPage(value);
    };
    const data = {
        page: page - 1,
    }
    useEffect(() => {
        if (!isInitialize) {
            let token = localStorage.getItem(SESSION_TOKEN_KEY);
            token = 'Bearer ' + token;
            const tokenJson = JSON.parse(atob(token.split(".")[1]));
            if (tokenJson.authority === "USER") {
                //공지사항 게시글 목록 조회
                BoardAPI.noticeBoardSelect(data).then(response => {
                    if (response.data.hasOwnProperty('content')) {
                        response.data.content.forEach((v, i) => {
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const likeCount = JSON.stringify(v.likeCount);
                            const views = JSON.stringify(v.views);
                            const fileCount = JSON.stringify(v.fileCount);

                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');

                            noticeItems.push({
                                postTitle: titleTrim, date: registrationDateTrim, likeCount: likeCount, fileCount: fileCount, views: views, id: v.id
                            });
                        })
                    }
                    setNotice(noticeItems);

                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                }).finally(() => {
                    setIsInitialize(true);
                });
            }
        }
    });
    return (
        <div>
            <Box border="2px black solid" color="black" fontWeight="bold" fontSize="1.4rem" textAlign="left" p={2}>
                {title}
            </Box>
            <Box p={1.8} className={classes.writeBoxBtn} onClick={() => setShow(!show)}>
                공지사항을 등록해주세요. //관리자만 이 칸 보임
                <BorderColorIcon sx={{ float: "right" }} />
            </Box>

            {
                show ? <WriteBox show={show} /> : null
            }

            <List sx={{ marginTop: "-0.4rem" }}>
                {notice.map(item => (
                    <ListItem
                        sx={{ border: "1px gray solid", height: "12vh" }}
                        button
                        key={item.id}
                        onClick={() => navigate('/noticeboarddetail/' + item.id, { state: item.id })}
                    >
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


                            <ListItemText primary="에브리타임"
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

            <Stack spacing={2} style={{ marginLeft: '32%', marginTop: '1.5rem' }}>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>

        </div>
    )
}

export default NoticeBoardList