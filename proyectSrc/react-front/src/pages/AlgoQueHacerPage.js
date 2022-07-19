import React,{useEffect,useState,useContext} from 'react';
import ActividadActual      from './ActividadActual';
import AlgoQueHacer         from './AlgoQueHacer';
import { AccountContext }   from '../AccountContext';
import axios from 'axios';
import {s3Client,parseUrlFromKey,getFileKey,uploadFile} from '../S3methods';

export default function AlgoQueHacerPage(){
    const {sessionState,currentState,setCurrentState} = useContext(AccountContext);
    const [doingSomething,setDoingSomething]    = useState(false);    
    const [currentActivity,setCurrentActivity]  = useState(null);
    const [started,setStarted]                  = useState(false);
    const [evidencia,setEvidencia]              = useState(null);

    const checkSession = async () => {


        if (currentState.ActividadActual){
            axios.get('http://localhost:4000/api/colaActividades/actividad/'+currentState.ActividadActual)
                .then(data=>{
                    const activity = data.data;
                    console.log(activity);
                    setStarted(true);
                    setCurrentActivity(activity);                
                })
                .catch(err=>console.log(err));
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
                })
                .catch(err=>console.log(err));
        }        
    }

    const endActivity = async ()=>{
        let evidenceRef = evidencia?.tipo;
        //Handle

        const {sub} = sessionState;
        if (currentActivity){
            if (currentActivity.ProyectoAsociado == null){
                currentActivity.ProyectoAsociado = currentState.BaseProyect;
            }            
            //console.log(currentActivity);
            //console.log(evidencia);
            let tipo = null;
            let UrlRef = null;
            let RefTitle = null;
            if (evidencia){
                tipo = evidencia.tipo;
                if (tipo=='Imagen'||tipo=='Archivo'){
                    if (evidencia.content){
                        const FileKeyPath = await uploadFile(evidencia.content);
                        UrlRef = parseUrlFromKey(FileKeyPath);
                        RefTitle = evidencia.content.name;
                        //console.log('ssd',RefTitle);
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
                    //Register Evidence                
                    setCurrentActivity(null);
                }).catch(err=>console.log(err));
        }    
    }

    useEffect(()=>{setDoingSomething(!(currentActivity==null)); },[currentActivity]);
    useEffect(()=>{
        //console.log(s3Client);
        //console.log(parseUrlFromKey(getFileKey('donut.png')));
        //console.log(getFileKey('donut.png'));
        checkSession();
    },[currentState]);
    //useEffect(checkSession,[]);

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
                <AlgoQueHacer       setDoingSomething   = {setDoingSomething} 
                                    setCurrentActivity  = {setCurrentActivity}
                                    setStarted          = {setStarted}    
                                    />
            }
        </React.Fragment>
    );
}





