import React from "react";
import MicIcon from '@mui/icons-material/Mic';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { orange, red, blue, green } from '@mui/material/colors';
import { useHistory } from "react-router-dom";

/*
    en este archivo se mostraran las funcionalidades del software 
    - Gestion de Proyectos y objetivos.
    - Tarjetas de Repaso.
    - Dame Algo que hacer.
    - Organizador de Actividades.
*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius:'5%',
    color: theme.palette.text.secondary,
  }));


export default function MostrarFuncionalidades() {
    let history = useHistory()
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={11}>
                            <Typography sx={{fontWeight: 'bold'}} variant = 'h3'>
                                    Explore Nuestras Funcionalidades
                            </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Stack direction="row" spacing={3}>
                                    <img    style={{borderRadius: '50%'}}
                                            src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
                                            width= "100" 
                                            height="100"
                                            /> 
                                    <MicIcon sx={{ width: 90, height: 90 }}/>                     
                                </Stack>      
                            </Grid>
                    </Grid>
                </Box>   
                <Box sx={{flexGrow: 1  }}>
                    <Grid container justifyContent="center"  rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        <Grid item xs={6}>
                            <Item>
                            <Paper sx={{borderRadius:'5%', backgroundColor:green[700], '&:hover': {backgroundColor: green[500]}, padding: 25}}><Typography sx={{ fontSize:40, color:'white'}}>Gestione sus Proyectos</Typography></Paper>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                            <Paper onClick={()=>{history.push('/Mazos')}} sx={{borderRadius:'5%', backgroundColor:blue[700], '&:hover': {backgroundColor: blue[500]}, padding: 25}}><Typography sx={{fontSize:40, color:'white'}}>Tarjetas de Repaso</Typography></Paper>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                            <Paper sx={{borderRadius:'5%', backgroundColor:red[700], '&:hover': {backgroundColor: red[500]}, padding: 25}}><Typography sx={{fontSize:40, color:'white'}}>Dame Algo que hacer</Typography></Paper>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <Paper sx={{borderRadius:'5%', backgroundColor:orange[700], '&:hover': {backgroundColor: orange[600]},padding: 25}}><Typography sx={{fontSize:40,color:'white'}}>Organizador de Actividades</Typography></Paper>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}   