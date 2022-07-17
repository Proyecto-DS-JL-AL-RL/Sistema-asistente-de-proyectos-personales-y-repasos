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
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
//import Paper from '@mui/material/Paper';
import happy from './img/happy.png'
import * as ReactDOMServer from 'react-dom/server'
import { useDispatch} from 'react-redux';
import { changeContent,restoreContent } from '../stores/sliceAyuda';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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
          
          const suggest = <Card  sx={{ mx:100, minWidth: 600, border: '0.5px solid black'  }}>
                              <CardContent>
                                    <Typography  sx={{fontWeight: 'bold'}} variant="h1">
                                        Sugerencia
                                    </Typography>
                                    <Divider  variant="middle" />
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                      Esta parte de la página esta enfocada en la funcionalidad de repasos. 🤓<br /> Aquí 
                                      podra separar por temas las tarjetas 🎴 que vaya creando. 
                                    </Typography>
                                    <img style={{width:'40%', height:'40%'}} alt='emoji' src={happy}/>
                                </CardContent>
                          </Card>
          const component = ReactDOMServer.renderToString(suggest);
          dispatch(changeContent(component));
              return ()=>{
                  dispatch(restoreContent());
              }                           
        },[]);

        useEffect(()=>{
          axios.get('/api/mazos/1').then(function(response){
            setMazos(response.data)
        });
        }, [])

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
                </Box>
                          
                    <Box  sx={{
                        width: 350,
                        height: 350,
                        zIndex:1,
                        position: 'absolute',
                      }}
                      >
                  {props.showAdd.showAnadir.card?
                        <Grow  timeout={1000}  in={props.showAdd.showAnadir.card}>
                          <Box  justifyContent="center" sx={{mx:'200%', width: '200%', position:'absolute', mt:'4%', display: 'flex'}}> 
                                  <Card  sx={{borderRadius: '3%',  width: '160%', border: '0.5px solid black'}}>
                                      <CardContent>
                                          <Tooltip title="Cancelar" placement="right">
                                              <Button sx={{mx:'90%'}} onClick={(e)=>{props.showAdd.setShowAnadir({card:false, icon:true})}}>
                                                      <CloseIcon  sx={{p:1, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                              </Button>
                                          </Tooltip>   
                                            <Typography sx={{fontWeight: 'bold', mx:3}} variant="h4" component="div">
                                                Añadir Mazo
                                            </Typography>
                                            <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                                      <TextField sx={{py:2}} id="outlined-basic" label="Titulo de la Sección" defaultValue = {titulo} onChange={(e=>{setTitulo(e.target.value)})} variant="outlined" />
                                                      <TextField
                                                          id="outlined-multiline-static"
                                                          label="Descripcion"
                                                          multiline
                                                          rows={4}
                                                          onChange={(e=>{setDescripcion(e.target.value)})}
                                                          defaultValue={descripcion}
                                                        />
                                                </FormControl>
                                              </Box>
                                              <Box  justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                                    <Tooltip title="Guardar" placement="left">
                                                      <Button onClick={()=>{
                                                              props.showAdd.setShowAnadir({card:false, icon:true})
                                                                axios.post('/api/mazos/', 
                                                                {
                                                                    "UserID":"1",
                                                                    "Titulo": titulo,
                                                                    "Descripcion":descripcion,
                                                                    "Tarjetas": [{"Pregunta":"",
                                                                                  "Opciones":[],
                                                                                  "Respuesta": 0}]
                                                                })
                                                                window.location.reload(false);
                                                              }} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                        <SaveIcon sx={{p:1}}/>
                                                      </Button>
                                                    </Tooltip>
                                              </Box>
                                      </CardContent>
                                </Card>
                            </Box>
                          </Grow>:null}
                      </Box> 
                  <Box sx={{mx:'12%',
                            position:'absolute',
                              width: '65%'}}>
                          <Mazos  getmazo={mazos} setMazo={setMazos} />
                  </Box>
        </React.Fragment>
    );
}//aca