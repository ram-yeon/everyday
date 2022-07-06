import React from 'react'
import { Link } from 'react-router-dom';
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Info } from '@material-ui/icons';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GroupIcon from '@mui/icons-material/Group';

import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        width: "17%",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(58, 57, 57)",
        paddingTop: theme.spacing(17),
        top: 0,
        left: 0,
        position: "fixed",
        color: "#555",
        [theme.breakpoints.down("sm")]: {
            backgroundColor: "white",
            color: "#555",
            border: "1px solid #ece7e7",
        },
    },
    item: {
        display: "flex",
        justifyContent: "right",
        marginBottom: theme.spacing(5),
        cursor: "pointer",
        // margin: "4rem auto 2rem 2rem",
        // &:hover:{
        //     background:"gray",
        // },
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            marginLeft: "1.8rem",
        },

    },

    icon: {
        marginRight: theme.spacing(1),
        // color:"#C00000",
        color: "black",
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px",
        },
    },
    text: {
        fontWeight: "bold",
        color: "black",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    menuLink: {
        textDecoration: "none",
        color: "black",
    },
}));

function LeftBar() {
    const classes = useStyles();
    let token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    return (
        <>
            {
                (tokenJson.account_authority === 'USER')                            //사용자일때,
                    ?
                    <Container className={classes.container}>
                        <Link to='/hotboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <LocalFireDepartmentIcon className={classes.icon} />
                                <Typography className={classes.text}>
                                    HOT 게시물
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/freeboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <ChatIcon className={classes.icon} />
                                <Typography className={classes.text}>
                                    자유 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/infoboard' className={classes.menuLink} >
                            <div className={classes.item} >
                                <CircleNotificationsIcon className={classes.icon} />
                                <Typography className={classes.text}>
                                    정보 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/clubboard' className={classes.menuLink} >
                            <div className={classes.item} >
                                <GroupIcon className={classes.icon} />
                                <Typography className={classes.text}>
                                    동아리 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/noticeboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <Info className={classes.icon} />
                                <Typography className={classes.text}>
                                    공지사항
                                </Typography>
                            </div>
                        </Link>
                    </Container>
                    :                                                                   //관리자일때,
                    <Container className={classes.container}>   
                        <Link to='/noticeboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <Info className={classes.icon} />
                                <Typography className={classes.text}>
                                    공지사항
                                </Typography>
                            </div>
                        </Link>
                    </Container>
            }

        </>
    );
}

export default LeftBar