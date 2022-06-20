import React from 'react';
import { Grid , Card, Typography } from '@mui/material';

export default function ProyectoView(){


    return (
        <React.Fragment>
            <Grid container sx = {{bgcolor: 'blue', height : '100%'}} alignItems = "center" justifyContent= "center" direction = 'column' spacing = {2}>
                <Grid item container xs = {1}>
                    <Typography variant = 'h4'>
                        Titulo
                    </Typography>
                </Grid>
                <Grid container item xs = {5} sx = {{bgcolor: 'red', width : '100%'}} direction = 'row' columnGap = {15} rowGap ={2} justifyContent = "center">
                    <Grid item xs = {12} md = {12} sm={12} lg ={5} xl = {6}>
                        <Card sx = {{height: '100%',width: '100%'}}>
                            XD
                        </Card>
                    </Grid>
                    <Grid item xs = {12} md = {12} sm = {12} lg = {5} xl = {5}>
                        <Card sx = {{height: '100%',width: '100%'}}>
                            XD
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item xs = {6} sx = {{bgcolor: 'red'}}>
                    <Card sx = {{height: '100%',width: '100%'}}>
                        XD
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}