import React,{useState,useEffect} from 'react';
import {Box, Grid, Typography,Card, Button} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TokenIcon from '@mui/icons-material/Token';
export default function ActividadActual(props){
    const [actividad,SetActividad] = useState('Actividad de Prueba');
    const [descripcion,setDescripcion] = useState('Esta es una actividad de prueba, Podra obtener avances en el PROYECTO ASOCIADO. Y puntos a su perfil Las recompensas se muestran abajo');
    const [pointsAdded,setPointsAdded] = useState(200);
    const [constan,setConstan] = useState(10);
    const [proyectBind,setProyectBind] = useState('Proyecto Asociado');
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
                <Typography sx ={{textAlign:'center',width:'100%',marginTop:'5%',marginBottom:'5%'}} variant = 'h3'>
                    {actividad}
                </Typography>
                <Typography  variant="body1" sx ={{fontSize:'large', textAlign:'center',width:'80%',marginTop:'20px',marginLeft:'10%'}} >
                    {descripcion}
                </Typography>
                <Grid container direction = 'row' sx = {{width :'80%',marginLeft:'10%',marginTop:'20px'}} justifyContent = 'center' alignItems='center'>
                    <Grid item xs = {6}>
                        <Typography sx ={{textAlign:'center'}} variant = 'h5'>
                            {pointsAdded} <TokenIcon/>
                            {pointsAdded>0?
                                    <ArrowUpwardIcon/>
                                    :
                                    <ArrowDownwardIcon/>
                                }
                        </Typography>
                    </Grid>
                    <Grid item xs = {6} >
                        <Typography sx ={{textAlign:'center'}} variant = 'h5'>
                            {constan} %
                            {constan>0?
                                    <ArrowUpwardIcon/>
                                    :
                                    <ArrowDownwardIcon/>
                                }
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
                    <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#16C0A3',borderRadius:'20px'}} >
                        <Typography variant = 'h6' color = 'black' fontWeight = 'bold'>Agregar Avances</Typography>
                        </Button>
                    </Grid>
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#F3443C',borderRadius:'20px'}}  onClick ={handleEnd}>
                        <Typography variant = 'h6' color = 'black' fontWeight = 'bold'>Terminar</Typography>
                        </Button>
                    </Grid>
                </React.Fragment>
            :
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#17DF42',borderRadius:'20px'}} onClick={handleStart}>
                        <Typography variant = 'h6' color = 'black' fontWeight = 'bold'>Empezar</Typography>
                        </Button>
                    </Grid>
            }
            </Grid>

            

        </React.Fragment>
);}