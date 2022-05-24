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

function HotPost() {
    const classes = useStyles();
    return (
        <>
            <div style={{ bordeer: 'red solid 2px' }}> 공지사항</div>
            <div style={{ bordeer: 'red solid 2px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            1
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            2
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            3
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            4
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            5
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            6
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                            7
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>

    )
}

export default HotPost