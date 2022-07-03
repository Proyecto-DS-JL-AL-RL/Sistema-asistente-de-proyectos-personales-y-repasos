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
import Button from '@mui/material/Button';
import './funcionalidades.css'
    /*
    en este archivo se mostraran las funcionalidades del software 
    - Gestion de Proyectos y objetivos.
    - Tarjetas de Repaso.
    - Dame Algo que hacer.
    - Organizador de Actividades.
*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'gold',
    borderRadius:'2.5%',
    padding: theme.spacing('1ch'),
    textAlign: 'center',
   }));



function FormRow(props) {
    
    return (
      <React.Fragment>
        <Grid item xs={'5ch'}>
            <Item>
                <Button className='button-main' sx={{ width:'80ch', borderRadius:'5%', backgroundColor:green[700], '&:hover': {backgroundColor: green[500]}, padding: '20%'}}>
                    <Typography sx={{fontSize:'3ch', color:'white'}}>Gestionar Proyectos</Typography>
                </Button>
            </Item>
          <Item>
            <Button className='button-main' sx={{width:'80ch', borderRadius:'5%', backgroundColor:orange[700], '&:hover': {backgroundColor: orange[600]}, padding: '20%'}}>
                <Typography sx={{fontWeight: 'bold', fontSize:'3ch', color:'white'}}>Organizar Actividades</Typography>
            </Button>
          </Item>
        </Grid>
        <Grid item xs={'0.5vw'}>
            <Item>
                <Button className='button-main' onClick={()=>{props.history.push('/Mazos')}} sx={{width:'80ch', borderRadius:'5%', backgroundColor:blue[700], '&:hover': {backgroundColor: blue[500]}, padding: '20%'}}>
                    <Typography  sx={{fontSize:'3ch', color:'white'}}>Tarjetas de Repaso</Typography>
                </Button>
            </Item>
            <Item>
                    <Button className='button-main' sx={{width:'80ch', borderRadius:'5%', backgroundColor:red[700], '&:hover': {backgroundColor: red[500]}, padding: '20%'}}>
                        <Typography  sx={{fontSize:'3ch', color:'white'}}>Dame algo que hacer</Typography>
                    </Button>
            </Item>
        </Grid>
      </React.Fragment>
    );
  }
//<Box sx={{position:'relative', mx:'35%'}}>
//<img style={{width:'70%', height:'70%', borderRadius: '150%'}} src="https://drive.google.com/uc?id=1KAJbi3XnjoQQnJCzd0ofRt1ODaVaXZTy"/>
//</Box>
export default function MostrarFuncionalidades() {
    let history = useHistory()
    const [showFeedBack, setShowFeedBack] = useState(false)
    return (
        <React.Fragment>
            <Box sx={{ display:"flex"}}>
            <Box sx={{
                  position:'absolute',
                  justifyContent:"center",
                  zIndex:1,
                  mt:'30ch',
                  width: '10ch', 
                  height: '10ch',
                }}
                >
                    {showFeedBack?
                                <Grow  timeout={1000}  in={showFeedBack}>
                                <Card  sx={{minWidth: '500%', borderRadius: '5%', mx:'72ch', border: '0.5px solid black'  }}>
                                        <CardContent>
                                            <Tooltip title="Cancelar" placement="right">
                                                    <CloseIcon onClick={(e)=>{setShowFeedBack(false)}} sx={{p:1, mx:'93%', backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                            </Tooltip>   
                                            <Typography sx={{fontWeight: 'bold', fontsize:'1vw'}} variant="h4" component="div">
                                                Feedback
                                            </Typography>
                                            <Divider  variant="middle" />
                                            <Typography sx={{textAlign: 'left'}}  variant="h6" color="text.primary">
                                                Bienvenido 🤗. Aquí podras ver las funcionalidades del software.<b/> 👀 Recuerde que tiene la opción
                                                de navegar a travez de los botones de abajo o también por nuestra interfaz de voz 🎙. 
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
                                    <Grid item xs={'2%'}>
                                        <Stack direction="row" spacing={'5%'}>
                                            <QuestionMarkRoundedIcon onClick={()=>{setShowFeedBack(true)}} sx={{width: 56, height: 56, color:'white', background:'green', p:1, borderRadius:50}}/> 
                                            <MicIcon sx={{p:1, borderRadius:50, background:'red',
                                                    color:'white', width: 56, height: 56 }}/>                     
                                        </Stack>      
                                    </Grid>
                            </Grid>
                    </Fade>
                </Box>   
                <Box mt={'3ch'} mx={'15ch'} sx={{position:'absolute', display:'flex'  }}>
                    <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
                            <Grid  spacing={'2%'}>
                                <Grid sx={{background:'gold',p:'0.5ch', border:'5px solid black', borderRadius:'2.5%'}}>
                                    <Grid container item sx={{p:'0.5ch', border:'5px solid black', borderRadius:'2.5%'}} >
                                        <FormRow history={history}/>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Slide>
                </Box>
        </React.Fragment>
    )
}   