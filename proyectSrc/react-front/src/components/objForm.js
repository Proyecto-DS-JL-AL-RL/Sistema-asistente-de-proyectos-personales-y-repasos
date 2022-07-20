import React,{useEffect, useState,useContext} from 'react';
import { AccountContext } from '../AccountContext';
import {Button, Card, Grid, TextField, Typography,Box,Slider} from '@mui/material';
import axios from 'axios';
import MensajeAdvertencia from './horario/MensajeAdvertencia';

export default function ObjetivoForm(props){
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
    const {sessionState} = useContext(AccountContext);
    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [peso,setPeso] = useState(4);


    const AdvertenciaT = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Parece que su Nuevo Pendiente no tiene un Titulo"}
        comentario={<>
                Debe ponerle un Titulo a su pendiente para poder identificarlo.
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    ok
                </button>
                </>}
        />
    }
    const agregarActividad = async ()=>{
        const {sub} = sessionState;
        if (sub){
            if (titulo == ''){
                setMensajeAdvertenciaDisplay(AdvertenciaT);
                return;
            }
    
            const Item = {
                Titulo:titulo,
                Descripcion:descripcion,
                Peso:peso,
                ProyectoAsociado: props.idProyecto,
                Puntos: peso*70,
                Fecha: new Date(),
                UserSub: sub
            }
            
            axios.post('http://localhost:4000/api/Proyectos/addObjetivo',{objetivo: Item , proyectId: props.idProyecto })
                .then(data=>{
                    console.log(data);
                    props.setActivities([...props.activities,Item])
                    props.close();
                })
                .catch(err=>console.log(err));           
        }
    }


    return(
        <React.Fragment>
            <Card sx = {{width:'40%',height:'60%', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px'}}>
                <Button onClick = {props.close} variant = 'contained' sx = {{bgcolor :'red',left:'94%'}} >X</Button>
                
                <Typography variant = 'h4'>
                    Agregando un Objetivo
                </Typography>

                <Grid container direction = 'column' sx = {{width:'80%',marginLeft:'10%',marginTop:'70px'}} rowGap = {3} alignItems = 'center'>
                    <TextField label="Titulo" value = {titulo} sx = {{width : '100%'}} onChange = {(e)=>{setTitulo(e.target.value)}}>
                        asd
                    </TextField>
                    <TextField label = "descripcion" value = {descripcion} sx = {{width : '100%'}}  onChange = {(e)=>{setDescripcion(e.target.value)}}>
                        asd
                    </TextField>
                    <Grid container sx = {{width:'100%', direction : 'row'}} alignItems = 'center' justifyContent = 'center'>
                    <Typography sx = {{ paddingTop :'7px'}} variant = 'h6' >
                            Importancia {peso}
                        </Typography>
                        <Box sx={{ width: 300 ,paddingTop:'7px',marginLeft:'10px'}}>
                        <Slider
                            min = {1}
                            max = {7}
                            step = {1}
                            defaultValue={4}
                            marks
                            value={peso}
                            onChange = {e=>{setPeso(e.target.value);}}
                            color="secondary"
                        />
                    </Box>
                    </Grid>
                    <Button variant = 'contained' color = 'success' sx = {{width : '200px',bgcolor:'#65D55C',borderRadius:'20px',color:'black',fontSize:'20px',fontWeight:'bold'}}
                        onClick = {agregarActividad}>
                        Agregar
                    </Button>
                </Grid>
            </Card>
            <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
            </Box>
        </React.Fragment>
    );
}