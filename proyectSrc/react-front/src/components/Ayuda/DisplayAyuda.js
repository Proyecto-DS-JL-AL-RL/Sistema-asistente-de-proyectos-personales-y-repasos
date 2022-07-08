import React from 'react'
import { useDispatch } from 'react-redux'
import { ocultarAyuda } from '../../stores/sliceAyuda'
import './ayuda.css'
export default function DisplayAyuda(props) {
    const dispatch = useDispatch();
    const handleCerrar = () =>{
        dispatch(ocultarAyuda());
    }
  return (
    <div className='ayuda-contenedor-top'>
        <div className="contendor-info-ayuda">
            <button className="cerrar-ayuda"  onClick={handleCerrar}>x</button>
            {props.content}
        </div>
            
        
    </div>
  )
}
