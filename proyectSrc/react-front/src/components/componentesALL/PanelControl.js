import  React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';



export default function PanelControl(){
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    return  (
        <React.Fragment>
            <Typography variant = 'h3'>
                Panel de Control
            </Typography>
            <Box  sx={{ width: 500 }} >
                <Grid  container justifyContent="center" sx = {{height : '50%'}} direction = 'column'>
                    <Grid item>
                        <Typography variant = 'h5'>
                                Notificación
                        </Typography>
                        <Typography variant = 'h5'>
                            Mostrar Ayuda de micrófono siempre
                        </Typography>
                        <Typography variant = 'h5'>
                            Mensajes emergentes
                        </Typography>
                        <Typography variant = 'h5'>
                                Tema
                        </Typography>
                    </Grid> 
                    <Grid item>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );


}