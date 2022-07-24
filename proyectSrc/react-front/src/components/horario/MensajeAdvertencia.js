import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'
import './MensajeAdvertencia.css'
export default function MensajeAdvertencia(props) {
  return (
    <div className='mensaje-advertencia'>
        <button className='button-close-advertencia' onClick={()=>{props.visible(null)}}>
            <ClearIcon sx={{color:'white',fontSize:'25px','&:hover':{color:'black'}}}/>
        </button>
        <div className='mensaje-advertencia-contenido'>
            
            <div className='ma-contenido'>
                {props.content || "Esto es una advertencia"}
            </div>
        </div>
        <div className='mensaje-advertencia-personaje'>
            <img src={props.imgContent ||'./badimage.jpg'}/>
        </div>
        <div className='mensaje-advertencia-comentario'>
            {props.comentario || 
            <>Aqui tienes un comentario
            <button className='btn-advertencia-ok'
            onClick={()=>{props.visible(null)}}>Ok</button>
            </>}
        </div>
    </div>
  )
}
