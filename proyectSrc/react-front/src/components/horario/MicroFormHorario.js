import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import "./micHorario.css";
export default function MicroFormHorario(props) {
  return (
    <div className='ctn-mic-horario' onClick={()=>{props.setVisible(null)}}>
        <div className='all-mic-horario'>
            <div className='palabras-mic'>
                Pruebe decir:
            </div>
            <div className='palabras-mic'>
            Quiero una tarea con ‘nombre’,
            su acronimo es 'acronimo',
            que tenga una ‘descripción’
            el dia 'dia', incia de 'inicio' hasta 'fin'
            </div>
            <div className='micro-llenar'>
                <MicIcon  sx={{ fontSize: '5em',color:'white','&:hover':{color:'green'} }} />
            </div>
        </div>
    </div>
  )
}
