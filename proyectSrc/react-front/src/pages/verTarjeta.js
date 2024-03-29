import React, {useEffect,useState,useContext} from 'react';
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
import gambare from './img/gambare.webp';
import micHelp from './img/microphonehelp.jpg'
import * as ReactDOMServer from 'react-dom/server'
import { useDispatch} from 'react-redux';
import { changeContent,restoreContent } from '../stores/sliceAyuda';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Tarjetas.css'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SR,{useSpeechRecognition} from 'react-speech-recognition';
import { getInGameCommands } from '../speechMethods/tarjetasMethods';
import star from './img/star.png';
import { AccountContext } from '../AccountContext';
import { BACK_IP } from '../publicConstants';
import { changeTutorial, restoreContentTutorial } from '../stores/sliceTutorial';

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

/* 
<Box className="container-showResult">
      
        <Box className="box-result">       
        <Typography sx={{fontSize:'3vw', fontWeight: 'bold', color:'gold'}} variant="h2">Resultados</Typography>
            <Typography sx={{ fontWeight: 'bold', color:'white'}} className="text-result" variant="h5">
              <ul>
                {puntajeTarjeta.map((puntaje, index) =>
                    <li key={index}>
                    Puntaje de la tarjeta {index+1}: {tab}  {puntaje.toFixed(3)}
                    </li>
                    )}
              </ul>
            <Divider sx={{mt:'2%', color:'black', border:'0.1rem solid black'}} variant="middle" />
            <Typography sx={{mt:'2%', fontWeight: 'bold', color:'white'}} className="text-result" variant="h4">
                Puntaje del Mazo:   {puntajeMazo.toFixed(3)} <br/>
              </Typography>
          </Typography>
        </Box>
        <Button onClick={
                    ()=>{
                      history.push('/Mazos');
                    }
                  } className="Botton-voler-inicio" sx={{p:2,  borderRadius: 5, py: 2, color: 'white' ,background:'#0000cc'}} variant="contained" size="large">
                  <Typography sx= {{fontWeight: 'bold', fontSize:'1vw'}} variant = 'h6'>ir a Mazos</Typography>
              </Button>
              <Button className="Botton-voler-intentar-again" onClick={
                ()=>{
                  window.location.reload(false);
                }
              } sx={{py:2, borderRadius: 5, color: 'white', background:'#00b347'}} variant="contained" size="large">
                  <Typography sx= {{fontWeight: 'bold', fontSize:'1vw'}} variant = 'h6'>volver intentar</Typography>
              </Button>
    </Box>
*/
export default function VerTarjeta(props) {
  const {currentState} = useContext(AccountContext);
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
  const [valuestring, setValuestring] = React.useState("")
  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
  let history = useHistory()
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
  const [showResult, setShowResult] = React.useState(false)
  const dispatch = useDispatch();
  /* eslint-disable */

  const sendPuntos= async (sum) =>{
    if (currentState){
      axios.post(BACK_IP+'/api/state/sumPuntos',{proyecto: currentState.BaseProyect, Puntos:sum}).then(data=>console.log(data.data)).catch(err=>console.log(err))
    }
  }

  const nextCard = ()=>{
    if (showResult){
      history.push('/Mazos');
    }else{
      if (page < mazo.Tarjetas.length){      
        handleChange(null,page+1);
      }
    }      
  }
  const previousCard = ()=>{
    if (page > 1){
      handleChange(null,page-1)
    }
  }

  const handleClickA = ()=>{
    if (disabledA == "disabled"){
      return
    }
    //console.log(mazo.Tarjetas[page-1].Respuesta-1)
    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[0]){
      setColorA('#008000')
      setDisabledA("disabled")
      setDisabledB("disabled")
      setDisabledC("disabled")
      setDisabledD("disabled")
      let puntaje = ((4-intentos)/4)*100
      let update = {}
      update['$set'] = {}
      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
      update['$set'][key_puntos] =  puntaje
      axios.put(BACK_IP+'/api/mazos/'+mazo._id, update)
      puntajeTarjeta.push(puntaje)
      setPuntajeTarjeta(puntajeTarjeta)
      
        if (page === mazo.Tarjetas.length){
          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
          //let avg = sum / puntajeTarjeta.length;
          setPuntajesMazo(sum)
          if (sum <= mazo.Tarjetas.length*50){
            setValuestring(
                  "Puedes hacerlo mejor, vuelvelo a intentar 😬"                  )
          }else if(mazo.Tarjetas.length*50 < sum && sum < mazo.Tarjetas.length*75){
            setValuestring("Estas logrando el objetivo pero puedes seguir mejorando 🤗")
          }else{
            
            setValuestring("Bien hecho, sigue así 😃")
  
          }
          axios.put(BACK_IP+'/api/mazos/'+mazo._id, {
            "Puntos":sum
          })
          sendPuntos(sum);
          setShowResult(true)
        }
    }else{
      setColorA('#ff0000')
      setDisabledA("disabled")
      setIntentos(intentos+1);
    }    
  }
  const handleClickB = ()=>{
    if (disabledB == "disabled"){
      return
    }
    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[2]){
      setColorB('#008000')
      setDisabledA("disabled")
      setDisabledB("disabled")
      setDisabledC("disabled")
      setDisabledD("disabled")
      let puntaje = ((4-intentos)/4)*100
      let update = {}
      update['$set'] = {}
      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
      update['$set'][key_puntos] =  puntaje
      axios.put(BACK_IP+'/api/mazos/'+mazo._id, update)
      puntajeTarjeta.push(puntaje)
      setPuntajeTarjeta(puntajeTarjeta)
        
      
        if (page === mazo.Tarjetas.length){
          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
          //let avg = sum / puntajeTarjeta.length;
          setPuntajesMazo(sum)
          if (sum <= mazo.Tarjetas.length*50){
            setValuestring(
                  "Puedes hacerlo mejor, vuelvelo a intentar 😬"                  )
          }else if(mazo.Tarjetas.length*50 < sum && sum < mazo.Tarjetas.length*75){
            setValuestring("Estas logrando el objetivo pero se que aún puedes seguir mejorando 🤗")
          }else{
            
            setValuestring("Bien hecho, sigue así 😃")
  
          }
          axios.put(BACK_IP+'/api/mazos/'+mazo._id, {
            "Puntos":sum
          })
          sendPuntos(sum);
          setShowResult(true)
        }
     
    }else{
      setColorB('#ff0000')
      setDisabledB("disabled")
      setIntentos(intentos+1);
    }
  }

  const handleClickC = ()=>{
    if (disabledC == "disabled"){
      return
    }
    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[1]){
      setColorC('#008000')
      setDisabledA("disabled")
      setDisabledB("disabled")
      setDisabledC("disabled")
      setDisabledD("disabled")
      let puntaje = ((4-intentos)/4)*100
      let update = {}
      update['$set'] = {}
      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
      update['$set'][key_puntos] =  puntaje
      axios.put(BACK_IP+'/api/mazos/'+mazo._id, update)
      puntajeTarjeta.push(puntaje)
      setPuntajeTarjeta(puntajeTarjeta)
      
        if (page === mazo.Tarjetas.length){
          let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
        //  let avg = sum / puntajeTarjeta.length;
          setPuntajesMazo(sum)
          if (sum <= mazo.Tarjetas.length*50){
            setValuestring(
                  "Puedes hacerlo mejor, vuelvelo a intentar 😬"                  )
          }else if(mazo.Tarjetas.length*50 < sum && sum < mazo.Tarjetas.length*75){
            setValuestring("Estas logrando el objetivo pero se que aún puedes seguir mejorando 🤗")
          }else{
            
            setValuestring("Bien hecho, sigue así 😃")
  
          }
          axios.put(BACK_IP+'/api/mazos/'+mazo._id, {
            "Puntos":sum
          })
          sendPuntos(sum);
          setShowResult(true)
        }
      
    }else{
      setColorC('#ff0000')
      setDisabledC("disabled")
      setIntentos(intentos+1);
    }
  }

  const handleClickD = ()=>{
    if (disabledD == "disabled"){
      return
    }
    if(mazo.Tarjetas[page-1].Opciones[mazo.Tarjetas[page-1].Respuesta-1] === mazo.Tarjetas[page-1].Opciones[3]){
      setColorD('#008000')
      setDisabledA("disabled")
      setDisabledB("disabled")
      setDisabledC("disabled")
      setDisabledD("disabled")
      let puntaje = ((4-intentos)/4)*100
      let update = {}
      update['$set'] = {}
      let key_puntos = "Tarjetas."+(page-1)+".Puntos"
      update['$set'][key_puntos] =  puntaje
      axios.put(BACK_IP+'/api/mazos/'+mazo._id, update)
      
      puntajeTarjeta.push(puntaje)
      setPuntajeTarjeta(puntajeTarjeta)
      if (page === mazo.Tarjetas.length){
        let sum = puntajeTarjeta.reduce((previous, current) => current += previous);
        //let avg = sum / puntajeTarjeta.length;
        setPuntajesMazo(sum)
        if (sum <= mazo.Tarjetas.length*50){
          setValuestring("Puedes hacerlo mejor, vuelvelo a intentar 😬")
        }else if(mazo.Tarjetas.length*50 < sum && sum < mazo.Tarjetas.length*75){
          setValuestring("Estas logrando el objetivo pero se que aún puedes seguir mejorando 🤗")
        }else{
          
          setValuestring("Bien hecho, sigue así 😃")

        }
        axios.put(BACK_IP+'/api/mazos/'+mazo._id, {
          "Puntos":sum
        })
        sendPuntos(sum);
        setShowResult(true)
      }
    }else{
      setColorD('#ff0000')
      setDisabledD("disabled")
      setIntentos(intentos+1);
    }
  }


  const dictAction = {"a":handleClickA,"b":handleClickB,"c":handleClickC,"d":handleClickD}
  const handleOption = (opcion)=>{
    if (opcion in dictAction){
      //alert(opcion);
      dictAction[opcion]();
    }      
  }

  const commands = getInGameCommands({handleOption,nextCard,previousCard});

  const {listening,transcript} = useSpeechRecognition({commands:commands});
  const listen = ()=> { 
    if (listening)
      SR.stopListening();
    else
      SR.startListening({language:'es',continuous:false});   
    }
  


  useEffect(() => {
    props.showAdd.setShowAnadir({card:false, icon:false});
    const suggest = <div className='sugerencia-contenido'>
    <div className='sugenrencia-contenido-img'>
            <img style={{width:'30ch', height:'30ch'}} src={gambare} alt="mehera"/>
            <div>Sugerencia</div>
    </div>
           <div className='sugerencia-contenido-descripcion'>
                En esta sección podras realizar tus repasos  de los temas que desees aprender 🤓.
                Escoge alguna de las opciones o  usa Nuestra interfaz de voz 🎙 para seleccionar 
                la respuesta. (Use el micrófono entre los botones).<br/>
                Para indicar las opciones mediante la interfaz de voz : <b>"Opción:" + "la letra"
                </b><br/>
                <b>ejemplo "Opción b".</b><br/>
                Tambien puedes Navegar entre las tarjetas diciendo <b>"siguiente"</b> o <b>"atras"</b>.
            </div>
    </div>
          
          const tuto = <div className='sugerencia-contenido'>
          <div className='sugenrencia-contenido-img'>
                  <img  src={micHelp}/>
                  <div>Tutorial Interfaz de Voz </div>
              </div>
              <div className='sugerencia-contenido-descripcion-600'>
                  
                  <div className='sugerencia-descripcion-margin-subititle'>
                      Ejecutando Repaso 
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Siguiente" : Dirige a la Siguiente Tarjeta
                  </div>
                  <div className='sugerencia-descripcion-margin'>
                    "Anterior" : Dirige a la Anterior Tarjeta
                  </div>        
                  <div className='sugerencia-descripcion-margin'>
                      "Opción [1,2,3,4]": Marca la Opción 1,2,3,4 (A,B,C,D)
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

  useEffect(() => {
    axios.get(BACK_IP+'/api/mazosID/'+idSeccion).then(function(response){
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

    {showResult?
    <Box className="container-showResult"> 
    
      
      <Typography sx={{fontSize:'3vw', fontWeight: 'bold', color:'brown'}} variant="h2">Resultados</Typography>
            <Typography sx={{mt:'3%', fontWeight: 'bold', color:'black'}} className="text-result" variant="h5">
              <ul>
                {puntajeTarjeta.map((puntaje, index) =>
                    <li key={index}>
                    Puntaje de la tarjeta {index+1}: {tab}  {puntaje.toFixed(3)}
                    </li>
                    )}
              </ul>
            <Divider sx={{mt:'2%', color:'black', border:'0.1rem solid black'}} variant="middle" />
            <Typography sx={{fontWeight: 'bold', color:'black'}} className="text-result" variant="h5">
                Puntaje del Mazo: {puntajeMazo.toFixed(3)} <br/>
                <Typography  sx={{textAlign:'center', mt:'5%', fontWeight: 'bold', fontSize: '1em'}} variant="h4">{valuestring}</Typography>
               
              </Typography>
          </Typography>
          <img className={"img-result"} src={star} alt="start"/>
          <Button onClick={
                    ()=>{
                      history.push('/Mazos');
                    }
                  } className="Botton-voler-inicio" sx={{p:2,  borderRadius: 5, py: 2, color: 'white' ,background:'#0000cc'}} variant="contained" size="large">
                  <Typography sx= {{fontWeight: 'bold', fontSize:'1vw'}} variant = 'h6'>ir a Mazos</Typography>
      </Button>
      <Button className="Botton-voler-intentar-again" onClick={
        ()=>{
          window.location.reload(false);
        }
      } sx={{py:2, borderRadius: 5, color: 'white', background:'#00b347'}} variant="contained" size="large">
          <Typography sx= {{fontWeight: 'bold', fontSize:'1vw'}} variant = 'h6'>volver intentar</Typography>
      </Button>
    </Box>:null}  
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
                                                                                  <Button className='button-main' onClick={handleClickA}  sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black',color: 'black',background: colorA, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledA}>
                                                                                      <Typography sx={{fontWeight: 'bold'}} variant="h6" component="div"> Opción 1: {mazo.Tarjetas[page-1].Opciones[0]}</Typography></Button>
                                                                                  <Button onClick={handleClickB} className='button-main'  sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black', color: 'black',background: colorB, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledB}>
                                                                                      <Typography sx={{fontWeight: 'bold'}}  variant="h6" component="div">Opción 2: {mazo.Tarjetas[page-1].Opciones[2]}</Typography></Button>
                                                                              </Stack>
                                                                  </Grid>
                                                                  <Grid mt={'10%'} item xs={'10%'}>
                                                                            {listening?
                                                                              <MicIcon sx={{p:2,  borderRadius:50, background:'blue', color:'white',cursor:'pointer', width: 100, height: 100 }} size="large" onClick = {listen} />
                                                                            :
                                                                              <MicIcon sx={{p:2,  borderRadius:50, background:'red', color:'white',cursor:'pointer', width: 100, height: 100 }} size="large" onClick = {listen}/>
                                                                            }
                                                                              
                                                                  </Grid>
                                                                  <Grid item >
                                                                          <Box sx={{ width: '100%' }}>
                                                                              <Stack spacing={'2%'}>
                                                                                  <Button className='button-main' onClick={handleClickC} sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch',border: '5px solid black', color: 'black',background: colorC, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledC}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">Opción 3: {mazo.Tarjetas[page-1].Opciones[1]}</Typography></Button>
                                                                                  <Button className='button-main' onClick={handleClickD} sx={{maxHeight:'20ch', height:'18ch', maxwidth:'70ch', width: '70ch', border: '5px solid black',  color: 'black',background: colorD, '&:hover': {backgroundColor: '#0088b6'}}} disabled={disabledD}><Typography sx={{fontWeight: 'bold'}} variant="h6" component="div">Opción 4: {mazo.Tarjetas[page-1].Opciones[3]}</Typography></Button>
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