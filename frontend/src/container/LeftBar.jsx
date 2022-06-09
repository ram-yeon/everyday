import React from 'react'
import { Link } from 'react-router-dom';
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Info } from '@material-ui/icons';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ChatIcon from '@mui/icons-material/Chat';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GroupIcon from '@mui/icons-material/Group';
// import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    container: {
        // border:"2px solid red",
        paddingLeft: "0rem",
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
    // active:{
    //     background:"f4f4f4",
    // },
    menuLink: {
        textDecoration: "none",
        color: "black",
    },
}));

function LeftBar() {
    const classes = useStyles();
    // const location = useLocation();

    return <Container className={classes.container}>

        <div className={classes.item}>
            <LocalFireDepartmentIcon className={classes.icon} />
            <Typography className={classes.text}>
                <Link to='/main/hotboard' className={classes.menuLink} >HOT 게시물</Link>
            </Typography>
        </div>
        <div className={classes.item}>
            <ChatIcon className={classes.icon} />
            <Typography className={classes.text}>
                <Link to='/main/freeboard' className={classes.menuLink} >자유 게시판</Link>
            </Typography>
        </div>
        <div className={classes.item} >
            <CircleNotificationsIcon className={classes.icon} />
            <Typography className={classes.text}>
                <Link to='/main/informationboard' className={classes.menuLink} >정보 게시판</Link>
            </Typography>
        </div>
        <div className={classes.item} >
            <GroupIcon className={classes.icon} />
            <Typography className={classes.text}>
                <Link to='/main/clubboard' className={classes.menuLink} >동아리 게시판</Link>
            </Typography>
        </div>
        <div className={classes.item}>
            <Info className={classes.icon} />
            <Typography className={classes.text}>
                <Link to='/main/noticeboard' className={classes.menuLink} >공지사항</Link>
            </Typography>
        </div>

    </Container>
}

export default LeftBar