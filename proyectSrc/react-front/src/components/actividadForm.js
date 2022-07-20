import React,{useContext, useEffect, useState} from 'react';
import {Button, Card, Checkbox, Grid, TextField, Typography,Box,Slider} from '@mui/material';
import { AccountContext } from '../AccountContext';
import axios from 'axios';
import { useSpeechRecognition } from 'react-speech-recognition';
import { getAgregarComands } from '../speechMethods/actividadesMethods';
import MensajeAdvertencia from './horario/MensajeAdvertencia';




export default function ActividadForm(props){
    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [blocked,setBlocked] = useState(false);
    const [peso,setPeso] = useState(4);
    const [proyectos,setProyectos] = useState([]);
    const [selectingProyect, setSelectingProyect] = useState(false);
    const [currProyect,setCurrProyect] = useState(null);
    const { sessionState } = useContext(AccountContext);
    const [puntero,setPuntero] = useState(null);
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);

    const actividadSinNombrePaper = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Al parecer tu actividad no tiene un nombre."}
        comentario={<>
                Debes colocar un titulo a tu actividad, la descripción es opcional
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    ok
                </button>
                </>}
        />
    }

    const agregarActividad = async ()=>{
        if (titulo == ''){
                setMensajeAdvertenciaDisplay(actividadSinNombrePaper);
                return;
        }
        
        const {sub} = sessionState;
        const p = currProyect||{titulo:null,id:null};
        const tituloProyect = p.Titulo;
        const proyectId = p._id;

        const Item = {
            "UserSub": sub,
            "Titulo": titulo,
            "Descripcion": descripcion,
            "Blocked": blocked,
            "Peso": peso,
            "ProyectoAsociado": proyectId,
            "ProyectoTitulo":tituloProyect
          };

        axios.post('http://localhost:4000/api/colaActividades/addActividad',Item)
            .then(data=>{
                console.log(data);
            })
            .catch(err=>console.log(err));  

        console.log('agregado',Item);
        props.setActivities([...props.activities,Item])
        props.close();
    }
    const establecerProyecto = (proyecto)=>{
        console.log('proyproy',proyecto);
        setCurrProyect(proyecto);
        setSelectingProyect(false);
    }

    const setPunteroPage     = (puntero)=>setPuntero(puntero);
    const setPesosAudio      = (peso_)  =>setPeso(peso_);
    const setAgregarProyecto = (valor)  =>setSelectingProyect(valor);

    const setProyectoAsociado= (idPro)  =>{
        if (selectingProyect) {
            //console.log(idPro);
            if (idPro >= 0 && idPro < proyectos.length){                
                establecerProyecto(proyectos[idPro]);
            }            
        }
    }

    const handleBack = () =>{
        if (selectingProyect){
            setSelectingProyect(false);
        }else{
            props.close();
        }
    }

    const commands = getAgregarComands({setPunteroPage,setPesosAudio,setAgregarProyecto,handleBack,setProyectoAsociado,agregarActividad,setBlocked});
    const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});

    const setDictionary = {
        "título":setTitulo,
        "descripción":setDescripcion
    }

    useEffect(()=>{
        if(puntero && listening){
            resetTranscript();
            setDictionary[puntero](finalTranscript);
        }
    },[finalTranscript]);

    useEffect(()=>{
        setProyectos(props.proyectList);
    },[props.proyectList]);

    return(
        <React.Fragment>
            <Card sx = {{width:'40%',minHeight:'60%',maxHeight:'700px', position:'absolute',top:'25%',left:'30%',border :'solid',borderColor:'black',padding:'20px', overflowY:'auto'}}>
                <Button onClick = {props.close} variant = 'contained' sx = {{bgcolor :'red',left:'88%'}} >X</Button>
                
                <Typography variant = 'h4'>
                    Agregando una Actividad 
                </Typography>

                <Grid container direction = 'column' sx = {{width:'80%',marginLeft:'10%',marginTop:'20px'}} rowGap = {3} alignItems = 'center'>
                    {puntero?
                    <Typography variant = 'h6'>Escribiendo: {puntero}</Typography>
                    :
                    null}
                    <TextField label={selectingProyect?"":"Titulo"} value = {titulo} sx = {{width : '100%'}} onChange = {(e)=>{setTitulo(e.target.value)}}/>
                    <TextField label ={selectingProyect?"":"Descripcion"} value = {descripcion} sx = {{width : '100%'}}  onChange = {(e)=>{setDescripcion(e.target.value)}}/>

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
                                {currProyect.Titulo}
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
                    X
                </Button>
                {currProyect?
                <Grid container justifyContent  = 'center' sx = {{width:'100%' , ":hover":{
                        bgcolor:'#1DB5BE' ,cursor:'pointer'
                    }}} alignItems ='center' direction = 'row' 
                        onClick = {()=>{establecerProyecto(null)}}
                    >
                        <Typography variant= 'h5' sx = {{width:'80%',bgcolor:'#D5FAFC',borderRadius:'30px',height:'50px',padding:'10px',margin:'10px',paddingTop:'10px',textAlign:'center'}} alignContent = 'center'>
                            Sin proyecto Asociado
                        </Typography>
                </Grid>
                :
                null
                }

                {proyectos.length<1?
                <Typography sx = {{marginTop:'20%',textAlign:'center',fontWeight:'bold'}} variant = 'h5'>
                    No tiene Proyectos Creados. Sus puntos Irán a su Proyecto Base de Usuario
                </Typography>                
                :null}

                {proyectos.map((p,idx)=>(
                    <Grid container sx = {{width:'100%' , ":hover":{
                        bgcolor:'#1DB5BE' ,cursor:'pointer'
                    }}} alignItems ='center' direction = 'row' 
                        onClick = {()=>{establecerProyecto(p)}}
                    >
                        <Typography variant= 'h4' sx = {{width:'50px',bgcolor:'#D5FAFC',borderRadius:'30px',minHeight:'50px',textAlign:'center',margin:'5px',paddingTop:'5px'}} alignContent = 'center'>
                            {idx} 
                        </Typography>
                        <Typography variant= 'h4' sx = {{width:'70%',bgcolor:'#D5FAFC',borderRadius:'30px',minHeight:'50px',padding:'10px',margin:'10px',paddingTop:'10px',textAlign:'center'}} alignContent = 'center'>
                            {p.Titulo}
                        </Typography>
                    </Grid>
                ))}
            </Card>
            :
            null
            }
        <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
        </Box>
        
        </React.Fragment>
    );
}