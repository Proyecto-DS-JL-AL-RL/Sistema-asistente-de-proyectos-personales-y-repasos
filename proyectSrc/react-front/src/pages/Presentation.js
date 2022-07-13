import React  from "react";
import { Typography } from '@mui/material';
//import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//import Zoom from '@mui/material/Zoom';
//import Slide from '@mui/material/Slide';
//import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
//import CardContent from '@mui/material/CardContent';
//import Card from '@mui/material/Card';
//import Grow from '@mui/material/Grow';
import { useHistory } from "react-router-dom";
import './presentacionPage1.css'
import Fade from '@mui/material/Fade';



//vw ch %
/*
const [showRecomendacion, setShowRecomendacion] = useState(false)

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

                 <Slide direction="up" mx={'2%'}  timeout={1000} in={true}  mountOnEnter unmountOnExit>
                                                        <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}  variant = 'h3'>
                                                            Recuerde  que puede usar la interfaz de Voz y el asistente de ayuda con los siguientes iconos
                                                        </Typography>
                                                </Slide>
                                            <Box display="flex">
                                                <Grid mx={'90ch'} container spacing={'3ch'}>
                                                    <Grid item xs={'6ch'}>
                                                            <Slide direction="up" timeout={1000} in={true}  mountOnEnter unmountOnExit>    
                                                                <MicIcon sx={{p:1, borderRadius:50, background:'red',
                                                                            color:'white', width: '6ch', height: '6ch' }}/>
                                                            </Slide>
                                                    </Grid>
                                                    <Grid item xs={'6ch'}>
                                                        <Slide direction="up" timeout={1000} in={true}  mountOnEnter unmountOnExit>
                                                        <QuestionMarkRoundedIcon sx={{width: '6ch', height: '6ch', color:'white', background:'green', p:1, borderRadius:50}}/> 
                                                        </Slide>
                                                    </Grid>
                                                </Grid>
                                            </Box>
227, 227, 227*/
export default function Presentacion(){
    let history = useHistory()
    return (
        
            <React.Fragment> 
                    <Stack spacing={3}>                                                      
                                <div>
                                    <div className="container">
                                        <div className="row">
                                        <div className="wrapper">
                                            <ul className="dynamic-txts">
                                            <li><span>Bienvenido Usuario</span></li>
                                            <li><span>Recuerda que puedes usar nuestra</span></li>
                                            <li><span>Interfaz de voz  {<MicIcon sx={{p:1, borderRadius:50, background:'red',
                                                                            color:'white', width: '3ch', height: '3ch' }}/>}</span></li>
                                            <li><span>Asistente de ayuda {<QuestionMarkRoundedIcon  sx={{width: '3ch', height: '3ch', color:'white', background:'green', p:1, borderRadius:50}}/>}</span></li>
                                            </ul>
                                        </div>
                                        <Fade direction="up" timeout={2000} in={true}>
                                                <Button onClick= {()=>{
                                                                        history.push('/')
                                                                    }}  sx={{mt:'10%' , borderRadius:'5%',                           
                                                            width: '20ch', height: '5ch',
                                                            fontWeight: 'bold',
                                                            color:'white', background:'#00b347',
                                                            fontSize:30, 
                                                            '&:hover': {backgroundColor: '#cfe619', color:'#808080'}
                                                            }} variant="contained" size="large">
                                                    <Typography  sx={{fontWeight: 'bold'}} variant = 'h5'>Continuar</Typography>
                                                </Button>
                                            </Fade>
                                        </div>
                                    </div>
                                </div>
                        </Stack>
                            
                    </React.Fragment>
                    
        
    );
}