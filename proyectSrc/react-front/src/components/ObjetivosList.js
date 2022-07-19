
import React,{useEffect,useState} from 'react';
import {Grid, Typography} from '@mui/material';


export default function ObjetivosList(props){
    const [objetivos,setObjetivos] = useState([]);

    const setCurrObjetivos = ()=>setObjetivos(props.objetivos);
    
    useEffect(setCurrObjetivos,[props.objetivos]);

    return(
        <React.Fragment>
                <Grid item container sx = {{bgcolor:'#1DB5BE', width:'100%',height:'20%'}}   color = 'white' alignItems = 'center'>
                    <Grid item  sx = {{width : '100%'}}>
                        <Typography fontWeight='bold' color = 'white'  textAlign='left' ml={4} fontSize={30}>
                            Próximos Objetivos
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item  sx = {{overflowY :'auto', width:'100%',bgcolor:'#D9D9D9',height:'80%'}}>
                    <Grid item container sx = {{bgcolor:'#D9D9D9', height : '100%'}} direction = 'row'>
                            {objetivos.map((obj,idx)=>{
                                const fecha = new Date(obj.Fecha);
                                const fechaStringArr = [String(fecha.getDate()),String(fecha.getMonth()+1),String(fecha.getFullYear())]
                                const stringFecha = fechaStringArr.join('/');
                                return (
                                <Grid container key = {idx} item xs ={12} height = '100px'  direction = 'column'>
                                    <Typography variant = 'h5'>
                                        {obj.Titulo + " - "+stringFecha}
                                    </Typography>
                                    <Typography variant = 'h6'>
                                        {obj.Descripcion}
                                    </Typography>
                                   
                                </Grid>
                            )})}
                    </Grid>

            </Grid>
        </React.Fragment>
    );
}