import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
    }
}));

function NormalPost() {
    const classes = useStyles();
    return (
        <div style={{border:"2px solid red", width:"100%", height:"50vh"}}>

        </div>
    )
}

export default NormalPost