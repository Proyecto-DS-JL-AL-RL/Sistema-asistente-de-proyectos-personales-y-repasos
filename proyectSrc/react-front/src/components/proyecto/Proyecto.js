import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './proyect.css';
export default function Proyecto(props) {
  const [avance,setAvance] = useState(20);
  const [proyect,setProyect] = useState(null)
  const history = useHistory();

  const handleRedirect=()=>{
    if (proyect){
      history.push('/proyecto/'+proyect._id);
    }
  };

  useEffect(()=>{
    setProyect(props.proyect);
    if (props.proyect.ActividadSemanal){
      let sum = props.proyect.ActividadSemanal.reduce((a,b)=>a+b,0);
      let avg = 100*(sum/7);
      setAvance(avg);
    }
  },[props.proyect]);

  return (
    <Box width={250} sx={{
      mx:2,
      boxShadow:6,
      my:1,
      position:'relative',
      pb:'60px',
      minHeight:70,
      borderRadius:1
    }}
    onClick = {handleRedirect}
    >
        <Typography variant='h5' align='center' 
        style={{wordWrap:'breack-word'}}
        sx={{
          pt:1
        }}>
            {proyect?.Titulo}
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
