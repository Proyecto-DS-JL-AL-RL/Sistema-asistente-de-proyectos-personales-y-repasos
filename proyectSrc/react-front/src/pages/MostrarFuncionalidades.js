import React, {useEffect} from "react";
//import MicIcon from '@mui/icons-material/Mic';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { orange, red, blue, green } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
//import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
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
import mehera from './img/mehera.webp'
    /*
    en este archivo se mostraran las funcionalidades del software 
    - Gestion de Proyectos y objetivos.
    - Tarjetas de Repaso.
    - Dame Algo que hacer.
    - Organizador de Actividades.
*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'#BDBEC3',
    borderRadius:'2.5%',
    padding: theme.spacing('2ch'),
    textAlign: 'center',
   }));



function FormRow(props) {
    
    return (
      <React.Fragment>
            <Grid item xs={6}>
                <Item>
                    <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%', backgroundColor:green[700], '&:hover': {backgroundColor: green[500]}, pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/proyect')}}>
                        <Typography sx={{textAlign:'center',fontSize:'3ch', color:'white'}}>Gestionar Proyectos</Typography>
                    </Button>
                </Item>
            <Item>
                <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%', backgroundColor:orange[700], '&:hover': {backgroundColor: orange[600]}, pl:'20%', pr: '20%'}}>
                    <Typography sx={{textAlign:'center',fontWeight: 'bold', fontSize:'3ch', color:'white'}}>Organizar Actividades</Typography>
                </Button>
            </Item>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%',backgroundColor:blue[700], '&:hover': {backgroundColor: blue[500]},pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/Mazos')}} >
                        <Typography  sx={{textAlign:'center', fontSize:'3ch', color:'white'}}>Tarjetas de Repaso</Typography>
                    </Button>
                </Item>
                <Item>
                        <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%',backgroundColor:red[700], '&:hover': {backgroundColor: red[500]}, pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/algoQueHacer')}}>
                            <Typography  sx={{textAlign:'center', fontSize:'3ch', color:'white'}}>Dame algo que hacer</Typography>
                        </Button>
                </Item>
            </Grid>
      </React.Fragment>
    );
  }
//<Box sx={{position:'relative', mx:'35%'}}>https://drive.google.com/file/d/1_TKt7P1dnaL9_rkCWTqj5QkEGMOO62cN/view?usp=sharing
//<img style={{width:'70%', height:'70%', borderRadius: '150%'}} src="https://drive.google.com/uc?id=1_TKt7P1dnaL9_rkCWTqj5QkEGMOO62cN"/>
//</Box>
export default function MostrarFuncionalidades(props) {
    let history = useHistory()
    
    //props.showAdd.setShowAnadir({card:false, icon:false});
    /* eslint-disable */
    useEffect(() => {
        props.showAdd.setShowAnadir({card:false, icon:false});
      },[]);

    return (
        <React.Fragment>
            <Box sx={{ display:"flex"}}>
            <Box sx={{
                  position:'absolute',
                  justifyContent:"center",
                  zIndex:1,
                  mt:'15ch',
                  width: '10ch', 
                  height: '10ch',
                }}
                >
                    {props.showFuncionalidades.showFeedBack.card?
                                <Grow  timeout={1000}  in={props.showFuncionalidades.showFeedBack.card}>
                                    <Card  sx={{position:'absolute',minWidth: '600%', mx:'825%', border: '0.5px solid black'  }}>
                                            <CardContent>
                                                <Tooltip title="Cancelar" placement="right">
                                                        <CloseIcon onClick={(e)=>{props.showFuncionalidades.setShowFeedBack({card:false, icon:false})}} sx={{p:1, mx:'93%', backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                                </Tooltip>   
                                                <Typography sx={{fontWeight: 'bold', fontsize:'1vw'}} variant="h4" component="div">
                                                    Sugerencia
                                                </Typography>
                                                <Divider  variant="middle" />
                                                <Typography sx={{textAlign: 'center'}}  variant="h6" color="text.primary">
                                                    Bienvenido 🤗. Aquí podras ver las funcionalidades del software.<b/> 👀 Recuerde que tiene la opción
                                                    de navegar a travez de los botones de abajo o también por nuestra interfaz de voz 🎙. 
                                                </Typography>
                                                <img style={{width:'50%', height:'50%'}} src={mehera} alt="mehera"/>
                                            </CardContent>
                                            
                                        </Card>
                                </Grow>:null}
                    </Box>    
                    <Fade timeout={2000} in={true}>
                                    <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                                            Explore Nuestras Funcionalidades
                                    </Typography>
                            
                    </Fade>
                </Box>   
                <Box mt={'3%'} ml={'17%'}>
                    <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
                            <Grid   container spacing={'2%'}>
                                    <Grid  item >
                                            <Box flexWrap={'wrap'} sx={{height:'100%', width:'190%',background:'#BDBEC3',border:'5px solid black', borderRadius:'2.5ch', display: 'flex'}}> 
                                                <FormRow history={history}/>
                                            </Box>
                                    </Grid>
                                
                        </Grid>
                    </Slide>
                </Box>
        </React.Fragment>
    )
}   