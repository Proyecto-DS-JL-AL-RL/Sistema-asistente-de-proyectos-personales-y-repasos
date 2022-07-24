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
//import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
//import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './funcionalidades.css'
//import CardMedia from '@mui/material/CardMedia';
import * as ReactDOMServer from 'react-dom/server'
import mehera from './img/mehera.webp'

import { useDispatch} from 'react-redux';
import { restoreContent,changePage } from '../stores/sliceAyuda';


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
    padding: theme.spacing('1ch'),
    textAlign: 'center',
   }));



function FormRow(props) {
    
    return (
      <React.Fragment>
            <Grid item xs={6}>
                <Item>
                        <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%', backgroundColor:green[700], 
                        '&:hover': {backgroundColor: green[500],  boxShadow: '0 0 8px 8px rgba(0, 0,0 , 0.6)'}, pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/proyectos')}}>
                            <Typography sx={{textAlign:'center',fontSize:'3ch', color:'white'}}>Gestionar Proyectos</Typography>
                        </Button>
                    </Item>
                <Item>
                    <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%', 
                    backgroundColor:orange[700], '&:hover': {backgroundColor: orange[600],  boxShadow: '0 0 8px 8px rgba(0, 0,0 , 0.6)'}, 
                    pl:'20%', pr: '20%'}}
                    onClick={()=>{props.history.push('/horario')}}>
                        <Typography sx={{textAlign:'center',fontWeight: 'bold', fontSize:'3ch', color:'white'}}>Organizar Actividades</Typography>
                    </Button>
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%',backgroundColor:blue[700], 
                    '&:hover': {backgroundColor: blue[500],  boxShadow: '0 0 8px 8px rgba(0, 0,0 , 0.6)'},pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/Mazos')}} >
                        <Typography  sx={{textAlign:'center', fontSize:'3ch', color:'white'}}>Tarjetas de Repaso</Typography>
                    </Button>
                </Item>
                <Item>
                        <Button className='button-main' sx={{width:'90%', height:'40ch', borderRadius:'5%',backgroundColor:red[700], 
                        '&:hover': {backgroundColor: red[500],  boxShadow: '0 0 8px 8px rgba(0, 0,0 , 0.6)'}, pl:'20%', pr: '20%'}} onClick={()=>{props.history.push('/algoQueHacer')}}>
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
    const dispatch = useDispatch();
    //props.showAdd.setShowAnadir({card:false, icon:false});
    /* eslint-disable */

    useEffect(() => {
        props.showAdd.setShowAnadir({card:false, icon:false});
        const suggest = <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent  sx={{ flex: '1 0 auto' }}>  
                                    <Typography  sx={{fontWeight: 'bold'}} variant="h1">
                                        Sugerencia
                                    </Typography>
                                    <Divider  variant="middle" />
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Bienvenido 🤗. Aquí podras ver las funcionalidades del software.<br /> 👀 Recuerde que tiene la opción
                                        de navegar a travez de los botones de <br/> abajo  o también por nuestra interfaz de voz 🎙.  Para más 
                                        información revisar <br/> el tutorial de la interfaz de voz en la barra de la izquierda.
                                    </Typography>
                                </CardContent>
                            </Box>     
                            <img style={{width:'50%', height:'50%'}} src={mehera} alt="mehera"/>
                        </Card>
                        
        const component = ReactDOMServer.renderToString(suggest);

        dispatch(changePage({content:component,title:"Funcionalidades" }));
        


        //dispatch(changeContent(component));
        return ()=>{
            dispatch(restoreContent());
        }

      },[]);

    return (
        <React.Fragment>   
            <Fade timeout={2000} in={true}>
                                <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                                        Explore Nuestras Funcionalidades
                                </Typography>        
            </Fade>
            <Box className="container-box-funcionalidades">
                <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
                    <Grid container>
                            <Grid  item >
                                    <Box className="container-box-butttons-funcionalidades"> 
                                        <FormRow history={history}/>
                                    </Box>
                            </Grid>
                        
                    </Grid>
                </Slide>
            </Box>
        </React.Fragment>
    )
}   