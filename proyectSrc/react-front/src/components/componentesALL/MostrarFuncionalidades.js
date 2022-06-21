import React from "react";
import MicIcon from '@mui/icons-material/Mic';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { orange, red, blue, green } from '@mui/material/colors';

/*
    en este archivo se mostraran las funcionalidades del software 
    - Gestion de Proyectos y objetivos.
    - Tarjetas de Repaso.
    - Dame Algo que hacer.
    - Organizador de Actividades.
*/
const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(30),
    textAlign: 'center',
  }));


export default function MostrarFuncionalidades() {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={11}>
                            <Typography variant = 'h3'>
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
                <Box sx={{lexGrow: 1  }}>
                    <Grid container justifyContent="center"  rowSpacing={1} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        <Grid item xs={6}>
                            <Button>
                            <Paper sx={{ backgroundColor:green[500], '&:hover': {backgroundColor: green[700]}, padding: 34}}><Typography sx={{color:'black'}}>Gestione sus Proyectos</Typography></Paper>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button>
                            <Paper sx={{ backgroundColor:blue[500], '&:hover': {backgroundColor: blue[700]}, padding: 35}}><Typography sx={{color:'black'}}>Tarjetas de Repaso</Typography></Paper>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button>
                            <Paper sx={{backgroundColor:red[500], '&:hover': {backgroundColor: red[700]}, padding: 36}}><Typography sx={{color:'black'}}>Dame Algo que hacer</Typography></Paper>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button>
                                <Paper sx={{backgroundColor:orange[500], '&:hover': {backgroundColor: orange[700]},padding: 29}}><Typography sx={{color:'black'}}>Organizador de Actividades</Typography></Paper>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}   