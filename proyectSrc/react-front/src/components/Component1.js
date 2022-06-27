import React from "react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Component1(){
    return (
        <React.Fragment>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} my={45} mx={95} variant = 'h3'>
                    Presentación de la Aplicación
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} my={-40} mx={130} variant = 'h3'>
                    Usuario 1
                </Typography>
            </Box>

        </React.Fragment>
    );
}