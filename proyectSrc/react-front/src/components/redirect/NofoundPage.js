
import React, { Component } from 'react'
import './nofoundPage.css'

import StyleIcon from '@mui/icons-material/Style';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';

const opcionesDefault = [
    {page:'/proyectos',icon:<DashboardIcon sx={{fontSize:'1.5em'}}/>},
    {page:'/Mazos',icon:<StyleIcon sx={{fontSize:'1.5em'}}/>},
    {page:'/horario',icon:<CalendarViewWeekIcon sx={{fontSize:'1.5em'}}/>},
    {page:'/algoQueHacer',icon:<PlayCircleFilledWhiteIcon sx={{fontSize:'1.5em'}}/>},
    {page:'/',icon:<HomeIcon sx={{fontSize:'1.5em'}}/>}
]

export default function NofoundPage() {
    const history = useHistory();
 
    return (
      <div className='content-no-found'>
        <div className='contenido-all-no-found'>
        <img className='no-found-img' src="./Existe.jpg"/>
        <div>
            <div className='adver-no-found'>
                No he podido encontrar la pagina que escogiste, puede que 
                tengamos un problema
            </div>
            <div>
                <div className='coment-no-found'>
                    Prueba con estas opciones que te llevaran a nuestras funcionalidades.
                </div>
                <div className='content-buttons-rediret-no-found'>
                    {opcionesDefault.map((e)=>{
                        return <button className='button-redirect-no-found' onClick={()=>{history.push(e.page)}}>
                            {e.icon}
                        </button>
                    })}
                </div>
            </div>
        </div>
        </div>
        
      </div>
    )
  
}
