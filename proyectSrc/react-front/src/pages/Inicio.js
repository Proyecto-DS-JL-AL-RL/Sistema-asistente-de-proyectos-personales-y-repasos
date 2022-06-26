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
  padding: theme.spacing(15),
  textAlign: 'center',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
//sx={{ flexGrow: 1 }} mt={10}
export default function Inicio(){
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
            <Grid item xs={3} mt={45}  md = {10} sm={10} lg ={4} xl = {4.5}>
                    <ThemeProvider theme={darkTheme}>
                          <Item ><Login/></Item>
                    </ThemeProvider>
                </Grid>
              <Grid item xs={6.5}  mt={20}>
                    <img   
                        src={"https://drive.google.com/uc?export=view&id=1e9TrTH56TwOvOuKBPzIwfEuZwrz605sn"}
                                                  width= "100%" 
                                                  height="100%"
                                                  />

                </Grid>
            </Grid>
        </Box>
      </React.Fragment>
        );
    }