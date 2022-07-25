import React,{useEffect,useState,useContext} from 'react';
import ActividadActual      from './ActividadActual';
import AlgoQueHacer         from './AlgoQueHacer';
import { AccountContext }   from '../AccountContext';
import axios from 'axios';
import {parseUrlFromKey,uploadFile} from '../S3methods';
import { useHistory } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-recognition';
import {getCommandsPage} from '../speechMethods/algoQueHacerMethods'
import MensajeAdvertencia from '../components/horario/MensajeAdvertencia'
import { Box } from '@mui/material';
import  ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { changePage, restoreContent } from '../stores/sliceAyuda';
import { BACK_IP } from '../publicConstants';
import { changeTutorial, restoreContentTutorial } from '../stores/sliceTutorial';

export default function AlgoQueHacerPage(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
    const {sessionState,currentState,setCurrentState} = useContext(AccountContext);
    const [doingSomething,setDoingSomething]    = useState(false);    
    const [currentActivity,setCurrentActivity]  = useState(null);
    const [started,setStarted]                  = useState(false);
    const [evidencia,setEvidencia]              = useState(null);
    useEffect(()=>{
        props.showAdd.setShowAnadir({card:false, icon:false})
    },[])

    const AdvertenciaFinalizar = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Actividad completada"}
        imgContent={"./bienImage.jpg"}
        comentario={<>
                Se te ha agregado {currentActivity?.Puntos} puntos a {currentActivity?.ProyectoTitulo||"Tu proyecto Personal"}
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    ok
                </button>
                </>}
        />
    }

    const AdvertenciaNoActividades = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Actividad completada"}
        comentario={<>
                Parece que no tiene ninguna actividad creada. Cree una en cola de actividades 
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null);history.push('/activityQueue')}}>
                    Ir a cola de actividades
                </button>
                </>}
        />
    }

    const checkSession = async () => {
        if (currentState.ActividadActual){
            axios.get(BACK_IP+'/api/colaActividades/actividad/'+currentState.ActividadActual)
                .then(data=>{
                    const activity = data.data;
                    setStarted(true);
                    setCurrentActivity(activity);                
                }).catch(err=>console.log(err));
        }
    };

    const startActivity = async ()=>{
        const {sub} = sessionState;
        if (currentActivity){
            const body = {userSub:sub,activity:currentActivity._id}
            axios.post(BACK_IP+'/api/state/setActivity',body)
                .then((data)=>{
                    setCurrentState({...currentState,ActividadActual: currentActivity._id });
                }).catch(err=>console.log(err));
        }        
    }

    const endActivity = async ()=>{
        if (currentActivity){
            if (currentActivity.ProyectoAsociado == null)
                { currentActivity.ProyectoAsociado = currentState.BaseProyect; }            
            let tipo = null;            let UrlRef = null;            let RefTitle = null;
            if (evidencia){
                tipo = evidencia.tipo;
                if (tipo=='Imagen'||tipo=='Archivo'){
                    if (evidencia.content){
                        const FileKeyPath = await uploadFile(evidencia.content);
                        UrlRef = parseUrlFromKey(FileKeyPath);
                        RefTitle = evidencia.content.name;
                    }                    
                }else if(tipo=='URL'){
                    UrlRef = evidencia.url;
                    RefTitle = "Dirección URL";
                }
            }            
                
            const evidenceBody = {tipo,UrlRef,RefTitle}
            const body = {activity: currentActivity, evidenceBody:evidenceBody };
            axios.post(BACK_IP+'/api/state/endActivity',body)
                .then((data)=>{
                    setCurrentState({...currentState,ActividadActual: null }); 
                    setMensajeAdvertenciaDisplay(AdvertenciaFinalizar);            
                    setCurrentActivity(null);
                    setStarted(false);
                    setEvidencia(null);
                }).catch(err=>console.log(err));
        }    
    }

    const giveAnActivity = async ()=>{   
        if (currentActivity ||started)  return;
        const {sub} = sessionState;
        if (sub){
            axios.get(BACK_IP+'/api/colaActividades/getActividad/'+sub)
            .then((data)=>{
                if(data.data){
                    if (data.data.error){
                        if (data.data.error == 'no_activities'){
                            setMensajeAdvertenciaDisplay(AdvertenciaNoActividades); 
                        }
                    }else{
                        setCurrentActivity(data.data);
                        setStarted(false);
                    }
                }
                
            })
            .catch(err=> console.log(err));
        } 
    }
    const handleBack = ()=>{
        if (!doingSomething){
            history.push('/');
        }
    }
    const handleContinuar = () =>{
        if (doingSomething){
            if (!started) startActivity();                
            else{}
        }else{
            giveAnActivity();
        }
    }

    const commands = getCommandsPage({handleBack , giveAnActivity,handleContinuar});
    const {listening,transcript} = useSpeechRecognition({commands:commands});

    useEffect(()=>{setDoingSomething(!(currentActivity==null)); },[currentActivity]);
    useEffect(()=>{checkSession();},[currentState]);

    useEffect (()=>{                
        const aa = <div className='sugerencia-contenido'>
        <div className='sugenrencia-contenido-img'>
        
            <img  src='./Sugerencia.jpg'/>
            <div>Sugerencia</div>
        </div>
        <div className='sugerencia-contenido-descripcion'>
            Aca podrás obtener una actividad aleatoria a realizar. 
            <div className='sugerencia-descripcion'>
                Si es tu primera vez aqui entre a cola de actividades para agregar actividades.
            </div>
        </div>
    </div>

        const tuto = <div className='sugerencia-contenido'>
            <div className='sugenrencia-contenido-img'>

            <img  src='./microphonehelp.jpg'/>
                <div>Tutorial Interfaz de Voz</div>
            </div>
            <div className='sugerencia-contenido-descripcion-600'>
                <div className='sugerencia-descripcion-margin-subititle'>
                    General
                </div>
                <div className='sugerencia-descripcion-margin'>
                    "Dame una Actividad", "Dame Algo que hacer": Ejecuta la función de una actividad. 
                </div>
                <div className='sugerencia-descripcion-margin'>
                    "Continuar" : Continua en el proceso de realizar una actividad, Aceptarla y terminarla.
                </div>
                <div className='sugerencia-descripcion-margin'>
                    "Volver" : Si aun no se empezo la actividad dada, vuelve para poder tomar otra. Si fue aceptada vuelve a inicio.
                </div>
                
                <div className='sugerencia-descripcion-margin-subititle'>
                    En una actividad ya iniciada
                </div>

                <div className='sugerencia-descripcion-margin'>
                    "Agregar evidencia": Abre el Formulario de evidencia
                </div>
                <div className='sugerencia-descripcion-margin'>
                    "Terminar": Termina la actividad
                </div>
                <div className='sugerencia-descripcion-margin'>
                    "Limpiar evidencia": Quita la evidencia subida.
                </div>
            </div>
        </div>

    const tutorial_ = ReactDOMServer.renderToString(tuto);
    const component=ReactDOMServer.renderToString(aa);
        dispatch(changePage({content:component,title:"Dame algo que hacer"}));
        dispatch(changeTutorial(tutorial_));
        return ()=>{
            dispatch(restoreContent());
            dispatch(restoreContentTutorial());
        }
    },[]);

    return (
        <React.Fragment>
            {doingSomething?   
                <ActividadActual    endActivity         = {endActivity} 
                                    currentActivity     = {currentActivity} 
                                    setCurrentActivity  = {setCurrentActivity} 
                                    started             = {started} 
                                    startActivity       = {startActivity}
                                    setEvidencia        = {setEvidencia}
                                    evidencia           = {evidencia}
                                    /> 
            :
                <AlgoQueHacer       giveAnActivity   = {giveAnActivity}    
                                    />
            }
            <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
            </Box>
        </React.Fragment>
    );
}





