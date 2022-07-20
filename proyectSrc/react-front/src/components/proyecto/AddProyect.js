import { Box, Typography } from '@mui/material'
import React from 'react'
import PlusOneIcon from '@mui/icons-material/PlusOne';

export default function AddProyect(props) {
  return (
    <Box width={250} sx={{
        mx:2,
        boxShadow:5,
        my:1,
        position:'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        cursor:'pointer'
        }}
        onClick = {()=>{props.setShowForm(true)}}
        >
            <Box  sx={{
                borderRadius:50,
                
                border:4
            
            }}>
                <PlusOneIcon sx={{
                    fontSize:60
                }} />
            </Box>
            <Typography sx={{fontSize:'1.5em'}}>
            Mas Proyectos
            </Typography>
        
    </Box>
  )
}
