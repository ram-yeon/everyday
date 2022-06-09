import React from 'react';
import { Grid } from '@material-ui/core';
import AfterLoginRouter from '../AfterLoginRouter';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import Footer from './Footer';

function AfterLoginContainer() {
    
    return (
        <div>
            <NavBar />
            <Grid container>
                    <Grid item sm={2} xs={2}>
                        <LeftBar />
                    </Grid>
                <Grid item sm={8} xs={10} style={{ margin: '10rem auto auto 100px' }}>
                    <AfterLoginRouter/>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default AfterLoginContainer