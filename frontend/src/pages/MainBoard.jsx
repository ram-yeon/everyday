import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box } from '@mui/material/';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import * as BoardAPI from '../api/Board';
import { Message } from '../component/Message';
// import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

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
    // const history = useHistory()
    // const location = useLocation()
    const [notice, setNotice] = useState([]);
    const [hot, setHot] = useState([]);
    const [free, setFree] = useState([]);
    const [club, setClub] = useState([]);
    const [info, setInfo] = useState([]);

    //메인화면 게시글 목록 조회
    BoardAPI.mainBoardSelect().then(response => {
        // token decode 방법
        // let jwt = require("jsonwebtoken");
        // let token = localStorage.getItem(SESSION_TOKEN_KEY);
        // let decode = jwt.decode(token);
        // console.log("without leading space");
        // console.log(decode);
        const noticeItems = [];
        const hotItems = [];
        const freeItems = [];
        const clubItems = [];
        const infoItems = [];
        Object.keys(response.data).forEach(function (k) {
            if (k === 'NOTICE') {
                for (let i = 0; i <= 3; i++) {
                    if (response.data[k][i].title && response.data[k][i].registrationDate) {
                        let title = JSON.stringify(response.data[k][i].title);
                        let registrationDate = JSON.stringify(response.data[k][i].registrationDate);
                        let titleTrim = title.split('"');
                        let registrationDateTrim = registrationDate.split('"');
                        noticeItems.push({ text: titleTrim, date: registrationDateTrim });
                    }
                    else {
                        noticeItems.push({ text: "데이터 없음", date: "" });
                    }
                }
            }
            else if (k === 'FREE') {
                for (let i = 0; i <= 1; i++) {
                    if (response.data[k][i].title && response.data[k][i].registrationDate) {
                        let title = JSON.stringify(response.data[k][i].title);
                        let registrationDate = JSON.stringify(response.data[k][i].registrationDate);
                        let titleTrim = title.split('"');
                        let registrationDateTrim = registrationDate.split('"');
                        freeItems.push({ text: titleTrim, date: registrationDateTrim });
                    } else {
                        freeItems.push({ text: "데이터 없음", date: "" });
                    }
                }
            }
            // else if (k === 'HOT') {
            //     for (let i = 0; i <= 3; i++) {
            //         console.log(JSON.stringify(response.data[k][i].title));
            //         console.log(JSON.stringify(response.data[k][i].registrationDate));
            //     }
            // }
            else if (k === 'INFO') {
                for (let i = 0; i <= 2; i++) {
                    if (response.data[k][i].title && response.data[k][i].registrationDate) {
                        let title = JSON.stringify(response.data[k][i].title);
                        let registrationDate = JSON.stringify(response.data[k][i].registrationDate);
                        let titleTrim = title.split('"');
                        let registrationDateTrim = registrationDate.split('"');
                        infoItems.push({ text: titleTrim, date: registrationDateTrim });
                    } else {
                        infoItems.push({ text: "데이터 없음", date: "" });
                    }
                }
            }
            else if (k === 'CLUB') {
                for (let i = 0; i <= 3; i++) {
                    if (response.data[k][i].title && response.data[k][i].registrationDate) {
                        let title = JSON.stringify(response.data[k][i].title);
                        let registrationDate = JSON.stringify(response.data[k][i].registrationDate);
                        let titleTrim = title.split('"');
                        let registrationDateTrim = registrationDate.split('"');
                        clubItems.push({ text: titleTrim, date: registrationDateTrim });
                    } else {
                        clubItems.push({ text: "데이터 없음", date: "" });
                    }
                }
            }

        });
        setNotice(noticeItems);
        setHot(hotItems);
        setFree(freeItems);
        setClub(clubItems);
        setInfo(infoItems);

    }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
    });


    return (
        <div className={classes.container}>
            <Grid container spacing={5} >
                <Grid item xs={12}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        <Link to='/noticeboard' className={classes.link}>공지사항</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                        {notice.map(item => (
                            <ListItem
                                button
                                key={item.text}
                            // onClick={() => history.push(item.path)}
                            // className={location.pathname == item.path ? classes.active : null}
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
                                        // border:"solid 2px red"
                                    }} />
                                <ListItemText primary={item.date}
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width: "3rem",
                                        marginLeft: "82%",

                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        <Link to='/hotboard' className={classes.link}>HOT 게시물</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                        {hot.map(item => (
                            <ListItem
                                button
                                key={item.text}
                            // onClick={() => history.push(item.path)}
                            // className={location.pathname == item.path ? classes.active : null}
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
                                        width: "3rem",
                                        marginLeft: "65%",

                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        <Link to='/informationboard' className={classes.link}>정보 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                        {info.map(item => (
                            <ListItem
                                button
                                key={item.text}
                            // onClick={() => history.push(item.path)}
                            // className={location.pathname == item.path ? classes.active : null}
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
                                        width: "3rem",
                                        marginLeft: "65%",

                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1} >
                        <Link to='/freeboard' className={classes.link} name="자유 게시판">자유 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                        {free.map(item => (
                            <ListItem
                                button
                                key={item.text}
                            // onClick={() => history.push(item.path)}
                            // className={location.pathname == item.path ? classes.active : null}
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
                                        width: "3rem",
                                        marginLeft: "65%",

                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        <Link to='/clubboard' className={classes.link}>동아리 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
                        {club.map(item => (
                            <ListItem
                                button
                                key={item.text}
                            // onClick={() => history.push(item.path)}
                            // className={location.pathname == item.path ? classes.active : null}
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
                                        width: "3rem",
                                        marginLeft: "65%",

                                    }} />
                            </ListItem>
                        ))}
                    </List>

                </Grid>
            </Grid>
        </div>


    )
}

export default MainBoard