import React, { useHistory, useLocation } from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const useStyles = makeStyles((theme) => ({
    container: {
        // margin: "4rem 6rem",
        // [theme.breakpoints.down("sm")]: {
        //     margin: "3rem auto auto 2rem",
        // },
    },
    link: {
        textDecoration:"none",
        color:"black",
    },
}));



function MainBoard() {
    const classes = useStyles()
    // const history = useHistory()
    // const location = useLocation()

    const noticeItems = [
        {
            text: '첫번째 공지 이다아앙가악이다아앙가악이다아앙가악이다아앙가악이다아앙가악',
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
            text: 'hot 게시물1 al소ㅑㄹ랄소ㅑㄹㄹ라소ㅑ랄',
            path: '/'
        },
        {
            text: 'hot 게시물2 ㄴㅇㄻㅇㅎㅁㅎㅁㄴㅇㅎ',
            path: '/'
        },
        {
            text: 'hot 게시물3 블라블라블라블라우알라',
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
                        <Link to='/main/noticeboard' className={classes.link}>공지사항</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                                        width:"20rem",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis", 
                                        // border:"solid 2px red"
                                    }} />
                                <ListItemText primary="20/02/12/ 21:42"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"3rem",
                                        marginLeft:"82%",
                                        
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                    <Link to='/main/board' className={classes.link}>HOT 게시물</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                                        width:"10rem",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis", 
                                        
                                    }} />
                                <ListItemText primary="20/02/12/ 21:42"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"3rem",
                                        marginLeft:"65%",
                                        
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                    <Link to='/main/board' className={classes.link}>정보 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                                        width:"10rem",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis", 
                                        
                                    }} />
                                <ListItemText primary="20/02/12/ 21:42"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"3rem",
                                        marginLeft:"65%",
                                        
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1} >
                    <Link to='/main/board' className={classes.link} name="자유 게시판">자유 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                                        width:"10rem",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis", 
                                        
                                    }} />
                                <ListItemText primary="20/02/12/ 21:42"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"3rem",
                                        marginLeft:"65%",
                                        
                                    }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box border="2px black solid" color="black" fontWeight="bold" p={1}>
                    <Link to='/main/board' className={classes.link}>동아리 게시판</Link>
                    </Box>
                    <List sx={{ border: "1px gray dotted", borderRadius: "0rem 0rem 1rem 1rem" }}>
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
                                        width:"10rem",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis", 
                                        
                                    }} />
                                <ListItemText primary="20/02/12/ 21:42"
                                    primaryTypographyProps={{
                                        color: 'gray',
                                        fontSize: '0.5rem',
                                        width:"3rem",
                                        marginLeft:"65%",
                                        
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