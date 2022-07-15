import React,{useEffect, useState} from 'react';
import {Button, Card, Checkbox, Grid, TextField, Typography,Box,Slider} from '@mui/material';


export default function ActividadForm(props){

    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [blocked,setBlocked] = useState(false);
    const [peso,setPeso] = useState(4);
    const [proyectos,setProyectos] = useState([{id:'1',titulo:'xd'},{id:'1',titulo:'xd'},{id:'1',titulo:'xd'},{id:'1',titulo:'xd'},{id:'1',titulo:'xd'},{id:'1',titulo:'xd'}]);
    const [selectingProyect, setSelectingProyect] = useState(false);
    const [currProyect,setCurrProyect] = useState(null);

    const agregarActividad = ()=>{
        if (titulo == ''){
            alert('Ponga un titulo');
            return;
        }
        
        const p = currProyect||{titulo:null,id:null};
        const tituloProyect = p.titulo;
        const proyectId = p.id;

        const Item = { titulo,descripcion,blocked ,peso , proyectId, tituloProyect}
        console.log(Item);
        //props.setActivities([...props.activities,Item])
        //props.close();
    }
    const establecerProyecto = (proyecto)=>{
        console.log(proyecto);
        setCurrProyect(proyecto);
        setSelectingProyect(false);
    }


    return(
        <React.Fragment>
            <Card sx = {{width:'40%',height:'60%',maxHeight:'500px', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px', overflowY:'auto'}}>
                <Button onClick = {props.close} variant = 'contained' sx = {{bgcolor :'red',left:'88%'}} >X</Button>
                
                <Typography variant = 'h4'>
                    Agregando una Actividad
                </Typography>

                <Grid container direction = 'column' sx = {{width:'80%',marginLeft:'10%',marginTop:'20px'}} rowGap = {3} alignItems = 'center'>
                    <TextField label="Titulo" value = {titulo} sx = {{width : '100%'}} onChange = {(e)=>{setTitulo(e.target.value)}}>
                        asd
                    </TextField>
                    <TextField label = "descripcion" value = {descripcion} sx = {{width : '100%'}}  onChange = {(e)=>{setDescripcion(e.target.value)}}>
                        asd
                    </TextField>

                    <Grid container sx = {{width:'100%', direction : 'row'}} alignItems = 'center' justifyContent = 'center'>
                        <Typography sx = {{ paddingTop :'7px'}} variant = 'h6' >
                            Evidencias obligatorias
                        </Typography>
                        <Checkbox sx = {{width : '30px'}}  checked = {blocked} onChange = {e=>{setBlocked(e.target.checked)}}/>
                    </Grid>                
                    <Grid container sx = {{width:'100%', direction : 'row'}} alignItems = 'center' justifyContent = 'center'>
                    {currProyect?
                        <React.Fragment>
                            <Typography variant = 'h6' >Proyecto Asociado:   </Typography>
                            <Typography  sx ={{marginLeft:'30px',bgcolor:'orange',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline'}} variant = 'h6'>
                                {currProyect.titulo}
                            </Typography>
                            <Button sx = {{marginLeft:'30px',bgcolor:'#75E3EA',color:'black',borderRadius:'10px',':hover':{bgcolor:'#1DB5BE'}}}
                            onClick = {()=>{setSelectingProyect(true)}}>
                            <Typography sx = {{fontSize:'15px',fontWeight:'bold'}}>Editar</Typography>   
                            </Button>
                        </React.Fragment>
                        :
                        <Button sx = {{marginLeft:'30px',bgcolor:'#75E3EA',color:'black',borderRadius:'10px',':hover':{bgcolor:'#1DB5BE'}}}
                        onClick = {()=>{setSelectingProyect(true)}}>
                        <Typography sx = {{fontSize:'20px',fontWeight:'bold'}}>Asociar Proyecto</Typography>                            
                        </Button>
                        }
                    </Grid> 


                    <Grid container sx = {{width:'100%', direction : 'row'}} alignItems = 'center' justifyContent = 'center'>
                    <Typography sx = {{ paddingTop :'7px'}} variant = 'h6' >
                            Peso {peso}
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


            {selectingProyect?
            <Card sx = {{width:'30%',height:'50%',maxHeight:'400px', position:'absolute',
                        top:'30%',left:'35%',border :'solid',borderColor:'black',padding:'20px', overflowY:'auto',bgcolor:'#75E3EA',borderRadius:'30px'}}>
                <Button sx = {{width : '20%', borderRadius:'20px' ,marginLeft:'40%',bgcolor:'#DD2B2B',color:'white',fontWeight:'800',
                                ':hover':{bgcolor:'#850D0D'}}} onClick = {()=>{setSelectingProyect(false)}}>
                    Volver
                </Button>
                {currProyect?
                <Grid container justifyContent  = 'center' sx = {{width:'100%' , ":hover":{
                        bgcolor:'#1DB5BE' ,cursor:'pointer'
                    }}} alignItems ='center' direction = 'row' 
                        onClick = {()=>{establecerProyecto(null)}}
                    >
                        <Typography variant= 'h5' sx = {{width:'80%',bgcolor:'#D5FAFC',borderRadius:'30px',height:'50px',padding:'10px',margin:'10px',paddingTop:'20px',textAlign:'center'}} alignContent = 'center'>
                            Sin proyecto Asociado
                        </Typography>
                </Grid>
                :
                null
                }

                {proyectos.map((p,idx)=>(
                    <Grid container sx = {{width:'100%' , ":hover":{
                        bgcolor:'#1DB5BE' ,cursor:'pointer'
                    }}} alignItems ='center' direction = 'row' 
                        onClick = {()=>{establecerProyecto(p)}}
                    >
                        <Typography variant= 'h4' sx = {{width:'50px',bgcolor:'#D5FAFC',borderRadius:'30px',height:'50px',textAlign:'center',margin:'5px'}} alignContent = 'center'>
                            {idx} 
                        </Typography>
                        <Typography variant= 'h4' sx = {{width:'70%',bgcolor:'#D5FAFC',borderRadius:'30px',height:'50px',padding:'10px',margin:'10px',paddingTop:'20px'}} alignContent = 'center'>
                            {p.titulo}
                        </Typography>
                    </Grid>
                ))}
            </Card>
            :
            null
            }
            
            
        </React.Fragment>
    );
}