import React,{useEffect, useState,useContext} from 'react';
import { AccountContext } from '../AccountContext';
import {Button, Card, Grid, TextField, Typography,Box,Slider} from '@mui/material';
import axios from 'axios';




export default function ProyectoForm(props){
    
    const [titulo,setTitulo] = useState('');



    useEffect(()=>{
        setTitulo(props.titulo);
    },[props.titulo]);

    return(
        <React.Fragment>
            <Card sx = {{width:'40%',height:'330px', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px'}}>
                <Button onClick = {props.close} variant = 'contained' sx = {{bgcolor :'red',left:'94%'}} >X</Button>
                
                <Typography variant = 'h4'>
                    Creando un Proyecto
                </Typography>

                <Grid container direction = 'column' sx = {{width:'80%',marginLeft:'10%',marginTop:'20px'}} rowGap = {3} alignItems = 'center'>
                    <TextField label="Titulo" value = {titulo} sx = {{width : '100%'}} onChange = {(e)=>{props.setTitulo(e.target.value)}}>
                        asd
                    </TextField>
                    <Button variant = 'contained' color = 'success' sx = {{width : '200px',bgcolor:'#65D55C',borderRadius:'20px',color:'black',fontSize:'20px',fontWeight:'bold'}}
                        onClick = {props.agregarProyecto}>
                        Agregar
                    </Button>
                </Grid>
            </Card>
        </React.Fragment>
    );
}