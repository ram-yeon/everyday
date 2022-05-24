import React, { useState } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import { Grid, makeStyles } from "@material-ui/core";
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import Feed from './Feed';

const useStyles = makeStyles((theme) => ({
  right:{
    [theme.breakpoints.down("sm")]: {
      display:"none"
  },
  },

}));

function Main() {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <LeftBar/>
        </Grid>
        <Grid item sm={8} xs={10}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );

}

export default Main