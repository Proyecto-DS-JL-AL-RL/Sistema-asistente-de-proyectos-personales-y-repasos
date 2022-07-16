import React,{useEffect,useState,useContext} from 'react';
import ActividadActual from './ActividadActual';
import AlgoQueHacer from './AlgoQueHacer';
import { AccountContext } from '../AccountContext';

export default function AlgoQueHacerPage(){
    const [doingSomething,setDoingSomething] = useState(false);
    const {sessionState,currentState} = useContext(AccountContext);
    const [currentActivity,setCurrentActivity] = useState(null);

    const checkSession = () => {
        //console.log(currentState.ActividadActual);
        setCurrentActivity(currentState.ActividadActual);
    };

    useEffect(()=>{
        checkSession();
    },[currentState]);

    useEffect(()=>{
        checkSession();
    },[]);

    useEffect(()=>{
        if (currentActivity){
            setDoingSomething(true);
        }else{
            setDoingSomething(false);
        }
    },[currentActivity]);

    return (
    <React.Fragment>
        {doingSomething?
        <ActividadActual setDoingSomething = {setDoingSomething}/>        
        :
        <AlgoQueHacer setDoingSomething = {setDoingSomething}/>
        }
    </React.Fragment>
);}





