import React from "react";
import { Typography } from '@mui/material';
//import CustomizedAccordions from './componentesALL/Acordion'
/*const mazos = [{
    id: '1',
    titulo: 'Calidad de Software',
    descripcion: 'esto es un prueba porque estamos a punto de dar parcial de calidad de software pero no estudie asi que es tu turno de colaborar.'
  },
  {
    id:'2',
    titulo: 'Inteligencia Artificial',
    descripcion: 'esto es un prueba porque estamos a punto de dar parcial de AI pero no estudie asi que es tu turno de colaborar.'
  }, {
    id:'3',
    titulo: 'Interaccion humano computador',
    descripcion: 'esto es una prueba que no ira algun lado xd por ede mueres aaaa'
  }
  ]
 */ 
//<CustomizedAccordions getmazo={mazos}/>

export default function Component1(){

    return (
        <React.Fragment>
            <Typography variant = 'h1'>
                Componente 1
            </Typography>
            <Typography variant = 'h3'>
                Componente 1
            </Typography>
            <Typography variant = 'h4'>
                Componente 1
            </Typography>
        </React.Fragment>
    );
}