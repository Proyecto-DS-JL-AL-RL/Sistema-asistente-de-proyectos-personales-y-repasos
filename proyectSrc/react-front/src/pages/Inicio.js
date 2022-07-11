import React from "react";
import Login from '../components/Login.js'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import img from './img/aver.jpg'
import { Container, Typography, Link } from '@mui/material';

const useStyles = styled({
  bg: {
    backgroundColor: "grey"
  },
  copyright: {
    color: "white"
  }
});
//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>


const Copyright = function Copyright(props) {
                    return (
                          <Typography
                            className={props.className.copyright}
                            variant="body2"
                            color="textSecondary"
                            align="center"
                          >
                            {"Copyright © "}
                            {new Date().getFullYear()}
                            {" "}
                            {"Página reservada por derechos de autor"}
                            {"."}
                          </Typography>
                    );
                  }
//const darkTheme = createTheme({ palette: { mode: 'dark' } });
//sx={{ flexGrow: 1 }} mt={10} justifyContent: 'space-between', flexWrap:'wrap', display: 'flex', textAlign: 'center', 
export default function Inicio(){
    const classes = useStyles();

    return (
      <React.Fragment>
          <Box  sx={{width: '100%' }}>
            <Grid container sx={{justifyContent: 'space-between', flexWrap:'wrap', display: 'flex', textAlign: 'center'}} spacing={2} columnSpacing={{ xs: 5, sm: 2, md: 10 }}>
                  <Grid item  xs={8}>
                        <Box sx={{boxShadow: 16, pb:'10%'}}>
                          <Typography variant="h1">Titulo</Typography>
                              <Typography sx={{justifyContent: 'space-between'}}>
                                Titulo quiere acompañarte en tus estudios y proyectos dandote lo mejor.
                              </Typography>
                              <img  width={'50%'} height={'50%'} src={img} alt="algo"/>
                          <Typography variant="h4">¿Que es Titulo?</Typography>
                              <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Typography>
                          <Typography variant="h4">Vision</Typography>
                              <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Typography>
                          <Typography variant="h4">¿Quienes somos?</Typography>
                              <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                            
                              </Typography>
                        </Box>
                  </Grid>
                  <Grid item xs={4}>  
                              <Login/>                            
                  </Grid>
                </Grid>
                <Container sx={{mt:6}} className={classes.bg}>
                      <Copyright className={classes}/>
                </Container>
          </Box>
      </React.Fragment>
        );
    }
  //history.push('/Presentacion')