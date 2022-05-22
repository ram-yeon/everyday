import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Info } from '@material-ui/icons';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GroupIcon from '@mui/icons-material/Group';

const useStyles = makeStyles((theme) => ({

    container: {
        height: "99vh",
        boxShadow:"0.5rem 0.5rem 2rem -1rem rgb(58, 57, 57)",
        paddingTop: theme.spacing(15),
        top:0,
        position:"sticky",
        color: "#555",
        [theme.breakpoints.down("sm")]: {
            backgroundColor: "white",
            color: "#555",
            border: "1px solid #ece7e7",
        },
    },
    item: {
        display: "flex",
        justifyContent:"right",
        marginBottom: theme.spacing(5),
        cursor: "pointer",
        // margin: "4rem auto 2rem 2rem",
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            marginLeft:"1.8rem",
        },
    },
    icon:{
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px",
        },
    },
    text: {
        fontWeight: "bold",
        
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

function LeftBar() {
    const classes = useStyles();

    return <Container className={classes.container}>
        <div className={classes.item}>
            <LocalFireDepartmentIcon className={classes.icon} />
            <Typography className={classes.text}>HOT 게시물</Typography>
        </div>
        <div className={classes.item}>
            <ChatIcon className={classes.icon} />
            <Typography className={classes.text}>자유 게시판</Typography>
        </div>
        <div className={classes.item}>
            <CircleNotificationsIcon className={classes.icon} />
            <Typography className={classes.text}>정보 게시판</Typography>
        </div>
        <div className={classes.item}>
            <GroupIcon className={classes.icon} />
            <Typography className={classes.text}>동아리 게시판</Typography>
        </div>
        <div className={classes.item}>
            <Info className={classes.icon} />
            <Typography className={classes.text}>공지사항</Typography>
        </div>
    </Container>
}

export default LeftBar