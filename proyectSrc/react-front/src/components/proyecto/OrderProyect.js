import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
const tipos = ['Importancia','Fecha','Progreso']
export default function OrderProyect() {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      
    }}>
      <Typography>
        Ordenar por: 
      </Typography>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      {tipos.map((e,i)=>{
        return <BottomNavigationAction key={'tipo'+i} label={e}
          />
      })}
      </BottomNavigation>
      
    </Box>
  )
}
