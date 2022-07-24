import { Grid, Button, Typography ,Box} from '@mui/material';
import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import axios from 'axios';

export default function AlgoQueHacer(props){
    const history = useHistory();
    const { sessionState } = useContext( AccountContext );   

    const giveAnActivity = async () =>{
        props.giveAnActivity();
    }
    
    return(
        <React.Fragment>
                <Box sx = {{width:'100%'}}>
                    <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {()=>{history.push('/')}}>
                            <Typography color = 'black' sx = {{fontWeight : 'bold'}} value = 'Back'>
                                Back
                            </Typography>
                    </Button>
                </Box>

                <Button sx = {{width:'26vw',height:'26vw',bgcolor:'#EA2B2B', marginLeft:'35%',marginTop:'30px',borderRadius:'50%', 
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
                </Grid>

        </React.Fragment>
    );
}