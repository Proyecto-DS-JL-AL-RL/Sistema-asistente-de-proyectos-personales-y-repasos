import React from "react";
import Login from '../components/componentesALL/login.js'
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(20),
  textAlign: 'center',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
//sx={{ flexGrow: 1 }} mt={10}
export default function Inicio(){
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 45, md: 10 }}>
            <Grid item xs={5.5} mt={45} >
                    <ThemeProvider theme={darkTheme}>
                          <Item ><Login/></Item>
                    </ThemeProvider>
                </Grid>
              <Grid item xs={1}>
                </Grid>
                    <img   
                          src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
                                            width= "45%" 
                                            height="45%"
                                            />
            </Grid>
        </Box>
      </React.Fragment>
        );
    }