import React,{useState,useEffect} from 'react';
import {Box, Grid, Typography, Button} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TokenIcon from '@mui/icons-material/Token';
import FileForm from '../components/fileForm';
import { getCommandsActividad } from '../speechMethods/algoQueHacerMethods';
import { useSpeechRecognition } from 'react-speech-recognition';

export default function ActividadActual(props){
    const [actividad,setActividad]  = useState(null);
    const [constan,setConstan]      = useState(10);
    const [started,setStarted]      = useState (false);
    const [evidencia,setEvidencia]  = useState(null);
    const [showForm,setShowForm]    = useState(false);
    const history = useHistory();

    const handleStart = ()=>props.startActivity();
    const handleFinalizarActividad = ()=>{
        if (actividad?.Blocked && !evidencia)
            {
                alert('Suba evidencias');
                return;
            }
        props.endActivity();
    };

    const setCurrActividad  = ()=>setActividad(props.currentActivity);
    const setCurrStarted    = ()=>setStarted(props.started);
    const setCurrEvidencia  = ()=>setEvidencia(props.evidencia);

    const handleBack = ()=>{
        if (showForm){
            setShowForm(false);
        }else{
            if (started){
                history.push('/');
            }else{
                props.setCurrentActivity(null);
            }    
        }            
    }
    
    const handleContinuar = () => {
        if (!showForm){
            handleFinalizarActividad();
        }
    };
    const limpiarEvidencia = async ()=>{setEvidencia(null);}

    const commands = getCommandsActividad({handleBack,handleContinuar,limpiarEvidencia,setShowForm});
    const {listening,transcript} = useSpeechRecognition({commands:commands});
    useEffect(()=>{
        setCurrActividad();
        setCurrStarted();
    },[]);

    useEffect(setCurrActividad,[props.currentActivity]);
    useEffect(setCurrStarted,[props.started]);
    useEffect(setCurrEvidencia,[props.evidencia]);


    return(
        <React.Fragment>    
            <Box sx = {{width:'100%'}}>
                <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {handleBack}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                </Button>
            </Box>        
            <Box sx = {{minWidth:'200px',width:'50%',borderRadius:'30px',bgcolor:'pink',marginLeft:'25%',marginTop:'5%',paddingTop:'20px',paddingBottom:'20px'}}>
                <Typography sx ={{textAlign:'center',width:'100%',marginTop:'5%',marginBottom:'5%'}} variant = 'h3'>
                    {actividad?.Titulo}
                </Typography>
                <Typography  variant="body1" sx ={{fontSize:'large', textAlign:'center',width:'80%',marginTop:'20px',marginLeft:'10%'}} >
                    {actividad?.Descripcion}
                </Typography>
                <Grid container direction = 'row' sx = {{width :'80%',marginLeft:'10%',marginTop:'20px'}} justifyContent = 'center' alignItems='center'>
                    <Grid item xs = {6}>
                        <Typography sx ={{textAlign:'center'}} variant = 'h5'>
                            {actividad?.Puntos} <TokenIcon/>
                            {actividad?.Puntos>0?
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
                <Grid container justifyContent = 'space-between' alignItems = 'right' alignContent = 'flex-end' 
                        sx = {{width:'100%',marginTop:'20px',paddingRight:'20px'}} direction='row'  >   
                {actividad?.Blocked?
                    <Typography sx = {{paddingLeft:'40px'}} variant = 'h6'>
                        Requiere subir evidencias
                    </Typography>
                    :null}
                {actividad?.ProyectoAsociado?  
                    <Typography sx ={{bgcolor:'orange',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline'}} variant = 'h6'>
                        {actividad?.ProyectoAsociado}
                    </Typography>                
                :null  }
                </Grid>
            </Box>
            

            {evidencia?
            <Typography sx = {{marginLeft:'30%',marginTop:'30px',width:'40%',bgcolor:'#C4B5FD',textAlign:'center',borderRadius:'20px'}} variant = 'h6'>
                {evidencia.tipo} : {evidencia.url} {evidencia.content?.name}
            </Typography>            
            :null}

            <Grid container justifyContent = 'space-evenly' sx = {{width:'60%',marginLeft:'20%',marginTop:'50px'}}>
            {started?
                <React.Fragment>
                    <Grid item container xs = {4}  justifyContent='center' >
                    {evidencia?
                    <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#16C0A3',borderRadius:'20px'}} onClick =  {()=>{setShowForm(true)}} >
                        <Typography variant = 'h6' color = 'black' fontWeight = 'bold'>Cambiar Evidencia</Typography>
                    </Button>  
                    :                    
                    <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#16C0A3',borderRadius:'20px'}} onClick =  {()=>{setShowForm(true)}} >
                        <Typography variant = 'h6' color = 'black' fontWeight = 'bold'>Agregar Evidencia</Typography>
                    </Button>
                    }
                    </Grid>
                    <Grid item container xs = {4}  justifyContent='center' >
                        <Button variant = 'contained'  sx = {{width:'250px',minHeight:'70px', bgcolor: '#F3443C',borderRadius:'20px'}}  onClick ={handleFinalizarActividad}>
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

            {showForm?
                <FileForm close = {()=>{setShowForm(false)}} setEvidencia = {props.setEvidencia}/>
            :
            null
            }

        </React.Fragment>
);}