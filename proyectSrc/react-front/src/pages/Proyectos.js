import { Box, Typography } from '@mui/material'
import React,{useState,useContext,useEffect} from 'react';
import { AccountContext } from '../AccountContext';
import axios from 'axios';
import AddProyect from '../components/proyecto/AddProyect';
import OrderProyect from '../components/proyecto/OrderProyect';
import Proyecto from '../components/proyecto/Proyecto'
import ProyectoForm from '../components/projectForm';
import MensajeAdvertencia from '../components/horario/MensajeAdvertencia';
import { getCommandsPage } from '../speechMethods/proyectosMethods';
import { useSpeechRecognition } from 'react-speech-recognition';

import './proyectos.css'
import { useHistory } from 'react-router-dom';
export default function Proyectos() {
  const history = useHistory();
  const [proyects,setProyects] = useState([]);
  const [escribiendo,setEscribiendo] = useState(false);
  const {sessionState} = useContext(AccountContext);
  const [tituloInput,setTituloInput] = useState("");
  const [showForm,setShowForm] = useState(false);  
  const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);

  const Advertencia = () =>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"A su proyecto le falta un Título"}
    comentario={<>
            Debes colocarle un Título a tu nuevo Proyecto.
            <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                ok
            </button>
            </>}
    />
  }

  const getProyects = async ()=>{
    const {sub} = sessionState;
    if (sub){
      //console.log('subb:',sub);
      axios.get('http://localhost:4000/api/Proyectos/'+sub)
        .then(data=>{
          //console.log(data.data);
          setProyects(data.data);
        })
        .catch(err=>console.log(err));
    }
  }

  const close = ()=>{setShowForm(false);}

  const addProyect = async ()=>{
    if (tituloInput == ''){
      setMensajeAdvertenciaDisplay(Advertencia);
      return;
    }
    const {sub} = sessionState;
      if (showForm && sub){
        const proyect_ = {
          UserSub : sub,
          Titulo : tituloInput,
        }
        axios.post('http://localhost:4000/api/Proyectos/addProyect',proyect_)
          .then(data=>{
            console.log('data:', data.data);
            setShowForm(false);
            getProyects();
            setTituloInput("");
          }).catch(err=>console.log(err));
      }      
  };
  
  useEffect(()=>{
    getProyects();
  },[sessionState]);

  const handleBack = ()=>{
    if (showForm){
      setShowForm(false)
    }else{
      history.push('/');
    }
  }

  const handleContinuar = ()=>{
    if (showForm){
      addProyect();
    }
  }

  const addCreateProyect = ()=>{
    setShowForm(true);
  }

  const setEscribir = ()=>{
    if (showForm){
      setEscribiendo(true);
    }
  }

  const commands = getCommandsPage({handleBack , addCreateProyect ,handleContinuar,setEscribiendo,setEscribir});
  const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});

  useEffect(()=>{
    if(escribiendo && listening){
        resetTranscript();
        setTituloInput(finalTranscript);
    }
  },[finalTranscript]);

  useEffect(()=>{
    if(!showForm)
      setEscribiendo(false);
  },[showForm]);

  return (
    <React.Fragment>
    <Typography variant = 'h3' sx = {{fontWeight:'bold'}}> Tus Proyectos</Typography>
    <Box className='containerProyect' display={'flex'} sx={{
      justifyContent:'center',
      flexWrap:'wrap',
      
    }}>
      
      <Box display={'flex'} sx={{
        justifyContent:'center',
        flexWrap:'wrap'
      }}>
        <AddProyect  setShowForm = {setShowForm}/>
        {
          proyects.map((p,i)=>{
            return (
            <Proyecto 
            key={'proyect'+i} proyect = {p}
            ></Proyecto>
            )
          })
        }
        
      </Box>
    </Box>

        {showForm?
        <React.Fragment>
          <ProyectoForm setTitulo = {setTituloInput} titulo = {tituloInput} agregarProyecto = {addProyect} close = {close}/>
          </React.Fragment>
        :null}

        <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
        </Box>
    </React.Fragment>
  )
}
