import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Container, makeStyles, Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
    container: {
        height: "99vh",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(58, 57, 57)",
        paddingTop: theme.spacing(15),
        top: 0,
        position: "sticky",
        color: "#555",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    userAccount: {
        height: "30vh",
        borderRadius: "0.3rem",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(58, 57, 57)",
        // marginRight:"2rem",
    },
    myList: {
        height: "20vh",
        borderRadius: "0.3rem",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(58, 57, 57)",
        // marginRight:"2rem",
    },

    item: {
        // display: "flex",
        textAlign:"center",
        // marginBottom: theme.spacing(5),
        // cursor: "pointer",
        // // margin: "4rem auto 2rem 2rem",
        // [theme.breakpoints.down("sm")]: {
        //     marginBottom: theme.spacing(3),
        //     cursor: "pointer",
        //     marginLeft:"1.8rem",
        // },
    },
    icon:{
        // marginRight: theme.spacing(1),
        // [theme.breakpoints.up("sm")]: {
        //     fontSize: "18px",
        // },
    },
    text: {
        // fontWeight: "bold",
        
        // [theme.breakpoints.down("sm")]: {
        //     display: "none",
        // },
    },

}));

function RightBar() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <div className={classes.userAccount}>
                
                <div className={classes.item}>
                    <AccountCircleIcon className={classes.icon} />
                    <Typography className={classes.text}>닉네임</Typography>
                    <Typography className={classes.text}>정보람</Typography>
                    <Typography className={classes.text}>cjstk4285</Typography>
                    <Button variant="outlined">로그아웃</Button>
                </div>
            </div>
            <div className={classes.myList}>
                리스트
            </div>
        </Container>
    )
}

export default RightBar
