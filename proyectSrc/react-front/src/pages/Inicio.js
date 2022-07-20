import React, {useState} from "react";
import Login from '../components/Login.js'
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
//import Grid from '@mui/material/Grid';
import './Inicio.css'
//import img from './img/aver.jpg'
import {  Typography } from '@mui/material';
//import Stack from '@mui/material/Stack';
import Presentacion from './Presentation.js'


/*const useStyles = styled({
  bg: {
    backgroundColor: "grey"
  },
  copyright: {
    color: "white"
  }
});*/

//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>


const Copyright = function Copyright(props) {
                    return (
                          <Typography
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
/*
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

*/
export default function Inicio(){
    //const classes = useStyles();
    const [showinfo, setshowInfo] = useState(true)
    return (
      <React.Fragment>
        <div > 
          <div className="split left">           
          {showinfo?<div className="centered-logo ">
                    <Presentacion/>
              </div>: 
              <div  className="centered">
                    <Typography  className="Titulo" variant="h2">¿Que es Titulo?</Typography>
                    <Typography  className="container-phrases" variant="h5">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                      when an unknown printer took a galley of type and scrambled it to make a type 
                      specimen book. It has survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged. It was popularised in the 
                      1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                      recently with desktop publishing software like Aldus PageMaker including versions of 
                      Lorem Ipsum.dedede
                    </Typography>
                    <Typography  className="Titulo" variant="h2">¿Quienes somos?</Typography>
                    <Typography  className="container-phrases" variant="h5">
                        Somos un grupo de estudiantes 🤓 de la carrera de ciencia en computación 💻 orientados
                        al desarrollo de software. Tenemos como meta crear tecnología para el alcanze de todos
                        los úsuarios.🤗
                    </Typography>
                    <Typography  className="Titulo" variant="h2">Créditos</Typography>
                    <Typography  className="container-phrases" variant="h5">
                      Creditos al creador de Menhera-chan. Usamos la imágens de manera referencial
                      no perdemos ni ganamos nada. Solo nota.
                    </Typography>
              </div>}
          </div>
          
          <div className="split right">
                <div className="centered-logo">
                <Typography className="Titulo-logo" variant="h1">Titulo</Typography>
                  <div className="container-phrases-logo">
                      Deseamos que 
                      <div className="flip">
                        <div><div>Aprendas</div></div>
                        <div><div>Organices</div></div>
                        <div><div>Mejores</div></div>
                      </div>
                      Tú puedes! 🤗
                  </div>
                      <Login/>  
                      <Copyright/>
                  </div>
          </div>
                   
        </div>
        
       
        
      </React.Fragment>
        );
    }
  //history.push('/Presentacion')