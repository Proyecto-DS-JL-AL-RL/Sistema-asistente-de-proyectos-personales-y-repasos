import React, {useState} from "react";
import Login from '../components/Login.js'
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>

const Item = styled(Paper)(({ theme }) => ({
  border: '0.5px solid black',
  padding: theme.spacing(15),
  textAlign: 'center',
}));

//const darkTheme = createTheme({ palette: { mode: 'dark' } });
//sx={{ flexGrow: 1 }} mt={10}
export default function Inicio(props){
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10  }}>
                <Grid item xs={3} mt={35}  md = {10} sm={10} lg ={4} xl = {4.5}>
                              <Item ><Login/></Item>
                    </Grid>
                  <Grid item xs={6.5}  mt={20}>
                          esto es una prueba
                    </Grid>
                </Grid>
        </Box>
      </React.Fragment>
        );
    }
  //history.push('/Presentacion')