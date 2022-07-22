import React,{useEffect, useState} from 'react';
import { Grid , Card, Typography, Button, Box } from '@mui/material';
import LogrosShow from '../components/LogrosShow';
import ProjectStats from '../components/ProjectStats';
import ObjetivosList from '../components/ObjetivosList';
import { useHistory, useParams } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import { getCommandsPage } from '../speechMethods/projectSpecific';
import { useSpeechRecognition } from 'react-speech-recognition';
import ObjetivoForm from '../components/objForm';
import MensajeAdvertencia from '../components/horario/MensajeAdvertencia';
import axios from 'axios';
import  ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { changePage } from '../stores/sliceAyuda';
export default function ProyectoView(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {idProyecto} = useParams();
    const [pTitulo,setPTitulo] = useState (null);

    const [objetivos,setObjetivos] = useState([]);
    const [logros,setLogros] = useState([]);
    const [stats,setStats] = useState({Puntos:0,ConstanciaDiff:0,LogrosDiff:0});
    const[showForm,setShowForm] = useState(false);
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);

    const AdvertenciaNotFound = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Proyecto No existe"}
        comentario={<>
                Parece que este proyecto no existe en nuestra base de datos
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null);history.push('/proyectos');}}>
                    volver
                </button>
                </>}
        />
      }

    const getProyectInfo = async () => {
        if(idProyecto){
            console.log('ProyectInfo:',idProyecto);
            axios.get('http://localhost:4000/api/Proyectos/getProyecto/'+idProyecto)
                .then(data=>{
                    if (data.data.error){
                        console.log(data.data);
                        if (data.data.error == 'not_found'){
                            setMensajeAdvertenciaDisplay(AdvertenciaNotFound);
                            setPTitulo(null);
                        }
                    }else{
                        console.log(data.data);
                        const {Titulo,Objetivos,Logros,Puntajes} = data.data;
                        setPTitulo(Titulo);
                        setLogros(Logros||[]);
                        setObjetivos(Objetivos||[]);
                        setStats(Puntajes||[]);
                    }
                })
                .catch(err=>console.log(err));
        }
    }

    const handleBack = ()=>{
        if(showForm){
            setShowForm(false);
        }else{
            history.push('/proyectos');
        }
    }
    const initCrearPendiente = ()=>{
        if (!pTitulo){
            return;
        }else
            if (!showForm)
                setShowForm(true);
    }

    useEffect(()=>{
        getProyectInfo();
    },[idProyecto]);

    useEffect (()=>{
        const component = ReactDOMServer.renderToString(<div>Ayuda No disponible</div>);
        dispatch(changePage({content:component,title:"Gestión de Proyectos"}));
    },[]);

    const commands = getCommandsPage({handleBack,initCrearPendiente});
    const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});

    return (
        <React.Fragment>

                <Grid item container  sx = {{width:'100%', maxHeight:'30%'}}>
                    <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {()=>{history.push('/')}}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                    </Button>
                    <Typography variant = 'h3' ml = {2} fontWeight = 'bold'>
                        {pTitulo}
                    </Typography>
                </Grid>
                <Grid container item  sx = {{ width : '100%', height:'40%'}} direction = 'row' columnGap = {5} rowGap ={1} justifyContent = "center">
                    <Grid item container  sm={4} lg ={4} xl = {4} sx = {{maxHeight:'100%'}}>
                        <ObjetivosList objetivos = {objetivos}/>
                    </Grid>
                    <Grid item container  sm = {4} lg = {4} xl = {4} direction = 'column'>

                            <Button sx = {{width:'80%',bgcolor: '#C0DAE5', borderRadius:'20px',height:'15%', marginLeft: '10%'}} variant = 'contained' mb = {1} onClick = {initCrearPendiente}>
                                <Typography color = 'black' sx = {{fontWeight : 'bold'}}>
                                    Agregar
                                </Typography>
                            </Button>
                            <Box sx = {{height:'80%',marginTop:'10px'}}>
                            <ProjectStats stats = {stats}/>
                            </Box>
                    </Grid>
                </Grid>

                <Box sx = {{overflowY :'auto', maxHeight:'50%' , width:'80%', bgcolor: '#C4B5FD', marginLeft:'10%', marginTop:'10px' ,borderRadius:'30px',padding:'30px'} }>
                    <LogrosShow Logros = {logros} />             
                </Box>

            {showForm?
            <ObjetivoForm close = {()=>setShowForm(false)} activities = {objetivos} setActivities = {setObjetivos} idProyecto = {idProyecto}/>
            :
            null
            }
            <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
            </Box>
        </React.Fragment>
    );
}