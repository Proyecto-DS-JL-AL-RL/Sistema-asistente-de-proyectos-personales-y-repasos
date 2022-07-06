import React from 'react'
import './mensajeAlert.css'
export default function MensajeAlert(props) {
  return (
    <div className='mensaje-alert' onClick={()=>{props.visible(null)}}>
        <div className='borde-mensaje'>
            <div className='content-alert'>
                <img src="https://i.pinimg.com/originals/1b/97/9a/1b979a56494bb752665079b0337e19ba.jpg"/>
                <div>
                    {props.mensaje}
                </div>
            </div>
        </div>
            
    </div>
  )
}
