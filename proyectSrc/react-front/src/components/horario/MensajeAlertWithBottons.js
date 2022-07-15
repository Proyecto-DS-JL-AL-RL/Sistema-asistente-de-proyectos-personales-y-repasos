import React from 'react'
import './mensajeAlert.css'
import ClearIcon from '@mui/icons-material/Clear';
export default function MensajeAlertWithBottons(props) {
  return (
    <div className='mensaje-alert' onClick={()=>{props.visible(null)}}>
        
            
            <div className='content-alert'>
                <button className='button-close1' onClick={()=>{props.visible(null)}}>
                    <ClearIcon sx={{color:'white',fontSize:'30px','&:hover':{color:'black'}}}/>
                </button>
                <img src="https://i.pinimg.com/originals/1b/97/9a/1b979a56494bb752665079b0337e19ba.jpg"/>
                <div>
                    {props.mensaje}
                </div>
                <div>
                    <button onClick={()=>{props.onAccept()}}>
                        Si
                    </button>
                    <button>
                        No
                    </button>
                </div>
            </div>
        
            
    </div>
  )
}
