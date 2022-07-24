import Handyman from '@mui/icons-material/Handyman'
import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';


import { mostrarAyuda } from '../../stores/sliceAyuda';
import SR,{ useSpeechRecognition } from 'react-speech-recognition';


import './ayudaInicial.css'
export default function AyudaInical(props) {
  const dispatch = useDispatch();
  const {listening,transcript} = useSpeechRecognition();
  const handleAyuda = () =>{
      dispatch(mostrarAyuda());
  }
  const verSeleccionables = () =>{
    const r = document.querySelector(':root');
    const colorPast =  r.style.getPropertyValue('--color-horario-6');
    if(colorPast!=='white' && colorPast!=='black') return;
    r.style.setProperty('--color-horario-6','#AAA');
    r.style.setProperty('--transition-for-item','background-color 0.3s');
    setTimeout(()=>{
      r.style.setProperty('--color-horario-6',colorPast);
      r.style.setProperty('--transition-for-item','None');

    },500)
    //console.log(colorPast);
  }
  const listen = ()=> { 
    if (listening)
      SR.stopListening();
    else
      SR.startListening({language:'es',continuous:false});   
    }
  
  return (
    <div className='actividad-description ayuda-vacia-contenido'>
      <div className='container-button-close'>
            <button className='button-close' onClick={props.closeAyuda}>
                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
            </button> 
        </div>
      <div className='ayuda-vacia-descripcion'>
      Aún no tienes ninguna actividad programada
      </div>
      <div className='descripcion-vacia-contentido'>
        <div>
          <div>
            
              Para empezar puedes dar click en una actividad, en los recuadros que contienen a
            
            <div className='content-center-ayuda ayuda-null'>
              <div className='item-horario' onClick={verSeleccionables}>
                ***
              </div>
            </div>
          </div>
          <div>
            Puedes ingresar a las configuraciones de tu horario
            <div className='content-center-ayuda'>
              <div className='item-horario ayuda-null' onClick={props.mostrarConfig}>
                <Handyman fontSize="inherit" sx={{fontSize:'1.2em'}}/>
              </div>
            </div>
          </div>
          <div>
            Puedes usar los iconos de ayuda y el microfono
          </div>
          <div className='content-center-ayuda'>
              <div className='ayuda-null'>
                <IconButton onClick={handleAyuda}>
                  <QuestionMarkRoundedIcon sx={{ color:'white', 
                  background:'green',fontSize:'2.5em',
                    p:1,borderRadius:50, mr:2}}/>
                </IconButton>
                
                  <IconButton onClick={listen}>
                  {listening?
                    <MicIcon sx={{p:1, borderRadius:50, background:'blue',
                    color:'white',fontSize:'2.5em' }}
                    />
                    :
                    <MicIcon sx={{p:1, borderRadius:50, background:'red',
                    color:'white', fontSize:'2.5em' }}                
                    />
                  }
                  </IconButton>
                
                
              </div>
          </div>
        </div>
        
        <img className='img-ayuda-vacia' src = './Help.jpg'/>
      </div>
      
    </div>
  )
}
