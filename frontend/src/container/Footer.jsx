import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        textAlign: "right",
        width: "100%",
        height: "3rem",
        marginTop: "9rem",
        marginBottom: "1rem",
    },
    link: {
        textDecoration: "none",
        fontSize: "0.7rem",
        color: "gray",
        margin: "auto 0.5rem",
    },

}));

function Footer() {
    const classes = useStyles();
    return (

        <div className={classes.footerContainer} >
            <Link className={classes.link} to='/useterms'>이용약관</Link>
            <Link className={classes.link} to='/privacypolicy'>개인정보처리방침</Link>
            <Link className={classes.link} to='/communityrule'>커뮤니티이용규칙</Link>
            <Link className={classes.link} to='/noticeBoard'>공지사항</Link>
            <Link className={classes.link} to='/'><strong>©에브리데이</strong></Link>

        </div>

    );
}

export default Footer