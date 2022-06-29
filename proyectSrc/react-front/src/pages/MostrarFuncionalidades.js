import React, {useState} from "react";
import MicIcon from '@mui/icons-material/Mic';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { orange, red, blue, green } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';

/*
    en este archivo se mostraran las funcionalidades del software 
    - Gestion de Proyectos y objetivos.
    - Tarjetas de Repaso.
    - Dame Algo que hacer.
    - Organizador de Actividades.
*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius:'5%',
    color: theme.palette.text.secondary,
  }));


export default function MostrarFuncionalidades() {
    let history = useHistory()
    const [showFeedBack, setShowFeedBack] = useState(false)
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
            <Box mt={30} sx={{
                  width: 350,
                  height: 350,
                  zIndex:1,
                  position: 'absolute',
                }}
                >
                    {showFeedBack?
                                <Grow  timeout={1000}  in={showFeedBack}>
                                <Card  sx={{borderRadius: '5%', mx:100, minWidth: 600, border: '0.5px solid black'  }}>
                                        <CardContent>
                                            <Tooltip title="Cancelar" placement="right">
                                                    <CloseIcon onClick={(e)=>{setShowFeedBack(false)}} sx={{p:1,mx:65, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                            </Tooltip>   
                                            <Typography sx={{fontWeight: 'bold', mx:3}} variant="h4" component="div">
                                                Feedback
                                            </Typography>
                                            <Divider  variant="middle" />
                                            <Typography sx={{textAlign: 'center'}} variant="h6">
                                                Aquí podras encontrar las diversas funcionalidades de nuestro software.
                                                Como la sección de repasos, la de organizar tu activades, dame algo que hacer.
                                                y gestion de proyectos.
                                                <img style={{width:'45%', height:'45%', borderRadius: '150%'}} src="https://drive.google.com/uc?id=1KAJbi3XnjoQQnJCzd0ofRt1ODaVaXZTy"/>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grow>:null}
                    </Box>    
                    <Fade timeout={2000} in={true}>
                        <Grid container justifyContent="center" spacing={1}  columns={16}>
                                <Grid item xs={11}>
                                    <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                                            Explore Nuestras Funcionalidades
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack direction="row" spacing={3}>
                                            <QuestionMarkRoundedIcon onClick={()=>{setShowFeedBack(true)}} sx={{width: 56, height: 56, color:'white', background:'green', p:1, borderRadius:50}}/> 
                                            <MicIcon sx={{p:1, borderRadius:50, background:'red',
                                                    color:'white', width: 56, height: 56 }}/>                     
                                        </Stack>      
                                    </Grid>
                            </Grid>
                    </Fade>
                </Box>   
                <Box mt={3} sx={{flexGrow: 1  }}>
                    <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
                            <Grid container justifyContent="center"  rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                                <Grid item xs={6}>
                                    <Item>
                                    <Paper sx={{borderRadius:'5%', backgroundColor:green[700], '&:hover': {backgroundColor: green[500]}, padding: 25}}><Typography sx={{ fontSize:40, color:'white'}}>Gestione sus Proyectos</Typography></Paper>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                    <Paper onClick={()=>{history.push('/Mazos')}} sx={{borderRadius:'5%', backgroundColor:blue[700], '&:hover': {backgroundColor: blue[500]}, padding: 25}}><Typography sx={{fontSize:40, color:'white'}}>Tarjetas de Repaso</Typography></Paper>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                    <Paper sx={{borderRadius:'5%', backgroundColor:red[700], '&:hover': {backgroundColor: red[500]}, padding: 25}}><Typography sx={{fontSize:40, color:'white'}}>Dame Algo que hacer</Typography></Paper>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <Paper sx={{borderRadius:'5%', backgroundColor:orange[700], '&:hover': {backgroundColor: orange[600]},padding: 25}}><Typography sx={{fontSize:40,color:'white'}}>Organizador de Actividades</Typography></Paper>
                                    </Item>
                                </Grid>
                            </Grid>
                    </Slide>
                </Box>
        </React.Fragment>
    )
}   