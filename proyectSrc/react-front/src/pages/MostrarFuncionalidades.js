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
//import Divider from '@mui/material/Divider';
//import Tooltip from '@mui/material/Tooltip';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
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
import { changeTutorial, restoreContentTutorial } from "../stores/sliceTutorial";


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
        const suggest = <div className='sugerencia-contenido'>
        <div className='sugenrencia-contenido-img'>
                <img style={{height:"12vw"}} src={mehera}/>
                <div>Sugerencia</div>
            </div>
            <div className='sugerencia-contenido-descripcion'>
                Bienvenido 🤗. Aquí podras ver las funcionalidades del software. 👀 Recuerde que tiene la opción
                de navegar a travez de los botones o también por nuestra interfaz de voz 🎙.  Para más 
                información revisar  el tutorial de la interfaz de voz en la barra de la izquierda.
           </div>
        </div>
        const tuto = <div className='sugerencia-contenido'>
        <div className='sugenrencia-contenido-img'>
                <img  src='./microphonehelp.jpg'/>
                <div>Tutorial Interfaz de Voz </div>
            </div>
            <div className='sugerencia-contenido-descripcion-600'>
                
                <div className='sugerencia-descripcion-margin-subititle'>
                    Navegación:
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Pruebe decir el titulo de las funcionalidades mostrado en los recuadros para dirigirte a ellos
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Puedes volver aqui diciendo "Llevame a inicio"
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Existen otras frases para cada funcionalidad, además que no tienen que ser dichas de forma perfecta.
                </div>        
                <div className='sugerencia-descripcion-margin'>
                    Podrá usar los comandos de navegación en cualquier momento y lugar de la aplicación
                </div>
                <div className='sugerencia-descripcion-margin'>
                    El microfono se mantendrá escuchando mientras siga hablando. Si deja de hablar este se apagará automaticamente. 
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Debajo del microfono podra ver un texto que muestra las palabras que va diciendo.
                </div>
                </div>
        </div>                        


        const component = ReactDOMServer.renderToString(suggest);
        const tutorial_ = ReactDOMServer.renderToString(tuto);

        dispatch(changePage({content:component,title:"Funcionalidades" }));
        dispatch(changeTutorial(tutorial_));

        //dispatch(changeContent(component));
        return ()=>{
            dispatch(restoreContent());
            dispatch(restoreContentTutorial());
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