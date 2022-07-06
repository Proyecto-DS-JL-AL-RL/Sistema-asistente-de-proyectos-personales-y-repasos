import React,{useState,useEffect} from "react";
import { Button,Grid,Box,Card, Typography } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const prueba = Array.from({length:3},(x,i)=>({titulo:'Actividad del Logro',descripcion:'Descripción',hasFile:true,fileTittle:'Archivo'}));
export default function LogrosShow (){
    const [logros,setLogros]  = useState(prueba);


    useEffect(()=>{
        console.log(logros);
    },[]);
    return(
        <React.Fragment>
            <Typography variant = 'h3'>
            Logros Recientes
            </Typography> 
            <Grid container item sx={{ height : '100%'}} direction = 'row' spacing={1}>
            {logros.map((logro,idx)=>(
                <Grid item key = {idx} sx ={{}} xs={12} mr = {2}>
                    <Card sx ={{height:'180px',padding:'20px'}}>
                        <Typography variant = 'h4'>
                            {logro.titulo}
                        </Typography>
                        <Typography variant = 'h5' sx = {{height:'50%'}}>
                            {logro.descripcion}
                        </Typography>
                        {logro.hasFile?
                        <Button sx = {{height:'50px'}} variant = 'contained'
                        href = 'https://github.com/Proyecto-DS-JL-AL-RL/Sistema-asistente-de-proyectos-personales-y-repasos'>
                            {logro.fileTittle}
                            <InsertDriveFileIcon />
                        </Button>
                        :
                        null
                        }
                    </Card>
                </Grid>
            ))}
            </Grid>
        </React.Fragment>
    );
}