import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { ocultarTutorial } from '../../stores/sliceTutorial';
import ClearIcon from '@mui/icons-material/Clear';

import './ayuda.css'
export default function DisplayTutorial() {
    const tutorial = useSelector((state)=>state.tutoriales.value)
    const dispatch = useDispatch();
    const handleCerrar = () =>{
        dispatch(ocultarTutorial());
    }
    useEffect(()=>{
        if(!tutorial)return;
        const divTut = document.getElementById("contenido-tutorial");
        divTut.innerHTML = tutorial.content;
    },[])
  return (
    <div className='ayuda-contenedor-top'>
        <div className="contendor-info-ayuda">
            <button className="cerrar-ayuda"  onClick={handleCerrar}>
                <ClearIcon sx={{color:'white',fontSize:'2em','&:hover':{color:'black'}}}/>
            </button>
            <div id="contenido-tutorial">

            </div>
        </div>
            
        
    </div>
  )
}
