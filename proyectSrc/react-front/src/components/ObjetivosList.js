
import React,{useEffect,useState} from 'react';
import {Grid, Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const colors = ['#C7C7C7','#EAEAEA']

export default function ObjetivosList(props){
    const [objetivos,setObjetivos] = useState([]);

    const setCurrObjetivos = ()=>setObjetivos(props.objetivos);
    
    useEffect(setCurrObjetivos,[props.objetivos]);

    return(
        <React.Fragment>
                <Grid item container sx = {{bgcolor:'#1DB5BE', width:'100%',height:'20%'}}   color = 'white' alignItems = 'center'>
                    <Grid item  sx = {{width : '100%'}}>
                        <Typography fontWeight='bold' color = 'white'  textAlign='left' ml={4} fontSize={30}>
                            Pendientes
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item  sx = {{overflowY :'auto', width:'100%',bgcolor:'#D9D9D9',height:'80%'}}>
                    <Grid item container sx = {{ height : '100%'}} direction = 'row'>
                            {objetivos.map((obj,idx)=>{
                                const fecha = new Date(obj.Fecha);
                                const fechaStringArr = [String(fecha.getDate()),String(fecha.getMonth()+1),String(fecha.getFullYear())]
                                const stringFecha = fechaStringArr.join('/');
                                return (
                                <Grid container sx ={{bgcolor:colors[idx%2]}} key = {idx} item xs ={12} minHeight = '100px'  direction = 'column'>
                                    <Typography variant = 'h5'>
                                        {obj.Titulo + " - "+stringFecha}
                                    </Typography>
                                    <Typography variant = 'h6'>
                                        {obj.Descripcion||'_'}
                                    </Typography>
                                    <Button variant = 'contained' color = 'info' sx = {{height:'22px',cursor : 'pointer',width:'30%',marginLeft:'35%'}} onClick={()=>props.handleDelete(obj._id)} >
                                        <DeleteIcon/>
                                    </Button>  
                                </Grid>
                                
                            )})}
                    </Grid>

            </Grid>
        </React.Fragment>
    );
}