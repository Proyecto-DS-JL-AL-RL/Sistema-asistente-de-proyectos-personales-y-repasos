import React,{useState,useEffect} from "react";
import { Button,Grid,Card, Typography } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function LogrosShow (props){
    const [logros,setLogros]  = useState([]);
    const abrirUrl = url => {
        if (!url.match(/^https?:\/\//i)) {
            url = 'http://' + url;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    useEffect(()=>{
        setLogros(props.Logros);
    },[props.Logros]);
    return(
        <React.Fragment>
            <Typography variant = 'h3'>
            Actividad Reciente
            </Typography> 
            <Grid container item sx={{ height : '100%'}} direction = 'row' spacing={1}>
            {logros.map((logro,idx)=>(
                <Grid item key = {idx} sx ={{}} xs={12} mr = {2}>
                    <Card sx ={{height:'180px',padding:'20px'}}>
                        <Typography variant = 'h4'>
                            {logro.Titulo}
                        </Typography>
                        <Typography variant = 'h5' sx = {{height:'50%'}}>
                            {logro.Descripcion}
                        </Typography>
                        {logro.Tipo?
                        <Button sx = {{height:'50px'}} variant = 'contained'
                            onClick = {()=>{abrirUrl(logro.UrlRef)}}>
                            {logro.RefTitle}
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