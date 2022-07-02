import { Card, Grid, Button, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';


export default function AlgoQueHacer(props){
    const history = useHistory();

    const giveAnActivity =()=>{
        props.setDoingSomething(true);
    }

    return(
        <React.Fragment>
                
                <Button sx = {{width:'26vw',height:'26vw',bgcolor:'red', marginLeft:'37%',marginTop:'30px',borderRadius:'50%', 
                                ":hover":{ bgcolor:'blue'}}} onClick = {giveAnActivity}>
                    <Typography sx = {{color:'black',fontWeight:'bold'}} variant = 'h3'>
                        Dame Algo que hacer
                    </Typography>                    
                </Button>


                <Grid container  justifyContent = "center" alignItems = "center" spacing = {4} sx = {{marginTop:'20px',width:'50%',marginLeft:'25%'}} >
                    <Grid item xs = {6}  justifyContent = "center">
                        <Button sx = {{ width : '80%', height: '70px'}} color = 'success' variant="contained" onClick = {()=>{history.push('/activityQueue');}}>
                            Ver cola de Actividades
                        </Button>
                    </Grid>
                    <Grid item xs = {6} justifyContent = "center">
                        <Button sx = {{  width : '80%' , height: '70px'}} color = 'success' variant="contained">
                            Configuracion
                        </Button>
                    </Grid>
                    <Grid item xs = {6}  justifyContent = "center">
                        <Button sx = {{ width : '80%' , height: '70px'}} color = 'success' variant="contained"  onClick = {()=>{history.push('/');}}>
                            Atras
                        </Button>
                    </Grid>
                </Grid>

        </React.Fragment>
    );
}