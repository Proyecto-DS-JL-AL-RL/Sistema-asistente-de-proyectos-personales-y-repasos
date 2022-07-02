import React,{useState,useEffect} from 'react';
import {Box, Grid, Typography,Card, Button} from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function ActividadActual(props){
    const [actividad,SetActividad] = useState('pruebas');
    const [descripcion,setDescripcion] = useState('asdddddasdddddasdddd dasdddddasdd dddasdddddasddd ddasddddda sdddddasdddddasddd ddasdd dasdddddas dddddasddddd');
    const [pointsAdded,setPointsAdded] = useState('200');
    const [constan,setConstan] = useState('10%');
    const [proyectBind,setProyectBind] = useState('Proyecto XDs');
    const [started,setStarted] = useState (false);
    const history = useHistory();


    const handleStart=()=>{
        setStarted(true);
    };

    const handleEnd = ()=>{
        props.setDoingSomething(false);
    };

    return(
        <React.Fragment>            
            <Box sx = {{minWidth:'200px',width:'50%',borderRadius:'30px',bgcolor:'pink',marginLeft:'25%',marginTop:'5%',paddingTop:'20px',paddingBottom:'20px'}}>
                <Typography sx ={{textAlign:'center',width:'100%',marginTop:'5%',marginBottom:'5%'}} variant = 'h4'>
                    {actividad}
                </Typography>
                <Typography  variant="body1" sx ={{textAlign:'center',width:'80%',marginTop:'20px',marginLeft:'10%'}} >
                    {descripcion}
                </Typography>
                <Grid container direction = 'row' sx = {{width :'80%',marginLeft:'10%',marginTop:'20px'}} justifyContent = 'center' alignItems='center'>
                    <Grid item xs = {6}>
                        <Typography sx ={{textAlign:'center'}} variant = 'h6'>
                            {pointsAdded}
                        </Typography>
                    </Grid>
                    <Grid item xs = {6} >
                        <Typography sx ={{textAlign:'center'}} variant = 'h6'>
                            {constan}
                        </Typography>
                    </Grid>
                </Grid>

                {proyectBind?
                <Grid container justifyContent = 'right' alignItems = 'right' alignContent = 'flex-end' 
                        sx = {{width:'100%',marginTop:'20px',paddingRight:'20px'}} direction='row'  >
                    <Typography sx ={{bgcolor:'orange',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline'}} variant = 'h6'>
                        {proyectBind}
                    </Typography>
                </Grid>
                :
                null
                }
            </Box>

            <Grid container justifyContent = 'space-evenly' sx = {{width:'60%',marginLeft:'20%',marginTop:'50px'}}>
            {started?
                <React.Fragment>
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained' color = 'success' sx = {{width:'250px'}}>
                            <Typography variant = 'h6'>Agregar Avances</Typography>
                        </Button>
                    </Grid>
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained' color = 'success' sx = {{width:'250px',minHeight:'70px'}} onClick ={handleEnd}>
                        <Typography variant = 'h6'>Terminar</Typography>
                        </Button>
                    </Grid>
                </React.Fragment>
            :
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained' color = 'success' sx = {{width:'250px',minHeight:'70px'}} onClick={handleStart}>
                        <Typography variant = 'h6'>Empezar</Typography>
                        </Button>
                    </Grid>
            }
            </Grid>

        </React.Fragment>
);}