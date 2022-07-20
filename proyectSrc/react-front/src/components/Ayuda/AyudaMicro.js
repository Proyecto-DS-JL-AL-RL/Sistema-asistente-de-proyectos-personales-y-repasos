import React from 'react'
import './ayudaMicro.css';
import MicIcon from '@mui/icons-material/Mic';
export default function AyudaMicro() {
  return (
    <div className='contendor-ayuda-micro'>
        <div className='content-ayuda-other'>
            <p className='negrita-resalt'>Recuerda puedes usar el micro dando click a:</p>
            <div className='micro-icon'>
                <MicIcon  sx={{p:1,  borderRadius:50, background:'transparent', color:'white',cursor:'pointer', width: 50, height: 50 ,'&:hover':{color:'green'} }}/>
            </div>
        </div>
        <div className='content-ayuda-other'>
            <p className='negrita-resalt'>Puedes ir a las distintas paginas:</p>
            Solo tienes que decir 
            
            <p className='negrita-resalt'>llevame a "nombre de la pagina"</p>
            <br/>
            Nombres de paginas:
            <ul>
                <li>Dame algo que hacer</li>
                <li>Gestionar Proyectos</li>
                <li>Ver Proyectos</li>
                <li>Mis Proyectos</li>
                <li>Quiero repasar</li>
                <li>Ver mis mazos</li>
                <li>Tarjetas de repaso</li>
                <li>Organizador de actividades</li>
                <li>Organizar actividades</li>
            </ul>
            Recuerda si usas directamente los nombre de las paginas no necesitas decir "llevame a"
        </div>
        <div className='content-ayuda-other'>
            <p className='negrita-resalt'>
                Puedes llenar los formularios de forma tradicional o con la voz
            </p>
            <img src="./EjemplodeForm.png" width={'50%'}/>
            Solo tiene que decir:<br/>
            "Escribir nombre_del_campo nombre"<br/>
            Ejemplo puede decir <p className='negrita-resalt'>escribir nombre Quimica</p><br/>
            Presta atencion al cuadro morado, el lo que escucha el sistema
            <img src="./DisplayMensajeAudio.png" width={'30%'}/>
            Y esto dara por resultado
            <img src='./LaterForm.png' width={'50%'}/>
        </div>
    </div>
  )
}
