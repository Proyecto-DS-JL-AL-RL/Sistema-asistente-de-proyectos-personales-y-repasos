import  React from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

/*
    Panel de control usado para la modificación del sistema:
        - usar micro
        - notificaciones
    entre otros
*/

export default function PanelControl() {
    return (
        <React.Fragment>
             <Box sx={{ flexGrow: 1 }}>
             <Grid container justifyContent="center" spacing={1}  columns={16}>
                    <Grid item xs={9}>
                        <Typography variant = 'h4'>
                                        Panel de Control
                        </Typography>
                    </Grid>
                        <Grid item xs={2}>
                                    <MicIcon sx={{ width: 56, height: 56 }}/>                            
                        </Grid>
                </Grid>
            </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={4}>
                                <Typography  variant = 'h5'>Notificación</Typography>
                        </Grid>        
                        <Grid item xs={2}>
                                <Switch color="secondary"  inputProps={{ 'aria-label': 'controlled' }}defaultChecked/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={4}>
                                <Typography  variant = 'h5'>Mostrar ayuda de microfono siempre</Typography>
                        </Grid>        
                        <Grid item xs={2}>
                                <Switch color="secondary"  inputProps={{ 'aria-label': 'controlled' }}/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={4}>
                                <Typography  variant = 'h5'>Mensajes Emergentes</Typography>
                        </Grid>        
                        <Grid item xs={2}>
                                <Switch color="secondary"  inputProps={{ 'aria-label': 'controlled' }} defaultChecked/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={4}>
                                <Typography  variant = 'h5'>Tema</Typography>
                        </Grid>        
                        <Grid item xs={2}>
                                <Switch color="secondary"  inputProps={{ 'aria-label': 'controlled' }}/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={1}  columns={16}>
                        <Grid item xs={2}></Grid>        
                        <Grid item xs={2}>
                                <Typography sx={{color:'blue'}} variant = 'h7'>Opciones Avanzadas </Typography>
                        </Grid>
                    </Grid>
                
                </Box>

        </React.Fragment>
    );
  }


