import React, { useHistory, useLocation } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: "2.5rem 6rem",
        [theme.breakpoints.down("sm")]: {
            margin: "2rem 1rem",
        },
    },
    active: {
        background: "f4f4f4",
    },
}));



function MainBoard() {
    const classes = useStyles()
    // const history = useHistory()
    // const location = useLocation()

    const noticeItems = [
        {
            text: '첫번째 공지',
            path: '/'
        },
        {
            text: '두번째 공지',
            path: '/'
        },
        {
            text: '세번째 공지',
            path: '/'
        },
        {
            text: '네번째 공지',
            path: '/'
        }

    ]
    const hotItems = [
        {
            text: 'hot 게시물1',
            path: '/'
        },
        {
            text: 'hot 게시물2',
            path: '/'
        },
        {
            text: 'hot 게시물3',
            path: '/'
        },
        {
            text: 'hot 게시물4',
            path: '/'
        }

    ]
    const infoItems = [
        {
            text: '정보 게시판 게시글1',
            path: '/'
        },
        {
            text: '정보 게시판 게시글2',
            path: '/'
        },
        {
            text: '정보 게시판 게시글3',
            path: '/'
        },
        {
            text: '정보 게시판 게시글4',
            path: '/'
        }

    ]
    const freeItems = [
        {
            text: '자유 게시판 게시글1',
            path: '/'
        },
        {
            text: '자유 게시판 게시글2',
            path: '/'
        },
        {
            text: '자유 게시판 게시글3',
            path: '/'
        },
        {
            text: '자유 게시판 게시글4',
            path: '/'
        }

    ]
    const clubItems = [
        {
            text: '동아리 게시판 게시글1',
            path: '/'
        },
        {
            text: '동아리 게시판 게시글2',
            path: '/'
        },
        {
            text: '동아리 게시판 게시글3',
            path: '/'
        },
        {
            text: '동아리 게시판 게시글4',
            path: '/'
        }

    ]
    return (
        <div className={classes.container}>
            <Grid container spacing={5} >
                <Grid item xs={12}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        공지사항
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0.2rem" }}>
                        {noticeItems.map(item => (
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

                                    }} />
                                <ListItemText primary="10분전"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        marginLeft: "90%"
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        HOT 게시물
                    </Box>
                    <List sx={{ border: "1px gray dotted" }}>
                        {hotItems.map(item => (
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

                                    }} />
                                <ListItemText primary="10분전"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        marginLeft: "70%"
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        정보 게시판
                    </Box>
                    <List sx={{ border: "1px gray dotted" }}>
                        {infoItems.map(item => (
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

                                    }} />
                                <ListItemText primary="10분전"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        marginLeft: "70%"
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1} >
                        자유 게시판
                    </Box>
                    <List sx={{ border: "1px gray dotted" }}>
                        {freeItems.map(item => (
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

                                    }} />
                                <ListItemText primary="10분전"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        marginLeft: "70%"
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                        동아리 게시판
                    </Box>
                    <List sx={{ border: "1px gray dotted" }}>
                        {clubItems.map(item => (
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
                                        width:"100%",
                                        // textOverflow:"hidden",
                                        border:"1px solid red"
                                    }} />
                                <ListItemText primary="10분전"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"40%",
                                        marginLeft:"65%",
                                        border:"1px solid red"
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