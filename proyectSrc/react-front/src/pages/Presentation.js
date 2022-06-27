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

export default function Presentacion(){
    const [showPresentacion, setShowPresentacion] = useState(true)
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
                                                    <Typography sx={{fontWeight: 'bold'}}  variant = 'h3'>
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
                                                <Button sx={{borderRadius:50, p:4,                            
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
        </React.Fragment>
    );
}