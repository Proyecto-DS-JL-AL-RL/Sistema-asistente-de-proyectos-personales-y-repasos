import { Box } from '@mui/material'
import React,{useState} from 'react'
import AddProyect from '../components/proyecto/AddProyect';
import OrderProyect from '../components/proyecto/OrderProyect';
import Proyecto from '../components/proyecto/Proyecto'

import './proyectos.css'
export default function Proyectos() {
  const [proyects,setProyects] = useState(Array.from({length:10},(e,i)=>{
    return {
      proyectName:'Proyecto'+i + (Math.random()>0.5?' asdfasdfasdfasfd':''),
      avance: Math.floor((Math.random()*100)*100)/100
    }
  }));
  return (
    <Box className='containerProyect' display={'flex'} sx={{
      justifyContent:'center',
      flexWrap:'wrap',
      
    }}>
      <OrderProyect></OrderProyect>
      <Box display={'flex'} sx={{
        justifyContent:'center',
        flexWrap:'wrap'
      }}>
        <AddProyect/>
        {
          proyects.map((e,i)=>{
            return <Proyecto key={'proyect'+i} proyectName={e.proyectName}
            avance={e.avance}
            ></Proyecto>
          })
        }
        
      </Box>
    </Box>
      
  )
}
