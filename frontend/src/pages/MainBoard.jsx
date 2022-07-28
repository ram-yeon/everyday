import React, { useEffect, useState } from 'react'
import NoticeBoard from '../pages/Notice/NoticeBoard';
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import * as BoardAPI from '../api/Board';
import { displayDateFormat } from "../component/CommentTool";
import { Message } from '../component/Message';
import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#C00000",
        "&:hover": {
            color: '#C00000',
        }
    },
    climbUpText: {
        textDecoration: "none",
        fontSize: "0.7rem",
        color: "gray",
        cursor: "pointer",
        float: "right",
        textAlign: "right",
    },
}));

function MainBoard() {
    const classes = useStyles()
    const navigate = useNavigate();

    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const [notice, setNotice] = useState([]);
    const [hot, setHot] = useState([]);
    const [free, setFree] = useState([]);
    const [club, setClub] = useState([]);
    const [info, setInfo] = useState([]);
    const [isInitialize, setIsInitialize] = useState(false);

    useEffect(() => {
        if (!isInitialize) {
            if (tokenJson.account_authority === "USER") {
                //메인화면 게시글 목록 조회
                BoardAPI.mainBoardSelect().then(response => {
                    const noticeItems = [];
                    const hotItems = [];
                    const freeItems = [];
                    const clubItems = [];
                    const infoItems = [];
                    if (response.data.hasOwnProperty('NOTICE')) {
                        response.data.NOTICE.forEach((v, i) => {
                            const title = JSON.stringify(v.title).replaceAll("\"", "");
                            const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                            noticeItems.push({ text: title, date: registrationDate, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('FREE')) {
                        response.data.FREE.forEach((v, i) => {
                            const title = JSON.stringify(v.title).replaceAll("\"", "");
                            const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                            freeItems.push({ text: title, date: registrationDate, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('INFO')) {
                        response.data.INFO.forEach((v, i) => {
                            const title = JSON.stringify(v.title).replaceAll("\"", "");
                            const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                            infoItems.push({ text: title, date: registrationDate, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('CLUB')) {
                        response.data.CLUB.forEach((v, i) => {
                            const title = JSON.stringify(v.title).replaceAll("\"", "");
                            const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                            clubItems.push({ text: title, date: registrationDate, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('HOT')) {
                        response.data.HOT.forEach((v, i) => {
                            const title = JSON.stringify(v.title).replaceAll("\"", "");
                            const registrationDate = displayDateFormat(JSON.stringify(v.registrationDate).replaceAll("\"", ""));
                            hotItems.push({ text: title, date: registrationDate, id: v.id });
                        })
                    }
                    setNotice(noticeItems);
                    setHot(hotItems);
                    setFree(freeItems);
                    setClub(clubItems);
                    setInfo(infoItems);

                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                }).finally(() => {
                    setIsInitialize(true);
                });
            }
        }

    });

    const clickHotBoard = () => {
        if (tokenJson.authorities[0].authority === 'ROLE_BASIC') {
            alert("HOT 게시물을 보려면 등급 업그레이드가 필요합니다.\n(조건: 좋아요10개, 댓글5개 이상)");
        } else
            navigate('/hotboard');
    };
    const clickHotBoardDetail = (itemId) => {
        if (tokenJson.authorities[0].authority === 'ROLE_BASIC') {
            alert("HOT 게시물을 보려면 등급 업그레이드가 필요합니다.\n(조건: 좋아요10개, 댓글5개 이상)");
        } else
            navigate('/hotboard/detail/' + itemId, { state: { postId: itemId, headTitle: 'HOT 게시물' } })
    };

    const climbUp = () => {
        BoardAPI.userAuthorityEdit().then(response => {
            //성공하면 등급업그레이드 텍스트 없어져야하고 핫게 들어갈 수 있어야함
            console.log(JSON.stringify(response));
            Message.success(response.message);
        }).catch(error => {
            console.log(JSON.stringify(error));
            Message.error(error.message);
        })
    };

    return (
        <>
            {(tokenJson.account_authority === "MANAGER") ?     //관리자면 공지사항 메뉴만 노출 
                <NoticeBoard />
                :
                <>
                    {
                        (tokenJson.authorities[0].authority === 'ROLE_BASIC') ?
                            <div className={classes.climbUpText} onClick={() => climbUp()}>
                                HOT 게시물을 보고싶다면?<br />클릭 시, 등급 업그레이드!
                            </div>
                            : null
                    }
                    <Grid container spacing={5} >
                        {
                            notice.length > 0 &&
                            <>
                                <Grid item xs={12}>
                                    <Box sx={{ border: "1px lightgray solid", color: "black", fontWeight: "bold" }} p={1.5}>
                                        <Link to='/noticeboard' className={classes.link}>공지사항</Link>
                                    </Box>
                                    <List sx={{ border: "0.8px lightgray solid" }}>
                                        {notice.map(item => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => navigate('/noticeboard/detail/' + item.id, { state: { postId: item.id, headTitle: '공지사항' } })}
                                            >
                                                <ListItemText primary={item.text}
                                                    primaryTypographyProps={{
                                                        color: 'black',
                                                        height: '1rem',
                                                        fontSize: '0.8rem',
                                                        width: "20rem",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                    }} />
                                                <ListItemText primary={item.date}
                                                    primaryTypographyProps={{
                                                        color: 'gray',
                                                        fontSize: '0.5rem',
                                                        width: "5rem",
                                                        marginLeft: "83%",
                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        }
                        {
                            hot.length > 0 &&
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ border: "1px lightgray solid", color: "black", fontWeight: "bold" }} p={1.5}>
                                        <span className={classes.link} onClick={() => clickHotBoard()} style={{ cursor: 'pointer' }}>HOT 게시물</span>
                                    </Box>
                                    <List sx={{ border: "0.8px lightgray solid" }}>
                                        {hot.map(item => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => clickHotBoardDetail(item.id)}
                                            >
                                                <ListItemText primary={item.text}
                                                    primaryTypographyProps={{
                                                        color: 'black',
                                                        height: '1rem',
                                                        fontSize: '0.8rem',
                                                        width: "10rem",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                    }} />
                                                <ListItemText primary={item.date}
                                                    primaryTypographyProps={{
                                                        color: 'gray',
                                                        fontSize: '0.5rem',
                                                        width: "5rem",
                                                        marginLeft: "65%",

                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        }

                        {
                            free.length > 0 &&
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ border: "1px lightgray solid", color: "black", fontWeight: "bold" }} p={1.5}>
                                        <Link to='/freeboard' className={classes.link} name="자유 게시판">자유 게시판</Link>
                                    </Box>
                                    <List sx={{ border: "0.8px lightgray solid" }}>
                                        {free.map(item => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => navigate('/hotboard/detail/' + item.id, { state: { postId: item.id, headTitle: '자유 게시판' } })}
                                            >
                                                <ListItemText primary={item.text}
                                                    primaryTypographyProps={{
                                                        color: 'black',
                                                        height: '1rem',
                                                        fontSize: '0.8rem',
                                                        width: "10rem",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",

                                                    }} />
                                                <ListItemText primary={item.date}
                                                    primaryTypographyProps={{
                                                        color: 'gray',
                                                        fontSize: '0.5rem',
                                                        width: "5rem",
                                                        marginLeft: "65%",

                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        }

                        {
                            info.length > 0 &&
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ border: "1px lightgray solid", color: "black", fontWeight: "bold" }} p={1.5}>
                                        <Link to='/infoboard' className={classes.link}>정보 게시판</Link>
                                    </Box>
                                    <List sx={{ border: "0.8px lightgray solid" }}>
                                        {info.map(item => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => navigate('/infoboard/detail/' + item.id, { state: { postId: item.id, headTitle: '정보 게시판' } })}
                                            >
                                                <ListItemText primary={item.text}
                                                    primaryTypographyProps={{
                                                        color: 'black',
                                                        height: '1rem',
                                                        fontSize: '0.8rem',
                                                        width: "10rem",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",

                                                    }} />
                                                <ListItemText primary={item.date}
                                                    primaryTypographyProps={{
                                                        color: 'gray',
                                                        fontSize: '0.5rem',
                                                        width: "5rem",
                                                        marginLeft: "65%",

                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        }

                        {
                            club.length > 0 &&
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ border: "1px lightgray solid", color: "black", fontWeight: "bold" }} p={1.5}>
                                        <Link to='/clubboard' className={classes.link}>동아리 게시판</Link>
                                    </Box>
                                    <List sx={{ border: "0.8px lightgray solid" }}>
                                        {club.map(item => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => navigate('/clubboard/detail/' + item.id, { state: { postId: item.id, headTitle: '동아리 게시판' } })}
                                            >
                                                <ListItemText primary={item.text}
                                                    primaryTypographyProps={{
                                                        color: 'black',
                                                        height: '1rem',
                                                        fontSize: '0.8rem',
                                                        width: "10rem",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",

                                                    }} />
                                                <ListItemText primary={item.date}
                                                    primaryTypographyProps={{
                                                        color: 'gray',
                                                        fontSize: '0.5rem',
                                                        width: "5rem",
                                                        marginLeft: "65%",

                                                    }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        }
                    </Grid>
                </>
            }
        </>
    )
}

export default MainBoard