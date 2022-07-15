import React from 'react'
import './MensajesCompletos.css'
import ClearIcon from '@mui/icons-material/Clear';
export default function MensajesCompletos(props) {
  return (
    
    <div className='ctn-mensajes-completos'>
        {console.log("HoLA")}
        <div className='close-mensaje'>
            <ClearIcon onClick={()=>{props.visible(null)}}  sx={{color:'white',fontSize:'15px','&:hover':{color:'black'}}}/>
        </div>
        <img className='img-mensaje' src='./bienImage.jpg'/>
        <div className='content-menjase'>
            {props.content}
        </div>
        

    </div>
    
        
  )
}
