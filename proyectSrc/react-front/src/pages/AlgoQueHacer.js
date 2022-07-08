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
                
                <Button sx = {{width:'26vw',height:'26vw',bgcolor:'#EA2B2B', marginLeft:'37%',marginTop:'30px',borderRadius:'50%', 
                                ":hover":{ bgcolor:'#9C1818'}}} onClick = {giveAnActivity}>
                    <Typography sx = {{color:'black',fontWeight:'bold'}} variant = 'h3'>
                        Dame Algo que hacer
                    </Typography>                    
                </Button>


                <Grid container  justifyContent = "center" alignItems = "center" spacing = {4} sx = {{marginTop:'20px',width:'50%',marginLeft:'25%'}} >
                    <Grid item xs = {6}  justifyContent = "center">
                        <Button sx = {{ width : '80%', height: '70px',borderRadius:'30px',bgcolor:'#C4B5FD'}} variant="contained" onClick = {()=>{history.push('/activityQueue');}}>
                            <Typography color = 'black' variant = 'h5' fontWeight = 'bold'>
                            Ver cola de Actividades
                            </Typography>                            
                        </Button>
                    </Grid>
                    <Grid item xs = {6} justifyContent = "center">
                        <Button sx = {{ width : '80%', height: '70px',borderRadius:'30px',bgcolor:'#C4B5FD'}} variant="contained">
                            <Typography color = 'black' variant = 'h5' fontWeight = 'bold'>
                            Configuracion
                            </Typography>                             
                        </Button>
                    </Grid>
                    <Grid item xs = {6}  justifyContent = "center">
                        <Button sx = {{ width : '80%', height: '70px',borderRadius:'30px',bgcolor:'#C4B5FD'}} variant="contained" onClick = {()=>{history.push('/');}}>
                            <Typography color = 'black' variant = 'h5' fontWeight = 'bold'>
                                Atras
                            </Typography> 
                        </Button>
                    </Grid>
                </Grid>

        </React.Fragment>
    );
}