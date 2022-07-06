import React,{useEffect, useState} from 'react';
import {Button, Card, Grid, TextField, Typography} from '@mui/material';


export default function ObjetivoForm(props){

    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');

    const agregarActividad = ()=>{
        if (titulo == ''){
            alert('Ponga un titulo');
            return;
        }

        const Item = {
            titulo:titulo,
            descripcion:descripcion
        }
        props.setActivities([...props.activities,Item])
        props.close();
    }


    return(
        <React.Fragment>
            <Card sx = {{width:'40%',height:'40%', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px'}}>
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
                    <Button variant = 'contained' color = 'success' sx = {{width : '200px',bgcolor:'#65D55C',borderRadius:'20px',color:'black',fontSize:'20px',fontWeight:'bold'}}
                        onClick = {agregarActividad}>
                        Agregar
                    </Button>
                </Grid>
            </Card>
        </React.Fragment>
    );
}