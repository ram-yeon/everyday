import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Container, makeStyles } from "@material-ui/core";
import MainBoard from './Board/MainBoard';
import Board from './Board/Board';
import UseTerms from './Footer/UseTerms';
import PrivacyPolicy from './Footer/PrivacyPolicy';
import CommunityRule from './Footer/CommunityRule';

const useStyles = makeStyles((theme) => ({
    container:{
        paddingLeft:"0rem",
        margin: "8rem 4rem",
        textAlign:"center",
        [theme.breakpoints.down("sm")]: {
            margin: "3rem auto auto 2rem",
        },
        
        
    }
}));

function Feed() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            
            <MainBoard/>
            {/* <Board/> */}
            {/* <UseTerms />
            <CommunityRule/>
            <PrivacyPolicy/> */}
            
        </Container>
    )
  }
  
  export default Feed