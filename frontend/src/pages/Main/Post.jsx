import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
    }
}));

function Post() {
    const classes = useStyles();
    return (
        <>게시물1</>
    )
  }
  
  export default Post