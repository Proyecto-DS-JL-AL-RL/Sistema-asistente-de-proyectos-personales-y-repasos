import React,{useEffect, useState} from 'react';
import {Button, Card, Grid, TextField, Typography,FormControl,FormLabel,Radio,RadioGroup,FormControlLabel} from '@mui/material';


export default function FileForm(props){

    const [url,setUrl] = useState('');
    const [file,setFile] = useState(null);
    const [tipo,setTipo] = useState('URL');

    const agregarActividad = ()=>{
        if (tipo == 'URL'){
            if (url == ''){
                alert('Agregue un URL')
                return;
            }else{
                const evidencia = {tipo:tipo,url : url}
                props.setEvidencia(evidencia);
                props.close();
            }
        }
        if(tipo == 'Imagen' || tipo == 'Archivo'){
            if (file){
                const evidencia = {tipo:tipo,content : file}
                props.setEvidencia(evidencia);
                props.close();
            }else{
                alert('Suba un archivo');
                return;
            }
        }
        
    }

    const addFile = (e) =>{
        const File_ = e.target.files[0];
        setFile(File_);
    };

    return(
        <React.Fragment>
            <Card sx = {{width:'40%',height:'40%', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px'}}>
                <Button onClick = {props.close} variant = 'contained' sx = {{bgcolor :'red',left:'94%'}} >X</Button>
                
                <Typography variant = 'h4'>
                    Agregando Evidencia
                </Typography>

                <Grid container direction = 'column' sx = {{width:'80%',marginLeft:'10%',marginTop:'20px'}} rowGap = {3} alignItems = 'center'>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Tipo</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={tipo}
                            onChange={(e)=>{setTipo(e.target.value)}}
                        >
                            <FormControlLabel value="URL" control={<Radio />} label="URL" />
                            <FormControlLabel value="Imagen" control={<Radio />} label="Imagen" />
                            <FormControlLabel value="Archivo" control={<Radio />} label="Archivo" />
                        </RadioGroup>
                    </FormControl>

                    {tipo=='URL'?
                        <TextField label="URL" value = {url} sx = {{width : '100%'}} onChange = {(e)=>{setUrl(e.target.value)}}>
                            asd
                        </TextField>
                    :null}

                    {(tipo=='Imagen'||tipo=='Archivo')?
                    <Grid container sx = {{width:'100%'}} justifyContent = 'center' >

                        {file?
                        <React.Fragment>
                            <Typography  sx = {{marginRight:'30px'}} variant = 'h6'>{file.name}</Typography>
                            <Button  sx = {{ borderRadius:'50%',minHeight:'20px',height:'30px',minWidth : '20px',width:'30px',bgcolor:'red'}} variant = 'contained'
                            onClick = {()=>{setFile(null)}}>
                               X
                            </Button>
                        </React.Fragment>                        
                        :
                        <label htmlFor="uploadFile">
                            <input
                                style={{ display: 'none' }}
                                id="uploadFile"
                                name="uploadFile"
                                type="file"
                                multiple = {false}
                                onChange = {(e)=>{addFile(e)}}
                            />
                        
                            <Button color="secondary" variant="contained" component="span">
                                Subir {tipo}
                            </Button>
                        </label>
                        }

                    </Grid>
                    :null}

                    <Button variant = 'contained' color = 'success' sx = {{width : '200px',bgcolor:'#65D55C',borderRadius:'20px',color:'black',fontSize:'20px',fontWeight:'bold'}}
                        onClick = {agregarActividad}>
                        Agregar
                    </Button>
                </Grid>
            </Card>
        </React.Fragment>
    );
}