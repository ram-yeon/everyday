import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';

import { Container, makeStyles, Typography } from "@material-ui/core";

import { Info } from '@material-ui/icons';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            marginLeft: "1.8rem",
        },
    },
    hotIcon: {
        marginRight: theme.spacing(1),
        color: "#C00000",
    },
    freeIcon: {
        marginRight: theme.spacing(1),
        color: "#7FBEFF",
    },
    infoIcon: {
        marginRight: theme.spacing(1),
        color: "#FFD300",
    },
    clubIcon: {
        marginRight: theme.spacing(1),
        color: "black",
    },
    noticeIcon: {
        marginRight: theme.spacing(1),
        color: "gray",
    },
    text: {
        fontWeight: "bold",
        color: "black",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
        "&:hover": {
            color: '#C00000',
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
    const navigate = useNavigate();

    const clickHotBoard = () => {
        if (tokenJson.authorities[0].authority === 'ROLE_BASIC') {
            alert("HOT 게시물을 보려면 등급 업그레이드가 필요합니다.\n(조건: 좋아요10개, 댓글5개 이상)");
        } else
            navigate('/hotboard');
    };

    return (
        <>
            {
                (tokenJson.account_authority === 'USER')                            //사용자일때,
                    ?
                    <Container className={classes.container}>
                        <span className={classes.menuLink} onClick={() => clickHotBoard()}>
                            <div className={classes.item}>
                                <LocalFireDepartmentIcon className={classes.hotIcon} />
                                <Typography className={classes.text}>
                                    HOT 게시물
                                </Typography>
                            </div>
                        </span>

                        <Link to='/freeboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <ChatIcon className={classes.freeIcon} />
                                <Typography className={classes.text}>
                                    자유 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/infoboard' className={classes.menuLink} >
                            <div className={classes.item} >
                                <CircleNotificationsIcon className={classes.infoIcon} />
                                <Typography className={classes.text}>
                                    정보 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/clubboard' className={classes.menuLink} >
                            <div className={classes.item} >
                                <GroupIcon className={classes.clubIcon} />
                                <Typography className={classes.text}>
                                    동아리 게시판
                                </Typography>
                            </div>
                        </Link>

                        <Link to='/noticeboard' className={classes.menuLink} >
                            <div className={classes.item}>
                                <Info className={classes.noticeIcon} />
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
                                <Info className={classes.noticeIcon} />
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