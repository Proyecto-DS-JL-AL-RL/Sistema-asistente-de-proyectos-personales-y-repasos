import React, {useState} from "react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Mazos from '../components/Mazos'
import MicIcon from '@mui/icons-material/Mic';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import AddIcon from '@mui/icons-material/Add';
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
      Respuestas: 'Area de la informatica que permite a las maquinas aprender'
    },
    {
      id: '2',
      Pregunta: '¿Que modelo "Transformer" no fue entrenado en la estrategia del MLM (Masked Language Modeling)?',
      Opciones: ['ROBERTA', 
                 'ELECTRA',
                  'T5',
                  'BERT'],
      Respuestas: 'ELECTRA'
    },
    {
      id: '3',
      Pregunta: 'El profesor del curso de Inteligencia Artificial te deja de trabajo final  realizar un clasificador de reviews. Para ello te provee de la data Amazon, la cual contiene tanto las reviews (Texto) como su calificación de estrellas (1 al 5), poniendote manos a la obra comienzas probando con una RNN (Recurrent Neural Networks). ¿Que tipo de Arquitectura RNN usarias?',
      Opciones: ['One to Many', 
                 'One to One',
                  'Many to Many',
                  'Many to one'],
      Respuestas: 'Many to one'
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
      Respuestas: 'Es un programa informatico que tiene como objetivo hacer dano a sistemas'
    }]
  }
  ]//width: 900,    height: 900, <img    style={{borderRadius: '50%'}}
 // src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
 // width= "100" 
 // height="100"
 // /> 


  export default function VerMazos(){
    const [showAnadir, setShowAnadir] = useState(false)
    const [showFeedBack, setShowFeedBack] = useState(false)
        return (
        <React.Fragment>
                <Box sx={{ flexGrow: 1}}>
                <Fade timeout={2000} in={true}>
                          <Typography mx={10} mt={6} sx={{fontWeight: 'bold'}} variant = 'h3'>
                                        Tarjetas de Repaso
                            </Typography>
                </Fade>
                <Fade timeout={2000} in={true}>
                            <Grid container spacing={1}  columns={6}>
                              <Grid item xs={2} ml={220} mt={-5}>
                                  <MicIcon sx={{p:1, borderRadius:50, background:'red',
                                                color:'white', width: 56, height: 56 }}/>
                              </Grid>
                              <Grid item xs={2} ml={230} mt={-13.4}>
                                        <QuestionMarkRoundedIcon onClick={()=>{setShowFeedBack(true)}} sx={{width: 56, height: 56, color:'white', background:'green', p:1, borderRadius:50}}/>
                              </Grid>
                              <Grid item ml={245} mt={-13}>
                              <Tooltip title="añadir" placement="right">
                                  <AddIcon onClick={()=>{setShowAnadir(true)}} mx={2} sx={{width: 56, height: 56, background:'purple', color:'white', p:1, borderRadius:50, '&:hover': {backgroundColor: '#6f2da8'}}}/>                            
                                  </Tooltip>
                                </Grid>
                            </Grid>
                      </Fade>
                    </Box>
                          
                    <Box  sx={{
                        width: 350,
                        height: 350,
                        zIndex:1,
                        position: 'absolute',
                      }}
                      >
                  {showAnadir?
                        <Grow  timeout={1000}  in={showAnadir}>
                          <Box  justifyContent="center" sx={{mx:'200%', width: '200%', position:'absolute', mt:'4%', display: 'flex'}}> 
                                  <Card  sx={{borderRadius: '3%',  width: '160%', border: '0.5px solid black'}}>
                                      <CardContent>
                                          <Tooltip title="Cancelar" placement="right">
                                              <Button sx={{mx:'90%'}} onClick={(e)=>{setShowAnadir(false)}}>
                                                      <CloseIcon  sx={{p:1, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                              </Button>
                                          </Tooltip>   
                                            <Typography sx={{fontWeight: 'bold', mx:3}} variant="h4" component="div">
                                                Añadir Sección
                                            </Typography>
                                            <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                                      <TextField sx={{py:2}} id="outlined-basic" label="Titulo de la Sección" defaultValue= {''} variant="outlined" />
                                                      <TextField
                                                          id="outlined-multiline-static"
                                                          label="Descripcion"
                                                          multiline
                                                          rows={4}
                                                          defaultValue={''}
                                                        />
                                                </FormControl>
                                              </Box>
                                              <Box  justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                                    <Tooltip title="Guardar" placement="left">
                                                      <Button onClick={()=>{setShowAnadir(false)}} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                        <SaveIcon sx={{p:1}}/>
                                                      </Button>
                                                    </Tooltip>
                                              </Box>
                                      </CardContent>
                                </Card>
                            </Box>
                          </Grow>:null}

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
                                        Esta parte de la página esta enfocada en la funcionalidad de repasos. Aquí 
                                        podra separar por temas las tarjetas que vaya creando. 
                                        <img style={{width:'50%', height:'50%', borderRadius: '150%'}} alt='emoji' src="https://drive.google.com/uc?id=18BAWHAawYBjUCRmxZyrf_O4_fqRJKUk6"/> 
                                      </Typography>
                                  </CardContent>
                            </Card>
                          </Grow>:null}
                  </Box> 
                  <Box sx={{mx:'12%',
                            position:'absolute',
                              width: '65%'}}>
                          <Mazos getmazo={mazos} />
                  </Box>
        </React.Fragment>
    );
}