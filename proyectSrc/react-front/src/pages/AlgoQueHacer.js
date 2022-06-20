import { Card, Grid, Button, Typography } from '@mui/material';
import React from 'react';


export default function AlgoQueHacer(){



    return(
        <React.Fragment>
            <Grid container sx = {{bgcolor: 'red', height:'100%'}} direction = 'column' justifyContent = "center" alignItems = "center">
                <Grid item container xs = {7} sx = {{bgcolor: 'blue'}}   justifyContent = "center" alignItems = "center">
                    <Button sx = {{ height: '80%', width : '50%' , borderRadius: '50%'}} color = 'success' variant="contained">
                        <Typography variant = 'h2'>
                            Abc3
                        </Typography>
                    </Button>
                </Grid>
                <Grid item container xs = {4}  justifyContent = "center" alignItems = "center" spacing = {4}>
                    <Grid item xs = {3}  justifyContent = "center">
                        <Button sx = {{ width : '80%', height: '70px'}} color = 'success' variant="contained">
                            Abc1
                        </Button>
                    </Grid>
                    <Grid item xs = {3} justifyContent = "center">
                        <Button sx = {{ width : '80%' , height: '70px'}} color = 'success' variant="contained">
                            Abc2
                        </Button>
                    </Grid>
                    <Grid item xs = {3}  justifyContent = "center">
                        <Button sx = {{ width : '80%' , height: '70px'}} color = 'success' variant="contained">
                            Abc3
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}