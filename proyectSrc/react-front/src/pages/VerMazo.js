import React, {useEffect, useState} from "react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
//import Grid from '@mui/material/Grid';
import Mazos from '../components/Mazos'
//import MicIcon from '@mui/icons-material/Mic';
//import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
//import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Badge  from '@mui/material/Badge';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Grow from '@mui/material/Grow';
//import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
//import Paper from '@mui/material/Paper';
import happy from './img/gambare.webp'//proyectSrc/react-front/public
import flashcard from './img/flashcard.png'
import * as ReactDOMServer from 'react-dom/server'
import { useDispatch} from 'react-redux';
import { changeContent,restoreContent } from '../stores/sliceAyuda';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './VerMazos.css'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import {  AccountContext } from './../AccountContext';
import { useContext } from "react";
import { BACK_IP } from "../publicConstants";
import { useSpeechRecognition } from "react-speech-recognition";
import { getPageCommands } from "../speechMethods/tarjetasMethods";
import { changeTutorial, restoreContentTutorial } from "../stores/sliceTutorial";

/*
const mazos = [
  {
    id:'1',
    titulo: 'Inteligencia Artificial',
    descripcion: 'esto es un prueba porque estamos a punto de dar parcial de AI pero no estudie asi que es tu turno de colaborar.',
    Tarjetas:[{
      id: '1',
      Pregunta: '¿Que es la IA?',
      Opciones: ['Es un campo de la Botanica', 
                 'Area de la informatica que permite a las maquinas aprender',
                  'Es una palabra en ingles',
                  'N.A.'],
      Respuestas: 2
    },
    {
      id: '2',
      Pregunta: '¿Que modelo "Transformer" no fue entrenado en la estrategia del MLM (Masked Language Modeling)?',
      Opciones: ['ROBERTA', 
                 'ELECTRA',
                  'T5',
                  'BERT'],
      Respuestas: 2
    },
    {
      id: '3',
      Pregunta: 'El profesor del curso de Inteligencia Artificial te deja de trabajo final  realizar un clasificador de reviews. Para ello te provee de la data Amazon, la cual contiene tanto las reviews (Texto) como su calificación de estrellas (1 al 5), poniendote manos a la obra comienzas probando con una RNN (Recurrent Neural Networks). ¿Que tipo de Arquitectura RNN usarias?',
      Opciones: ['One to Many', 
                 'One to One',
                  'Many to Many',
                  'Many to one'],
      Respuestas: 4
    }  
    ]
  }, {
    id:'2',
    titulo: 'Seguridad informatico',
    descripcion: 'esto es una prueba del curso de seguridad',
    Tarjetas:[{
      id: '1',
      Pregunta: '¿Ques es un malware?',
      Opciones: ['Es un programa informatico que tiene como objetivo hacer dano a sistemas', 
                 'Es un tipo de inteliegencia artificial para hacer caras',
                  'Es un tipo de video juego', 
                  'N.A.'],
      Respuestas: 1
    }]
  }
  ]*///width: 900,    height: 900, <img    style={{borderRadius: '50%'}}
 // src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
 // width= "100" 
 // height="100"
 // />       const [mazos, setMazos] = useState([])
  


  export default function VerMazos(props){
        const [mazos, setMazos] = useState([])
        const dispatch = useDispatch();
        const [titulo, setTitulo] = useState('')
        const [descripcion, setDescripcion] = useState('')
        const {sessionState} = useContext(AccountContext);
        const [existMazos, setExistMazos] = useState(false)
        const [idUsersub, setidUsersub] = useState('')


        const commands = getPageCommands({setTitulo,setDescripcion});
        const {listening} = useSpeechRecognition({commands:commands});

        useEffect(()=>{
          const {sub} = sessionState;
          if (sub){
            setidUsersub(sub)
            axios.get(BACK_IP+'/api/mazos/'+sub).then(function(response){            
              
              if(typeof(response.data) === "undefined" || response.data === null || response.data.length === 0){
                setExistMazos(false)
              }else{
                setExistMazos(true)
                setMazos(response.data)
              }
            });
          }
        },[sessionState]);
        const breadcrumbs = [
          <Link underline="hover" key="1" color="inherit" href="/">
            Inicio
          </Link>,
          <Typography key="2" color="text.primary">
            Tarjetas
          </Typography>
        ]; 
        /* eslint-disable */
        useEffect(() => {
          props.showAdd.setShowAnadir({card:false, icon:true});
          const suggest = <div className='sugerencia-contenido'>
            <div className='sugenrencia-contenido-img'>
            
                <img style={{height:"12vw"}} src={happy}/>
                <div>Sugerencia</div>
            </div>
            <div className='sugerencia-contenido-descripcion'>
            Esta parte de la página esta enfocada en la funcionalidad de repasos. 🤓 Aquí 
            podra separar por temas las tarjetas 🎴 que vaya creando. Recuerde, la funcionalidad
            de repaso  <LaunchOutlinedIcon/> no se activara hasta que cree como minimo una tarjeta. Dentro de un mazo.
            </div>
        </div>

          const tuto = <div className='sugerencia-contenido'>
          <div className='sugenrencia-contenido-img'>
                  <img  src='./microphonehelp.jpg'/>
                  <div>Tutorial Interfaz de Voz </div>
              </div>
              <div className='sugerencia-contenido-descripcion-600'>
                  
                  <div className='sugerencia-descripcion-margin-subititle'>
                      Mientras agrega un mazo :
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Título [Contenido]"
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Descripción [Contenido]"
                  </div>        
                  <div className='sugerencia-descripcion-margin-subititle'>
                      Mientras agrega una tarjeta a un Mazo:
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Pregunta [Contenido]": Llena el campo de pregunta
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Opción [Numero] [Contenido]": Llena el campo de Opción (1,2,3,4)
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Respuesta [Numero]": Numero de la opción correcta
                  </div>
                  </div>
          </div>           
        
          const tutorial_ = ReactDOMServer.renderToString(tuto);
          const component = ReactDOMServer.renderToString(suggest);
          dispatch(changeContent(component));
          dispatch(changeTutorial(tutorial_));
              return ()=>{
                  dispatch(restoreContent());
                  dispatch(restoreContentTutorial());
              }                           
        },[]);

        return (
        <React.Fragment>
                <Box sx={{ flexGrow: 1}}>
                    <Fade timeout={2000} in={true}>
                              <Typography mt={6} sx={{fontWeight: 'bold'}} variant = 'h3'>
                                            Tarjetas de Repaso
                                </Typography>
                    </Fade>
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      {breadcrumbs}
                    </Breadcrumbs>
                    {props.showAdd.showAnadir.card?
                      
                      <Grow  timeout={1000}  in={props.showAdd.showAnadir.card}>
                        <Box className="mazo-add" sx={{mt:'15vh',zIndex: 1}}>
                          <Badge 
                                      badgeContent={
                                        <Tooltip title="Eliminar" placement="left">
                                            <button className='button-close' onClick={(e)=>{props.showAdd.setShowAnadir({card:false, icon:true})}}>
                                                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
                                            </button>
                                          </Tooltip>
                                      }
                                      sx={{
                                          width:'20%',
                                          height:'20%',
                                          mx:'auto',
                                          p:3,
                                          boxShadow:  '0 0 8px 8px rgba(0, 0,0 , 0.6)',
                                          borderRadius:'3%',
                                          border:'2px solid black',
                                          backgroundColor:'white',   
                                      }}
                                      
                                      >
                             
                                <Card>
                                    <CardContent>
                                          <Typography sx={{fontWeight: 'bold'}} variant="h4" component="div">
                                              Añadir Mazo
                                          </Typography>
                                          <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                              <FormControl  sx={{width: '20vw' }} variant="outlined">
                                                    <TextField  sx={{py:2}} id="outlined-basic" label="Titulo de la Sección" defaultValue = {titulo} value = {titulo} onChange={(e=>{setTitulo(e.target.value)})} variant="outlined" />
                                                    <TextField
                                                        
                                                        id="outlined-multiline-static"
                                                        label="Descripcion"
                                                        multiline
                                                        rows={4}
                                                        onChange={(e=>{setDescripcion(e.target.value)})}
                                                        defaultValue={descripcion}
                                                        value = {descripcion}
                                                      />
                                              </FormControl>
                                            </Box>
                                            <Box className="add-mazo-button">
                                                  <Tooltip title="Guardar" placement="left">
                                                    <Button onClick={()=>{
                                                            props.showAdd.setShowAnadir({card:false, icon:true})
                                                              if(mazos!== null){
                                                                axios.post(BACK_IP+'/api/mazos/', 
                                                                {
                                                                    "userSub":idUsersub,
                                                                    "Titulo": titulo,
                                                                    "Descripcion":descripcion,
                                                                    "Tarjetas": [{"Pregunta":"",
                                                                                  "Opciones":[],
                                                                                  "Respuesta": 0,
                                                                                  "Puntos":0}],
                                                                    "Puntos":0
                                                                })
                                                                setExistMazos(true)
                                                                if (mazos.length===0){
                                                                  window.location.reload(false);
                                                                }else{
                                                                  mazos.push({
                                                                        "userSub":idUsersub,
                                                                        "Titulo": titulo,
                                                                        "Descripcion":descripcion,
                                                                        "Tarjetas": [{"Pregunta":"",
                                                                                      "Opciones":[],
                                                                                      "Respuesta": 0,
                                                                                      "Puntos":0}],
                                                                        "Puntos":0
                                                                    })
                                                                  setMazos(mazos)
                                                                  setTitulo("")
                                                                  setDescripcion("")
                                                              }
                                                            }
                                                            }} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                      <SaveIcon sx={{p:1}}/>
                                                    </Button>
                                                  </Tooltip>
                                            </Box>
                                        </CardContent>
                                      </Card>
                              </Badge> 
                          </Box>
                        </Grow>:null}
                </Box>

                  {existMazos?
                      <Box>
                        <Box className="container-mazo" >
                            <Mazos className="mazo_hijo" getmazo={mazos} setMazo={setMazos} />
                        </Box>
                      </Box>:
                      <Box className="container_sinTarjeta">
                            <div className="row">
                            <Typography variant="h3" sx={{fontWeight: 'bold', textAlign:'center', component:"div"}}>Crea Un nuevo Mazo <br/></Typography>
                            <div className="conteiner-text">
                              <Typography sx={{maxWidth:'100%'}} component="div">
                                Bienvenido a la sección de repasos. Aqui podrá repasar los temas  que son de su interés.<br/>
                                Puedes usar el botón de {<AddIcon sx={{width: 40, height: 40, background:'purple', color:'white', p:1, borderRadius:50, 
                                                        '&:hover': {backgroundColor: '#6f2da8'}}}/>} para crear un mazo y/o tarjetas.
                                Así como también {<EditIcon/>}, {<DeleteIcon />}<br/>  para editar y borrar los mazos y/o tarjetas y finalmente { <LaunchOutlinedIcon/>}
                                para iniciar un repaso.<br/>
                                Por defecto cuando crees un mazo se creara una tarjeta 🎴 que podras usar.
                              </Typography>
                          </div>
                        </div>
                    <img className="flashcard" src={flashcard} alt="flashcard"/>      
                  </Box>
                }
        </React.Fragment>
    );
}//aca