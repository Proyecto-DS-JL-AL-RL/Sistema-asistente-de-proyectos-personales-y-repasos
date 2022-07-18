import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { ocultarAyuda } from '../../stores/sliceAyuda'
import ClearIcon from '@mui/icons-material/Clear';

import './ayuda.css'
export default function DisplayAyuda() {
    const ayuda = useSelector((state)=>state.ayuda.value)
    const dispatch = useDispatch();
    const handleCerrar = () =>{
        dispatch(ocultarAyuda());
    }
    useEffect(()=>{
        if(!ayuda)return;
        const divAyuda = document.getElementById("contenido-ayuda");
        divAyuda.innerHTML = ayuda.content;
    },[])
  return (
    <div className='ayuda-contenedor-top'>
        <div className="contendor-info-ayuda">
            <button className="cerrar-ayuda"  onClick={handleCerrar}>
                <ClearIcon sx={{color:'white',fontSize:'2em','&:hover':{color:'black'}}}/>
            </button>
            <div id="contenido-ayuda">

            </div>
        </div>
            
        
    </div>
  )
}
