import { Box, Typography } from '@mui/material'
import { display } from '@mui/system';
import React, { useEffect, useState } from 'react'
import './proyect.css';
export default function Proyecto(props) {
  const [avance,setAvance] = useState(20);
  const [proyectName,setProyectName] = useState('Algún título tendra')
  useEffect(()=>{
    
    if(props.avance) setAvance(props.avance);
    if(props.proyectName) setProyectName(props.proyectName);
  },[])
  return (
    <Box width={250} sx={{
      mx:2,
      boxShadow:6,
      my:1,
      position:'relative',
      pb:'60px',
      minHeight:70,
      borderRadius:1
    }}>
        <Typography variant='h5' align='center' 
        style={{wordWrap:'breack-word'}}
        sx={{
          pt:1
        }}>
            {proyectName}
        </Typography>
        <Box className='porcentaje' sx={
          
          {
          position:'absolute',
          bottom:0,
          
          height:30,
          width:'100%',
          backgroundColor:'black',
          background:`linear-gradient(90deg, yellow 0%, yellow ${avance}%,violet ${avance}%, violet 100%)`,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          
          <Typography sx={{
            position:'absolute',
            fontSize:'1.5em',
            color:'black'
          }}>
            {avance+'%'}
          </Typography>
        </Box>
    </Box>
  )
}
