import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Container, makeStyles } from "@material-ui/core";
import Post from './Post';

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
    }
}));

function Feed() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            
        </Container>
    )
  }
  
  export default Feed