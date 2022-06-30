import React from 'react';
import { useEffect,useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge  from '@mui/material/Badge';


import './horario.css';
import { display, width } from '@mui/system';
const itemHorario = Array.from({length:200},(v,i)=>i);
const dias = 'L,M,M,J,V,S,D'.split(",");
const stateButton2String =  (state) =>{
    const stringState = ['Editar','Crear','Guardar'];
    return stringState[state];
}
export default function Horario() {
    const [stateButton,setStateButton] = useState(0);
    const [ocultarDescripcion, setOcultarDescripcion] = useState(true);
    useEffect(()=>{
        const elementos = document.getElementsByClassName('unlock-item');
        
        const tam = elementos.length;
        const descpHorario= document.getElementById('description-horario');
        
        for(let i=0;i<tam;i++){
            elementos[i].onclick = () =>{
                setOcultarDescripcion(false);
            }
            elementos[i].onmouseover = () =>{
                const descriptionContent = document.getElementById("description-content-horario");
                const tamDescriptionContent = descriptionContent.getBoundingClientRect();
                const tamDescription = descpHorario.getBoundingClientRect();
                descpHorario.style.display='block';
                const rectanguloElemento = elementos[i].getBoundingClientRect();
                const widthColumnAdd = i%7>3?-100:rectanguloElemento.width;
                descpHorario.style.left = `${rectanguloElemento.left + widthColumnAdd}px`;
                descpHorario.style.top = `${rectanguloElemento.top}px`;
            }
            elementos[i].onmouseout = () =>{
                descpHorario.style.display='None';
            }
        }
    },[]);
  return (
    <div className='horario-container'>
        <div id="root-horario">
            {
                itemHorario.map((e)=>{
                    let state = "unlock-item";
                    let content = e;
                    let horasclass = ""
                    if(e<8 || e%8==0) state = "lock-item";
                    if(e>0 && e<8) content = dias[e-1];
                    if(e%8==0){
                        content = Math.floor(e/8);
                        horasclass="horas-item"
                    } 
                    return <div className={"item-horario "+state +" "+horasclass} 
                    id={`item-horario-${e}`} key={`item-${e}`}>
                        {content}
                    </div>
                })

            }
            <div className='descp-item-horario' id='description-horario'>
                <div id="description-content-horario">Hola</div>
            </div>
            
        </div>
        {ocultarDescripcion?null:
        <div className='actividad-description'>
            
        <Badge 
        badgeContent={
            <button onClick={()=>{setOcultarDescripcion(true)}}>x</button>
        }
        sx={{
            
            width:'80%',
            mx:'auto',
            p:2,
            border:'2px solid black',
            backgroundColor:'white'    
        }}
        
        >
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': {mb:'20px',
            width:'100%'
            },
            
        }}
        noValidate
        autoComplete="off"
        >
        <div width={"100%"}>
            <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Nombre de la actividad"
            variant="standard"
            sx={{justifyContent:'center'}}
            />
            <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue="Hello World"
            variant="standard"
            />
            
            <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
                readOnly: true,
            }}
            variant="standard"
            />
            
            
            <TextField
            id="standard-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            variant="standard"
            />
        
        </div>
        <Box sx={{
            width:'100%',
            display:'flex',
            justifyContent:'center'
        }}>
            <Button variant="contained" >{stateButton2String(stateButton)}</Button>
            {stateButton==0?<Button variant="contained" >Eliminar</Button>:null}
        </Box>
        </Box>
        </Badge>
        
    </div>}
        
    </div>
    
  )
}
