import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import 'moment/locale/ko';	

import { useNavigate } from 'react-router-dom';

import * as BoardAPI from '../api/Board';
import { Message } from '../component/Message';

import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
}));

function MainBoard() {
    const classes = useStyles()
    const navigate = useNavigate();

    const [notice, setNotice] = useState([]);
    const [hot, setHot] = useState([]);
    const [free, setFree] = useState([]);
    const [club, setClub] = useState([]);
    const [info, setInfo] = useState([]);
    const [isInitialize, setIsInitialize] = useState(false);

    useEffect(() => {
        if (!isInitialize) {
            let token = localStorage.getItem(SESSION_TOKEN_KEY);
            token = 'Bearer ' + token;
            const tokenJson = JSON.parse(atob(token.split(".")[1]));
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
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');
                            const dateFormat = moment(registrationDateTrim, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                            noticeItems.push({ text: titleTrim, date: dateFormat, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('FREE')) {
                        response.data.FREE.forEach((v, i) => {
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');
                            const dateFormat = moment(registrationDateTrim, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                            freeItems.push({ text: titleTrim, date: dateFormat, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('INFO')) {
                        response.data.INFO.forEach((v, i) => {
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');
                            const dateFormat = moment(registrationDateTrim, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                            infoItems.push({ text: titleTrim, date: dateFormat, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('CLUB')) {
                        response.data.CLUB.forEach((v, i) => {
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');
                            const dateFormat = moment(registrationDateTrim, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                            clubItems.push({ text: titleTrim, date: dateFormat, id: v.id });
                        })
                    }
                    if (response.data.hasOwnProperty('HOT')) {
                        response.data.HOT.forEach((v, i) => {
                            const title = JSON.stringify(v.title);
                            const registrationDate = JSON.stringify(v.registrationDate);
                            const titleTrim = title.split('"');
                            const registrationDateTrim = registrationDate.split('"');
                            const dateFormat = moment(registrationDateTrim, "YYYY.MM.DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                            hotItems.push({ text: titleTrim, date: dateFormat, id: v.id });
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

    return (
        <div className={classes.container}>
            <Grid container spacing={5} >
                {
                    notice.length > 0 &&
                    <>
                        <Grid item xs={12}>
                            <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                                <Link to='/noticeboard' className={classes.link}>공지사항</Link>
                            </Box>
                            <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                                {notice.map(item => (
                                    <ListItem
                                        button
                                        key={item.id}
                                        onClick={() => navigate('/noticeboard/detail/' + item.id, { state: item.id })}
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
                            <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                                <Link to='/hotboard' className={classes.link}>HOT 게시물</Link>
                            </Box>
                            <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                                {hot.map(item => (
                                    <ListItem
                                        button
                                        key={item.id}
                                        onClick={() => navigate('/hotboard/detail/' + item.id, { state: { postId: item.id, headTitle: 'HOT 게시물' } })}
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
                            <Box border="2px black solid" color="black" fontWeight="bold" p={1} >
                                <Link to='/freeboard' className={classes.link} name="자유 게시판">자유 게시판</Link>
                            </Box>
                            <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                            <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                                <Link to='/infoboard' className={classes.link}>정보 게시판</Link>
                            </Box>
                            <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                            <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                                <Link to='/clubboard' className={classes.link}>동아리 게시판</Link>
                            </Box>
                            <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
        </div>


    )
}

export default MainBoard