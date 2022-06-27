import React from "react";
import Login from '../components/componentsLiq/Login.js'
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
export default function Inicio(){
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10  }}>
            <Grid item xs={3} mt={35}  md = {10} sm={10} lg ={4} xl = {4.5}>
                          <Item ><Login/></Item>
                </Grid>
              <Grid item xs={6.5}  mt={20}>
                        ok
                </Grid>
            </Grid>
        </Box>
      </React.Fragment>
        );
    }