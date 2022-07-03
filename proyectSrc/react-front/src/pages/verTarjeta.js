import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import './funcionalidades.css'


const Opt = styled(Paper)(({ theme }) => ({
  background:'#c8a2b5',
  width: '90%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '6px solid black',
}));

export default function VerTarjeta() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

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
                                                                background:'#c8a2c8',
                                                                border: '3px solid black',
                                                                '&:hover': {backgroundColor: '#FF6347'}
                                                            }}
                                                                variant="outlined" > 
                                                                      <Typography mt={'6%'} sx={{fontWeight: 'bold'}} variant="h6" component="div">¿esto es una pregunta?</Typography>
                                                      </Paper>
                                                      <Opt>
                                                          <Grid  container spacing={'1%'}>
                                                                  <Grid item xs>
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'4%'}>
                                                                                  <Button className='button-main'  sx={{ border: '5px solid black', borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 1</Button>
                                                                                  <Button className='button-main'  sx={{ border: '5px solid black', borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 2</Button>
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
                                                                                  <Button className='button-main'  sx={{border: '5px solid black', borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 1</Button>
                                                                                  <Button className='button-main'  sx={{border: '5px solid black', borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE', '&:hover': {backgroundColor: '#0088b6'}}}>Item 2</Button>
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
        <Pagination sx={{textAlign: 'center'}} count={5} page={page} onChange={handleChange}  color="secondary" />
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