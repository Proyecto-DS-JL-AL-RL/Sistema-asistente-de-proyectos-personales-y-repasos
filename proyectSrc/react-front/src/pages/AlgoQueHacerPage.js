import React,{useEffect,useState} from 'react';
import ActividadActual from './ActividadActual';
import AlgoQueHacer from './AlgoQueHacer';

export default function AlgoQueHacerPage(){
    const [doingSomething,setDoingSomething] = useState(false);

    return (
    <React.Fragment>
        {doingSomething?
        <ActividadActual setDoingSomething = {setDoingSomething}/>        
        :
        <AlgoQueHacer setDoingSomething = {setDoingSomething}/>
        }
    </React.Fragment>
);}





