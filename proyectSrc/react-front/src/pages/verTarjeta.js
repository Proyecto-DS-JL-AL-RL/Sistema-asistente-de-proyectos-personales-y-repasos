import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import './funcionalidades.css'
import Grow from '@mui/material/Grow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import gambare from './img/gambare.webp'

const mazo = {
  id:'1',
  titulo: 'Inteligencia Artificial',
  descripcion: 'esto es un prueba porque estamos a punto de dar parcial de AI pero no estudie asi que es tu turno de colaborar.',
  Tarjetas:[{
    id: '1',
    Pregunta: '¿Que es la Inteligencia Artificial?',
    Opciones: ['Es un campo de la Botanica', 
               'Área de la informática que permite a las máquinas aprender',
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
}

const Opt = styled(Paper)(({ theme }) => ({
  background:'#c8a2b5',
  width: '90%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  
}));

export default function VerTarjeta(props) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  /* eslint-disable */
  useEffect(() => {
    props.showAdd.setShowAnadir({card:false, icon:false});
  },[]);
  return (
    <React.Fragment>
      <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                  {mazo.titulo}
      </Typography>
      
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    > 
    {props.showFuncionalidades.showFeedBack.card?
                               
                               <Card  sx={{zIndex:1, position:'absolute', minWidth: '25%', mx:'825%', border: '0.5px solid black'  }}>
                                       <CardContent>
                                           <Tooltip title="Cancelar" placement="right">
                                                   <CloseIcon onClick={(e)=>{props.showFuncionalidades.setShowFeedBack({card:false, icon:false})}} sx={{p:1, mx:'93%', backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                           </Tooltip>   
                                           <Typography sx={{fontWeight: 'bold', fontsize:'1vw'}} variant="h4" component="div">
                                               Sugerencia
                                           </Typography>
                                           <Divider  variant="middle" />
                                           <Typography sx={{textAlign: 'center'}}  variant="h6" color="text.primary">
                                               En esta sección podras realizar tus repasos  de los temas que desees aprender 🤓.
                                               Escoge alguna de las opciones o  usa Nuestra interfaz de voz 🎙 para seleccionar la respuesta.
                                           </Typography>
                                          
                                       </CardContent>
                                       <Box  sx={{mt: '2%', mx:'23%', display:'flex'}}>
                                               <img style={{width:'30ch', height:'30ch'}} src={gambare} alt="mehera"/>
                                          </Box>
                                   </Card>
                           :null}
    <Grow in={true}>
                <Paper sx={{
                    mx:'4%',  
                    position: 'absolute',        
                    width: '86%',
                    height: '70%',
                    color:'yellow',
                    background:'#c8a2c8',
                    border: '3px solid black'
                }}
                    variant="outlined" >
                        <Paper sx={{
                            mt:'1%',
                            mx: '-1%',
                            position: 'absolute',        
                            width: '99.9%',
                            height: '99%',
                            color:'yellow',
                            background:'#c8a2c8',
                            border: '3px solid black'
                        }}
                            variant="outlined" >
                                <Paper sx={{
                                    mt:'1%',
                                    mx: '-1%',
                                  
                                    position: 'absolute',        
                                    width: '99.9%',
                                    height: '99%',
                                    color:'yellow',
                                    background:'#c8a2c8',
                                    border: '3px solid black'
                                }}
                                    variant="outlined" >
                                            <Box sx={{ width:'100%'}}>  
                                                  <Stack spacing={'2%'} 
                                                        alignItems="center" 
                                                        direction="column" 
                                                        justifyContent="center">      
                                                      
                                                      <Paper sx={{mt:'2%',    
                                                                width: '90%',
                                                                height: '15vw',
                                                                background:'#c2c2c2',
                                                                border: '3px solid black',
                                                                '&:hover': {backgroundColor: '#9b9b9b'}
                                                            }}
                                                                variant="outlined" > 
                                                                      <Typography mt={'6.5%'} sx={{textAlign: 'center',fontWeight: 'bold'}} variant="h5" component="div">{mazo.Tarjetas[page-1].Pregunta}</Typography>
                                                      </Paper>
                                                      <Opt>
                                                          <Grid  container mx={'2%'} spacing={'1%'}>
                                                                  <Grid item xs>
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'2%'}>
                                                                                  <Button className='button-main'  sx={{height:'18ch', width: '70ch', border: '5px solid black',color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">{mazo.Tarjetas[page-1].Opciones[0]}</Typography></Button>
                                                                                  <Button className='button-main'  sx={{height:'18ch', width: '70ch', border: '5px solid black', color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography sx={{fontWeight: 'bold'}}  variant="h6" component="div">{mazo.Tarjetas[page-1].Opciones[2]}</Typography></Button>
                                                                              </Stack>
                                                                          </Box>
                                                                  </Grid>
                                                                  <Grid mt={'10%'} item xs={'10%'}>
                                                                              <MicIcon className='button-main' sx={{p:2, borderRadius:'50%', background:'red',
                                                                              color:'white', width: '30%', height: '30%', '&:hover': {backgroundColor: '#FF6347'} }}/>
                                                                  </Grid>
                                                                  <Grid item xs>
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'2%'}>
                                                                                  <Button className='button-main'  sx={{height:'18ch', width: '70ch',border: '5px solid black', color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}> <Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">{mazo.Tarjetas[page-1].Opciones[1]}</Typography></Button>
                                                                                  <Button className='button-main'  sx={{height:'18ch', width: '70ch', border: '5px solid black',  color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">{mazo.Tarjetas[page-1].Opciones[3]}</Typography></Button>
                                                                              </Stack>
                                                                          </Box>
                                                                  </Grid>
                                                          </Grid> 
                                                      </Opt>                                                       
                                                </Stack>
                                            </Box>
                                </Paper>
                        </Paper>
                </Paper>
                </Grow>
    </Box>
    <Box
      sx={{
        mt:'43%',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
        <Pagination sx={{textAlign: 'center'}} count={mazo.Tarjetas.length} page={page} onChange={handleChange}  color="secondary" />
    </Box>
    </React.Fragment>
  );
}
/*
El profesor del curso de Inteligencia Artificial te deja de trabajo final  realizar un clasificador de reviews. Para ello te provee de la data Amazon, la cual contiene tanto las reviews (Texto) como su calificación de estrellas (1 al 5), poniendote manos a la obra comienzas probando con una RNN (Recurrent Neural Networks). ¿Que tipo de Arquitectura RNN usarias?
 <Box sx={{justifyContent: 'center', display: 'flex', position: 'absolute', textAlign: 'center' }}> 
                                                                  
                                                                        <Grid  container spacing={'1%'}>
                                                                                <Grid item xs>
                                                                                        <Box sx={{ width: '150%' }}>
                                                                                            <Stack spacing={'4%'}>
                                                                                                <Button sx={{ border: '5px solid black', borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 1</Button>
                                                                                                <Button sx={{ border: '5px solid black', borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 2</Button>
                                                                                            </Stack>
                                                                                        </Box>
                                                                                </Grid>
                                                                                <Grid mt={'10%'} item xs={'20%'}>
                                                                                            <MicIcon sx={{p:2, borderRadius:'50%', background:'red',
                                                                                            color:'white', width: '30%', height: '30%', '&:hover': {backgroundColor: '#FF6347'} }}/>
                                                                                </Grid>
                                                                                <Grid item xs>
                                                                                        <Box sx={{ width: '150%' }}>
                                                                                            <Stack spacing={'4%'}>
                                                                                                <Button sx={{border: '5px solid black', borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 1</Button>
                                                                                                <Button sx={{border: '5px solid black', borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 2</Button>
                                                                                            </Stack>
                                                                                        </Box>
                                                                                </Grid>
                                                                        </Grid> 
                                                                </Box>
*/