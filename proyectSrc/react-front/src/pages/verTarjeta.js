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

const mazo = {
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
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
                <Paper sx={{
                    mx:'4%',  
                    position: 'absolute',        
                    width: '88%',
                    height: '80%',
                    color:'yellow',
                    background:'#c8a2c8',
                    border: '3px solid black'
                }}
                    variant="outlined" >
                        <Paper sx={{
                            mt:'1%',
                            mx: '-1%',
                            zIndex:1,  
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
                                    zIndex:1,  
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
                                                      
                                                      <Paper sx={{mt:'3%',    
                                                                width: '90%',
                                                                height: '15vw',
                                                                textAlign: 'center',
                                                                background:'#c2c2c2',
                                                                border: '3px solid black',
                                                                '&:hover': {backgroundColor: '#FF6347'}
                                                            }}
                                                                variant="outlined" > 
                                                                      <Typography mt={'8%'} sx={{fontWeight: 'bold'}} variant="h6" component="div">{mazo.Tarjetas[page-1].Pregunta}</Typography>
                                                      </Paper>
                                                      <Opt>
                                                          <Grid  container spacing={'1%'}>
                                                                  <Grid item xs>
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'4%'}>
                                                                                  <Button className='button-main'  sx={{height:'20ch', width: '80ch', border: '5px solid black',color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography variant="body2" component="div">{mazo.Tarjetas[page-1].Opciones[0]}</Typography></Button>
                                                                                  <Button className='button-main'  sx={{height:'20ch', width: '80ch', border: '5px solid black', color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography variant="body2" component="div">{mazo.Tarjetas[page-1].Opciones[2]}</Typography></Button>
                                                                              </Stack>
                                                                          </Box>
                                                                  </Grid>
                                                                  <Grid mt={'10%'} item xs={'20%'}>
                                                                              <MicIcon className='button-main' sx={{p:2, borderRadius:'50%', background:'red',
                                                                              color:'white', width: '30%', height: '30%', '&:hover': {backgroundColor: '#FF6347'} }}/>
                                                                  </Grid>
                                                                  <Grid item xs>
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'4%'}>
                                                                                  <Button className='button-main'  sx={{height:'20ch', width: '80ch',border: '5px solid black', color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}> <Typography variant="body2" component="div">{mazo.Tarjetas[page-1].Opciones[1]}</Typography></Button>
                                                                                  <Button className='button-main'  sx={{height:'20ch', width: '80ch', border: '5px solid black',  color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}><Typography variant="body2" component="div">{mazo.Tarjetas[page-1].Opciones[3]}</Typography></Button>
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
                
    </Box>
    <Box
      sx={{
        mt:'47%',
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