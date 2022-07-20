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
import { changePage } from '../stores/sliceAyuda';

export default function AlgoQueHacerPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
    const {sessionState,currentState,setCurrentState} = useContext(AccountContext);
    const [doingSomething,setDoingSomething]    = useState(false);    
    const [currentActivity,setCurrentActivity]  = useState(null);
    const [started,setStarted]                  = useState(false);
    const [evidencia,setEvidencia]              = useState(null);


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

    const checkSession = async () => {
        if (currentState.ActividadActual){
            axios.get('http://localhost:4000/api/colaActividades/actividad/'+currentState.ActividadActual)
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
            axios.post('http://localhost:4000/api/state/setActivity',body)
                .then((data)=>{
                    console.log(data.data);
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
            axios.post('http://localhost:4000/api/state/endActivity',body)
                .then((data)=>{
                    console.log(data.data);
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
            axios.get('http://localhost:4000/api/colaActividades/getActividad/'+sub)
            .then((data)=>{
                setCurrentActivity(data.data);
                setStarted(false);
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
        const component = ReactDOMServer.renderToString(<div>Ayuda No disponible</div>);
        dispatch(changePage({content:component,title:"Dame algo que hacer"}));
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





