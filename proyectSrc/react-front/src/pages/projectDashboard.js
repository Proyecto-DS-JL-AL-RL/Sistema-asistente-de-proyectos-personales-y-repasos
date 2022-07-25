import React,{useContext, useEffect, useState} from 'react';
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
import { changePage, restoreContent } from '../stores/sliceAyuda';
import { BACK_IP } from '../publicConstants';
import { changeTutorial, restoreContentTutorial } from '../stores/sliceTutorial';
export default function ProyectoView(){
    const { currentState } = useContext(AccountContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const {idProyecto} = useParams();
    const [pTitulo,setPTitulo] = useState (null);

    const [objetivos,setObjetivos] = useState([]);
    const [logros,setLogros] = useState([]);
    const [stats,setStats] = useState({Puntos:0,ConstanciaDiff:0,LogrosDiff:0});
    const[showForm,setShowForm] = useState(false);
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
    const [showEliminar,setShowEliminar] = useState(false);
    const [blockedDeleteP,setBlockedDeleteP] = useState(false);

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

      const AdvertenciaEliminado = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Proyecto No existe"}
        comentario={<>
                El proyecto fue eliminado con exito. Las actividades asociadas fueron desvinculadas
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null);history.push('/proyectos');}}>
                    volver a proyectos
                </button>
                </>}
        />
      }

    const getProyectInfo = async () => {
        if(idProyecto){
            axios.get(BACK_IP+'/api/Proyectos/getProyecto/'+idProyecto)
                .then(data=>{
                    if (data.data.error){
                        if (data.data.error == 'not_found'){
                            setMensajeAdvertenciaDisplay(AdvertenciaNotFound);
                            setPTitulo(null);
                        }
                    }else{
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

    const handleDeleteObj = async (idObj) =>{
        if(idObj){
            axios.delete(BACK_IP+'/api/Proyectos/endObjetive/'+idObj)
                .then(data=>{
                    getProyectInfo();
                }).catch(err=>console.log(err))
        }
    }

    const handleEliminarProyecto = async ()=>{
        if (blockedDeleteP)
            return;
        setBlockedDeleteP(true);
        if (idProyecto){
            axios.delete(BACK_IP+'/api/Proyectos/deleteProyecto/'+idProyecto)
                .then(data=>{
                    if (data.data.error){

                    }else{
                        setMensajeAdvertenciaDisplay(AdvertenciaEliminado);
                        setBlockedDeleteP(false)
                    }
                }).catch(err=>console.log(err));
        }
    }

    const ConfirmDelete = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Proyecto No existe"}
        comentario={<>
                Esta seguro de eliminar el proyecto ?
                <button className='btn-advertencia-ok' onClick={()=>{handleEliminarProyecto()}}>
                    ELIMINAR PROYECTO
                </button>
                <button className='btn-advertencia-no' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    CANCELAR
                </button>
                </>}
        />
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

    const askForConfirmDelete = () =>{
        setMensajeAdvertenciaDisplay(ConfirmDelete);
    }

    useEffect(()=>{
        getProyectInfo();
    },[idProyecto]);

    useEffect(()=>{
        if (currentState.UserSub){
            if(currentState.BaseProyect){
                if (currentState.BaseProyect != idProyecto)
                    setShowEliminar(true);
                else
                    setShowEliminar(false);                
            }else{
                setShowEliminar(false);
            }
        }
    },[currentState]);

    useEffect (()=>{
            const aa = <div className='sugerencia-contenido'>
            <div className='sugenrencia-contenido-img'>            
                
                <div>Vista de Proyecto</div>
            </div>
            <div className='sugerencia-contenido-descripcion-600'>
                Esta es la vista de un proyecto
                <div className='sugerencia-descripcion-margin'>
                    Aca veras tu actividad, junto con los puntos que acumulaste 
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Los pendientes son anotaciones que se ordenaran de acuerdo a su importancia y el tiempo que ha pasado desde que los pusiste  
                </div>
                <div className='sugerencia-descripcion-margin'>
                    Para agregar actividad reciente Debes completar actividades asociadas al proyecto en Dame Algo que hacer 
                </div>
            </div>
        </div>

        const tuto = <div className='sugerencia-contenido'>
            <div className='sugenrencia-contenido-img'>
                
                    <div>Tutorial Interfaz de Voz</div>
                </div>
                <div className='sugerencia-contenido-descripcion-600'>

                    <div className='sugerencia-descripcion-margin'>
                        "Crear/Agregar Pendiente"  : Inicia crear un nuevo pendiente 
                    </div>
                    <div className='sugerencia-descripcion-margin-subititle'>
                        Mientras esta agregando un pendiente:
                    </div>
                    <div className='sugerencia-descripcion-margin'>
                        "Agregar"  : Termina de crear el nuevo Pendiente
                    </div>
                    <div className='sugerencia-descripcion-margin'>
                        "Volver/Atrás"  : Cierra el formulario de crear Pendiente
                    </div>        
                    <div className='sugerencia-descripcion-margin'>
                        "Título [Contenido]"
                    </div>
                    <div className='sugerencia-descripcion-margin'>
                        "Descripción [Contenido]"
                    </div>
                    <div className='sugerencia-descripcion-margin'>
                        "Peso [numero]" o "Importancia [numero]": Establece la Importancia
                    </div>
                    </div>
        </div>


        const tutorial_ = ReactDOMServer.renderToString(tuto);
        const component=ReactDOMServer.renderToString(aa);
        dispatch(changePage({content:component,title:"Gestión de Proyectos"}));
        dispatch(changeTutorial(tutorial_));
        setBlockedDeleteP(false);

        return ()=>{
            dispatch(restoreContent());
            dispatch(restoreContentTutorial());
        }
    },[]);

    const commands = getCommandsPage({handleBack,initCrearPendiente});
    const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});

    return (
        <React.Fragment>

                <Grid item container  sx = {{width:'100%', maxHeight:'30%'}}>
                    <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {handleBack}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                    </Button>
                    <Typography variant = 'h3' ml = {2} fontWeight = 'bold'>
                        {pTitulo}
                    </Typography>
                    {showEliminar?
                    <Button color = 'error' variant = 'contained' sx ={{position:'absolute','marginLeft':'70%','marginTop':0}} onClick = {askForConfirmDelete}>ELIMINAR PROYECTO</Button>
                    :
                    null}
                </Grid>
                

                <Grid container item  sx = {{ width : '100%', height:'40%'}} direction = 'row' columnGap = {5} rowGap ={1} justifyContent = "center">
                    <Grid item container  sm={4} lg ={4} xl = {4} sx = {{maxHeight:'100%'}}>
                        <ObjetivosList objetivos = {objetivos} handleDelete = {handleDeleteObj}/>
                    </Grid>
                    <Grid item container  sm = {4} lg = {4} xl = {4} direction = 'column'>

                            <Button sx = {{width:'80%',bgcolor: '#C0DAE5', borderRadius:'20px',height:'15%', marginLeft: '10%'}} variant = 'contained' mb = {1} onClick = {initCrearPendiente}>
                                <Typography color = 'black' sx = {{fontWeight : 'bold'}}>
                                    Agregar Pendiente
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
            <ObjetivoForm close = {()=>setShowForm(false)} activities = {objetivos} setActivities = {setObjetivos} idProyecto = {idProyecto} refresh = {getProyectInfo}/>
            :
            null
            }
            <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
            </Box>
        </React.Fragment>
    );
}