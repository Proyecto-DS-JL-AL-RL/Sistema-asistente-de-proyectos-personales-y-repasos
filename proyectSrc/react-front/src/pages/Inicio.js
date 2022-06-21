import React from "react";
import Login from '../components/componentesALL/login.js'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Inicio(){
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                <img 
                    src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
                    width= "100%" 
                    height="100%"
                    /> 
                </Grid>
                <Grid item xs={5}>
                    <Login/>
                </Grid>
            </Grid>
        </Box>
      </React.Fragment>
        );
    }