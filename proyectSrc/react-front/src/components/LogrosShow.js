import React,{useState,useEffect} from "react";
import { Button,Grid,Box,Card, Typography } from "@mui/material";

const prueba = [{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'},{titulo:'XD'}]
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
                    <Card sx ={{height:'180px'}}>
                        <Typography>
                            {logro.titulo}asdsd
                        </Typography>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </React.Fragment>
    );
}