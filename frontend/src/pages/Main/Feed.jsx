import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Container, makeStyles } from "@material-ui/core";
import HotPost from './HotPost';
import NormalPost from './NormalPost';

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
    }
}));

function Feed() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            
            <HotPost/><HotPost/><HotPost/><HotPost/><HotPost/>
            {/* <NormalPost/> */}
            
        </Container>
    )
  }
  
  export default Feed