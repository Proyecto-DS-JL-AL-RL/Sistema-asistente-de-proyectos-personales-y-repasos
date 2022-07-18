import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import Stack from '@mui/material/Stack';
//import { styled } from '@mui/material/styles';
import './funcionalidades.css'
import Grow from '@mui/material/Grow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
//import Tooltip from '@mui/material/Tooltip';
//import CloseIcon from '@mui/icons-material/Close';
import gambare from './img/gambare.webp'
import * as ReactDOMServer from 'react-dom/server'
import { useDispatch} from 'react-redux';
import { changeContent,restoreContent } from '../stores/sliceAyuda';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Tarjetas.css'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
//<MicIcon className='button-main' sx={{p:2, borderRadius:'50%', background:'red',
//color:'white', width: '30%', height: '30%', '&:hover': {backgroundColor: '#FF6347'} }}/>

const mazos = {
  id:'',
  Titulo: '',
  descripcion: '',
  Tarjetas:[{
    id: '',
    Pregunta: '',
    Opciones: [],
    Respuestas: ''
  }]
}


export default function VerTarjeta(props) {
  const [page, setPage] = React.useState(1);
  const [mazo, setMazo] = React.useState(mazos);
  const [intentos, setIntentos] = React.useState(0);
  const [puntajeMazo, setPuntajesMazo] =  React.useState(0);
  const [puntajeTarjeta, setPuntajeTarjeta] = React.useState([]);
  const [colorA, setColorA] =  React.useState('#BBE7FE');
  const [colorB, setColorB] =  React.useState('#BBE7FE');
  const [colorC, setColorC] =  React.useState('#BBE7FE');
  const [colorD, setColorD] =  React.useState('#BBE7FE');
  const [disabledA, setDisabledA] = React.useState("")
  const [disabledB, setDisabledB] = React.useState("")
  const [disabledC, setDisabledC] = React.useState("")
  const [disabledD, setDisabledD] = React.useState("")
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Inicio
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/Mazos"
    >
      Tarjetas
    </Link>,
    <Typography key="3" color="text.primary">
      {mazo.Titulo}
    </Typography>,
  ]; 
  const {idSeccion} = useParams();
  const handleChange = (event, value) => {
    setDisabledA("")
    setDisabledB("")
    setDisabledC("")
    setDisabledD("")
    setColorA("#BBE7FE")
    setColorB("#BBE7FE")
    setColorC("#BBE7FE")
    setColorD("#BBE7FE")
    setIntentos(0)
    setPage(value);
  };
  const dispatch = useDispatch();
  /* eslint-disable */
  useEffect(() => {
    props.showAdd.setShowAnadir({card:false, icon:false});
    const suggest = <Card>
                        <CardContent>   
                            <Typography  sx={{fontWeight: 'bold'}} variant="h1">
                                Sugerencia
                            </Typography>
                            <Divider  variant="middle" />
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                En esta sección podras realizar tus repasos  de los temas que desees aprender 🤓.<br/>
                                Escoge alguna de las opciones o  usa Nuestra interfaz de voz 🎙 para seleccionar <br/>
                                la respuesta (Solo debe decir la letra del botón para escoger dicha opción).
                            </Typography>
                          
                        </CardContent>
                        <Box  sx={{mt: '2%', mx:'23%', display:'flex'}}>
                                <img style={{width:'30ch', height:'30ch'}} src={gambare} alt="mehera"/>
                        </Box>
                  </Card>
    const component = ReactDOMServer.renderToString(suggest);
    dispatch(changeContent(component));
    return ()=>{
        dispatch(restoreContent());
    }                
  },[]);

  useEffect(() => {
    axios.get('/api/mazosID/'+idSeccion).then(function(response){
      setMazo(response.data)
    })}, [mazos])

  return (
    <React.Fragment>
      <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                  {mazo.Titulo}
      </Typography>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
        }}
      > 
    <Grow in={true}>
                <Paper sx={{
                    mx:'4%',  
                    position: 'absolute',        
                    width: '86%',
                    height: '75%',
                    color:'yellow',
                    background:'#c8a2c8',
                    border: '3px solid black',
                    flexWrap:'wrap'
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
                                                       <Pagination sx={{textAlign: 'center'}} count={mazo.Tarjetas.length} page={page} onChange={handleChange}  color="secondary" size="large"/>
                                                      <Paper sx={{mt:'3%',    
                                                                width: '80%',
                                                                height: '12vw',
                                                                position: 'relative',
                                                                background:'#c2c2c2',
                                                                border: '3px solid black',
                                                                '&:hover': {backgroundColor: '#9b9b9b'}
                                                            }}
                                                            variant="outlined" > 
                                                              <Typography className="Pregunta_Titulo" variant="h5" component="div">{mazo.Tarjetas[page-1].Pregunta}</Typography>
                                                      </Paper>
                                                          <Grid  container className="Opciones" spacing={'2%'}>
                                                                  <Grid item >
                                                                              <Stack spacing={'2%'}>
                                                                                  <Button className='button-main' onClick={()=>{
                                                                                    //console.log(mazo.Tarjetas[page-1].Respuesta-1)
                                                                                    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[0]){
                                                                                      setColorA('#008000')
                                                                                      setDisabledA("disabled")
                                                                                      setDisabledB("disabled")
                                                                                      setDisabledC("disabled")
                                                                                      setDisabledD("disabled")
                                                                                      let puntaje = (4-intentos)/4
                                                                                      let update = {}
                                                                                      update['$set'] = {}
                                                                                      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
                                                                                      update['$set'][key_puntos] =  puntaje
                                                                                      axios.put('/api/mazos/'+mazo._id, update)
                                                                                      puntajeTarjeta.push(puntaje)
                                                                                      setPuntajeTarjeta(puntajeTarjeta)
                                                                                      if (page === mazo.Tarjetas.length){
                                                                                        if (page === mazo.Tarjetas.length){
                                                                                          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
                                                                                          let avg = sum / puntajeTarjeta.length;
                                                                                          setPuntajesMazo(avg)
                                                                                          axios.put('/api/mazos/'+mazo._id, {
                                                                                            "Puntos":avg
                                                                                          })
                                                                                        }
                                                                                      }
                                                                                      
                                                                                    }else{
                                                                                      setColorA('#ff0000')
                                                                                      setDisabledA("disabled")
                                                                                      setIntentos(intentos+1);
                                                                                    }
                                                                                    
                                                                                  }}  sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black',color: 'black',background: colorA, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledA}>
                                                                                      <Typography sx={{fontWeight: 'bold'}} variant="h6" component="div"> a. {mazo.Tarjetas[page-1].Opciones[0]}</Typography></Button>
                                                                                  <Button onClick={()=>{
                                                                                    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[2]){
                                                                                      setColorB('#008000')
                                                                                      setDisabledA("disabled")
                                                                                      setDisabledB("disabled")
                                                                                      setDisabledC("disabled")
                                                                                      setDisabledD("disabled")
                                                                                      let puntaje = (4-intentos)/4
                                                                                      let update = {}
                                                                                      update['$set'] = {}
                                                                                      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
                                                                                      update['$set'][key_puntos] =  puntaje
                                                                                      axios.put('/api/mazos/'+mazo._id, update)
                                                                                      puntajeTarjeta.push(puntaje)
                                                                                      setPuntajeTarjeta(puntajeTarjeta)
                                                                                      if (page === mazo.Tarjetas.length){
                                                                                        if (page === mazo.Tarjetas.length){
                                                                                          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
                                                                                          let avg = sum / puntajeTarjeta.length;
                                                                                          setPuntajesMazo(avg)
                                                                                          axios.put('/api/mazos/'+mazo._id, {
                                                                                            "Puntos":avg
                                                                                          })
                                                                                        }
                                                                                      }
                                                                                    }else{
                                                                                      setColorB('#ff0000')
                                                                                      setDisabledB("disabled")
                                                                                      setIntentos(intentos+1);
                                                                                    }
                                                                                  }} className='button-main'  sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black', color: 'black',background: colorB, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledB}>
                                                                                      <Typography sx={{fontWeight: 'bold'}}  variant="h6" component="div">b. {mazo.Tarjetas[page-1].Opciones[2]}</Typography></Button>
                                                                              </Stack>
                                                                  </Grid>
                                                                  <Grid mt={'10%'} item xs={'10%'}>
                                                                              <MicIcon sx={{p:2,  borderRadius:50, background:'red', color:'white', width: 100, height: 100 }} size="large" />
                                                                  </Grid>
                                                                  <Grid item >
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'2%'}>
                                                                                  <Button className='button-main' onClick={()=>{
                                                                                    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[1]){
                                                                                      setColorC('#008000')
                                                                                      setDisabledA("disabled")
                                                                                      setDisabledB("disabled")
                                                                                      setDisabledC("disabled")
                                                                                      setDisabledD("disabled")
                                                                                      let puntaje = (4-intentos)/4
                                                                                      let update = {}
                                                                                      update['$set'] = {}
                                                                                      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
                                                                                      update['$set'][key_puntos] =  puntaje
                                                                                      axios.put('/api/mazos/'+mazo._id, update)
                                                                                      puntajeTarjeta.push(puntaje)
                                                                                      setPuntajeTarjeta(puntajeTarjeta)
                                                                                      if (page === mazo.Tarjetas.length){
                                                                                        if (page === mazo.Tarjetas.length){
                                                                                          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
                                                                                          let avg = sum / puntajeTarjeta.length;
                                                                                          setPuntajesMazo(avg)
                                                                                          axios.put('/api/mazos/'+mazo._id, {
                                                                                            "Puntos":avg
                                                                                          })
                                                                                        }
                                                                                      }
                                                                                    }else{
                                                                                      setColorC('#ff0000')
                                                                                      setDisabledC("disabled")
                                                                                      setIntentos(intentos+1);
                                                                                    }
                                                                                  }} sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch',border: '5px solid black', color: 'black',background: colorC, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledC}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">c. {mazo.Tarjetas[page-1].Opciones[1]}</Typography></Button>
                                                                                  <Button className='button-main' onClick={()=>{
                                                                                    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[3]){
                                                                                      setColorD('#008000')
                                                                                      setDisabledA("disabled")
                                                                                      setDisabledB("disabled")
                                                                                      setDisabledC("disabled")
                                                                                      setDisabledD("disabled")
                                                                                      let puntaje = (4-intentos)/4
                                                                                      let update = {}
                                                                                      update['$set'] = {}
                                                                                      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
                                                                                      update['$set'][key_puntos] =  puntaje
                                                                                      axios.put('/api/mazos/'+mazo._id, update)
                                                                                      
                                                                                      puntajeTarjeta.push(puntaje)
                                                                                      setPuntajeTarjeta(puntajeTarjeta)
                                                                                      if (page === mazo.Tarjetas.length){
                                                                                        let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
                                                                                        let avg = sum / puntajeTarjeta.length;
                                                                                        setPuntajesMazo(avg)
                                                                                        axios.put('/api/mazos/'+mazo._id, {
                                                                                          "Puntos":avg
                                                                                        })
                                                                                      }
                                                                                    }else{
                                                                                      setColorD('#ff0000')
                                                                                      setDisabledD("disabled")
                                                                                      setIntentos(intentos+1);
                                                                                    }
                                                                                  }} sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black',  color: 'black',background: colorD, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledD}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">d. {mazo.Tarjetas[page-1].Opciones[3]}</Typography></Button>
                                                                              </Stack>
                                                                          </Box>
                                                                  </Grid>
                                                          </Grid> 
                                                </Stack>
                                            </Box>
                                </Paper>
                        </Paper>
                </Paper>
                </Grow>
    </Box>
    <Box
      sx={{
        mt:'2.5%',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
       
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