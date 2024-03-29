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
import  ReactDOMServer from 'react-dom/server';

import './proyectos.css'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePage, restoreContent } from '../stores/sliceAyuda';
import { BACK_IP } from '../publicConstants';
import { changeTutorial, restoreContentTutorial } from '../stores/sliceTutorial';

export default function Proyectos(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [proyects,setProyects] = useState([]);

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

  const AdvertenciaNoInit = () =>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"Usuario no inicializado"}
    comentario={<>
            Parece que hubo un problema al momento de preparar la bienvenida a su usuario. Estamos trabajando en ello. Pruebe recargar la página. O vuelva en un rato.
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
      axios.get(BACK_IP+'/api/Proyectos/'+sub)
        .then(data=>{
          if(data.data.error){
            setProyects([]);
            if(data.data.error == 'no_init'){
              setMensajeAdvertenciaDisplay(AdvertenciaNoInit);
            }
          }else
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
        axios.post(BACK_IP+'/api/Proyectos/addProyect',proyect_)
          .then(data=>{
            setShowForm(false);
            getProyects();
            setTituloInput("");
          }).catch(err=>console.log(err));
      }      
  };
  
  

  useEffect(()=>{
    props.showAdd.setShowAnadir({card:false, icon:false})            
    const aa = <div className='sugerencia-contenido'>
        <div className='sugenrencia-contenido-img'>
        
            <img  src='./Sugerencia.jpg'/>
            <div>Sugerencia</div>
        </div>
        <div className='sugerencia-contenido-descripcion'>
            Aca veras Listados los proyectos que crees. 
            <div className='sugerencia-descripcion'>
              Tu proyecto base es el que tiene tu nombre usuario. 
            </div>
            <div className='sugerencia-descripcion'>
              La función de eliminar esta dentro del proyecto. Obviamente no podrás eliminar tu proyecto Base :) 
            </div>
            <div className='sugerencia-descripcion'>
              Las barras rosas indican hace cuanto que no has sumado actividad 
            </div>
        </div>
    </div>
    const tuto = <div className='sugerencia-contenido'>
    <div className='sugenrencia-contenido-img'>
    
    <img  src='./microphonehelp.jpg'/>
        <div>Tutorial Interfaz de Voz</div>
    </div>
    <div className='sugerencia-contenido-descripcion-600'>

        <div className='sugerencia-descripcion-margin'>
            "Crear/Nuevo/Agregar Proyecto"  : Inicia crear un nuevo proyecto 
        </div>
        <div className='sugerencia-descripcion-margin-subititle'>
           Mientras esta creando un nuevo proyecto:
        </div>
        <div className='sugerencia-descripcion-margin'>
            "Agregar"  : Termina de crear el nuevo Proyecto
        </div>
        <div className='sugerencia-descripcion-margin'>
            "Volver/Atrás"  : Cierra el formulario de crear Proyecto
        </div>        
        <div className='sugerencia-descripcion-margin'>
            "Título [Contenido]" : Llena el campo de Titulo
        </div>
    </div>
</div>
    const component=ReactDOMServer.renderToString(aa);
    const tutorial_=ReactDOMServer.renderToString(tuto);
    dispatch(changePage({content:component,title:"Gestión de Proyectos"}));
    dispatch(changeTutorial(tutorial_));
    getProyects();

    return ()=>{
      dispatch(restoreContent);
      dispatch(restoreContentTutorial);
    }
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
    if (!showForm){
      setShowForm(true);
      setTituloInput('')
    }
  }



  const commands = getCommandsPage({handleBack , addCreateProyect ,handleContinuar,setTituloInput});
  const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});




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
