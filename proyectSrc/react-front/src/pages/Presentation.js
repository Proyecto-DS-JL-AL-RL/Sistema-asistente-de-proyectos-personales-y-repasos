import React, {useState} from "react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';
import { useHistory } from "react-router-dom";


export default function Presentacion(){
    let history = useHistory()
    const [showPresentacion, setShowPresentacion] = useState(true)
    const [showRecomendacion, setShowRecomendacion] = useState(false)
    return (
        <React.Fragment>     
                {showPresentacion?
                    <React.Fragment> 
                            <Box mt={50} position={'static'} display="flex" justifyContent="center">
                                <Stack spacing={3}>
                                        <Zoom  timeout={1000} in={true}>
                                                <Typography sx={{fontWeight: 'bold'}}  variant = 'h3'>
                                                    Presentación de la Aplicación
                                                </Typography>
                                        </Zoom>
                                        <Zoom  timeout={1000} in={true}>
                                                <Typography justifyContent="center" sx={{fontWeight: 'bold', textAlign: 'center'}}  variant = 'h3'>
                                                    Usuario 1
                                                </Typography>
                                        </Zoom>
                                </Stack>
                            </Box>
                            <Box mt={5} sx={{
                                        position: 'static'}} display="flex" justifyContent="center">
                                        <Zoom  timeout={1000} in={true}>
                                                <Button onClick={()=>{
                                                    setShowPresentacion(false)
                                                }} sx={{borderRadius:50, p:2,                            
                                                            width: 200, height: 85,
                                                            color:'white', background:'#00b347',
                                                            fontSize:30, 
                                                            '&:hover': {backgroundColor: '#cfe619'}
                                                            }} variant="contained" size="large">
                                                    <Typography sx={{fontWeight: 'bold'}} variant = 'h5'>Empezar</Typography></Button>
                                        </Zoom>
                            </Box>
                    </React.Fragment>
                    :
                        <React.Fragment> 
                                <Box mt={40} position={'absolute'} display="flex" justifyContent="center">
                                    <Stack spacing={3}>
                                            <Slide direction="up"   timeout={1000} in={true}  mountOnEnter unmountOnExit>
                                                    <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}  variant = 'h3'>
                                                        Recuerde  que puede usar la interfaz de Voz y asistente de ayuda con los iconos
                                                    </Typography>
                                            </Slide>
                                            
                                    </Stack>
                                </Box>
                                <Box mt={60} mx={120} position={'absolute'} display="flex" justifyContent="center">
                                        <Grid container spacing={30} columns={10}>
                                            <Grid item xs={2}>
                                                    <Slide direction="up" timeout={1000} in={true}  mountOnEnter unmountOnExit>    
                                                        <MicIcon sx={{background:'red', color: 'white', borderRadius:50, p:4, width: 50, height: 50 }}/>
                                                    </Slide>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Slide direction="up" timeout={1000} in={true}  mountOnEnter unmountOnExit>
                                                    <QuestionMarkRoundedIcon sx={{p:4, background:'green', color: 'white', borderRadius:50, width: 50, height: 50 }}/>
                                                </Slide>
                                            </Grid>
                                        </Grid>
                                </Box>
                                <Box mt={90} mx={130} sx={{
                                            position: 'absolute'}} display="flex" justifyContent="center">
                                        <Slide direction="up" timeout={1000} in={true}  mountOnEnter unmountOnExit>
                                                <Button onClick= {()=>{
                                                                setShowPresentacion(false)
                                                                setShowRecomendacion(true)
                                                            }} sx={{borderRadius:50, p:4,                            
                                                            width: 200, height: 85,
                                                            color:'white', background:'#00b347',
                                                            fontSize:30, 
                                                            '&:hover': {backgroundColor: '#cfe619'}
                                                            }} variant="contained" size="large">
                                                    <Typography sx={{fontWeight: 'bold'}} variant = 'h5'>Continuar</Typography></Button>
                                        </Slide>
                                </Box>
                        </React.Fragment>
            }
            {showRecomendacion?
                <Grow  timeout={1000}  in={showRecomendacion}>
                    <Box mt={40}  position={'absolute'} justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}> 
                        <Card  sx={{mx:100, minWidth: 600, border: '0.5px solid purple'  }}>
                                <CardContent>
                                    
                                    <Typography mt={10} sx={{fontWeight: 'bold', textAlign: 'center'}} variant="h4" component="div">
                                                    Este es un mensaje de ayuda, recomendación, motivación
                                    </Typography>
                                    <Box  justifyContent="center" sx={{p:12, display: 'flex', flexWrap: 'wrap' }}> 
                                                <Button onClick={()=>{history.push('/')}} sx={{borderRadius:50, p:4,                            
                                                                    width: 200, height: 85,
                                                                    color:'white', background:'#00b347',
                                                                    fontSize:30, 
                                                                    '&:hover': {backgroundColor: '#cfe619'}
                                                                    }}>Aceptar</Button>
                                    </Box>        
                                </CardContent>
                            </Card>
                    </Box>
                </Grow>
                :null}
        </React.Fragment>
    );
}