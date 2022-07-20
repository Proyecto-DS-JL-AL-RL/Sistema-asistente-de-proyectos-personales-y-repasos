import React from 'react'
import './escuchandoDisplay.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
export default function EscuchandoDisplay(props) {
  return (
    <div className='content-display-escuchando'>
        {props.mensaje.substr(Math.max(0,props.mensaje.length-30),props.mensaje.length) || "Te estamos escuchando"}
        <VolumeUpIcon/>
    </div>
  )
}
//.substr(Math.max(0,props.mensaje.length-40),props.mensaje.length)