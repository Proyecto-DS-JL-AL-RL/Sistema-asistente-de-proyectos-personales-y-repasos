import React, { useContext } from 'react';
import { useEffect,useState } from 'react';


import HandymanIcon from '@mui/icons-material/Handyman';

import './horario.css';
import { IconButton } from '@mui/material';
import DescripcionActividad from '../components/horario/DescripcionActividad';
import ConfigHorario from '../components/horario/ConfigHorario';

import MensajeAlert from '../components/horario/MensajeAlert';
import { useSelector,useDispatch} from 'react-redux';
import {inciarHorario, restoreActivity } from '../stores/sliceHorario';
import { actividad2intervalo, temaChangeCSS } from '../components/horario/utilsHorario';
import { changePage,restoreContent } from '../stores/sliceAyuda';
import {changeIntervalo, intervaloOverFlow,changeBase} from '../stores/sliceConfigHorario';
import { getIniHorario} from '../stores/sliceHorario';
import  {getIniHorarioConfig}  from '../stores/sliceConfigHorario';


import * as ReactDOMServer from 'react-dom/server';
import { AccountContext } from '../AccountContext';
import { BACK_IP } from '../publicConstants';
import axios from 'axios';
import AyudaInical from '../components/Ayuda/AyudaInical';



const itemHorario = Array.from({length:200},(v,i)=>i);
const dias = 'L,M,M,J,V,S,D'.split(",");

//flag: cuando no queremoss el tomar en cuenta la horas ocupadas
const act2horario = (actividades,estados = [0,1,2]) =>{
    const act = []
    actividades.forEach((e) => {
        if(estados.indexOf(e.estado)!=-1){
            act.push(...e.intervalo)
        }
    });
    return act.sort((a,b)=>{return a-b});
}


const id2actividad = (actividades,id) =>{
    
    let act;
    actividades.forEach((e)=>{
        if(e.intervalo.indexOf(id)!=-1){
            return act=e;
        } 
        
    })
    return act;
}

const id2ObtainAllActivities = (actividades,id) =>{
    const acts = []
    actividades.forEach((e)=>{
        if(e.intervalo.indexOf(id)!=-1){
            //console.log(e.estado);
            acts.push(e);
        } 
    })
    return acts;
}

const minHoraIntervalo = (actividades) =>{
    let min=0;
    actividades.map((e,i)=>{
        if(i==0) min=e.inicio;
        else{
            if(min>e.inicio) min=e.inicio;
        }
    })
    return min+1;
}
const maxHoraIntervalo = (actividades) =>{
    let max = 0;
    actividades.map((e,i)=>{
        if(max<e.fin) max=e.fin;
    })
    return max;
}
const actividades2Intervalo = (actividades) =>{
    return [minHoraIntervalo(actividades),maxHoraIntervalo(actividades)]
}

const actividadDefault = {
    nombre:'',acr:'',descrip:'',dia:-1,inicio:-1,fin:-1,link:''
}
const getFinWithDefault = (dia,inicio,horasOcupadas) =>{
    let i = 0;
    while (i<3){
        const newFin = (inicio+i+1)*8 + dia+1;
        if(horasOcupadas.indexOf(newFin)!=-1) return i
        i++;
        
    }
    return i;
}

const minDistance = 8;


const actualizarHorarioConfigRequest = async(config,sub) =>{
    if(!sub) return;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const content = JSON.stringify({
        ...config
    })
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: content,
        redirect: 'follow'
    }
    const res = await fetch(`${BACK_IP}/api/horarioconfig/${sub}`,requestOptions);
    return res;

}

export default function Horario(props) {
    const horario = useSelector((state)=>state.horario.value);
    const configHorario = useSelector((state) => state.configHorario.value);
    const configBase = useSelector((state)=>state.configHorario.base);


    const dispatch = useDispatch();
    const {sessionState} = useContext(AccountContext);

    const [ayudaVacio,setAyudaVacio] = useState(null);
    const [ocultarDescripcion, setOcultarDescripcion] = useState(true);
    const [visibleConfig,setVisibleConfig] = useState(true);
    const [intervaloHoras,setIntervaloHoras]=useState(false);
    const [temporalActividad,setActividadTemporal] = useState(null);
    const [minmaxIntervalo,setMinmaxIntervalo] = useState([0,24]);
    const [horasOcupadas,setHorasOcupadas] = useState([]);
    const [contentDescription,setContentDescription] = useState("");
    const [idSelect,setIdSelect] = useState(-1);
    const [descripcionRender,setDescripcionRender] = useState(null);
    const [visibleAlert,setVisibleAlert] = useState(null);
    const [mensajesAlertComplete,setMensajesAlertComplete] = useState(null);
    const iniHorario = async() =>{
        const {sub} = sessionState;
        if(sub){
            dispatch(getIniHorario(sub));
            dispatch(getIniHorarioConfig(sub));
        }
        
    }
    const getSub = () =>{
        const {sub} = sessionState;
        return sub;
    }
    
    useEffect(()=>{
        props.showAdd.setShowAnadir({card:false, icon:false});
        iniHorario();
        //temaChangeCSS(2);
    },[sessionState])
    useEffect(()=>{
        if(!temporalActividad) return;
        dispatch(inciarHorario(temporalActividad.horario));
        //console.log(temporalActividad);
    },[temporalActividad])
    useEffect(()=>{
        
        const aa = <div className='sugerencia-contenido'>
            <div className='sugenrencia-contenido-img'>
            
                <img  src='./Sugerencia.jpg'/>
                <div>Sugerencia</div>
            </div>
            <div className='sugerencia-contenido-descripcion'>
                Aqui puedes colocar tus actividades que realizas en una semana, asi tener mas ordenado tus
                actividades, puedes colocar un link, para poder redirigirte al momento que ir a dicha actividad.
                <div className='sugerencia-descripcion'>
                    🖱️Da click a un recuadro "***" para añadir una actividad
                </div>
                <div className='sugerencia-descripcion'>
                🖱️Da click a un recuadro 🛠
                 para configurar
                </div>
            </div>
        </div>
        const component=ReactDOMServer.renderToString(aa);
        dispatch(changePage({content:component,title:"Mi Horario"}));
        return ()=>{
            dispatch(restoreContent());
        }
    },[])
    const id2actividadClick = (idSelect) =>{
        let act = id2actividad(horario,idSelect);
        const acts = id2ObtainAllActivities(horario,idSelect);
        //console.log("acts:",acts.length);
        const dia = idSelect%8-1;
        const inicio = Math.floor(idSelect/8)-1;
        const space = getFinWithDefault(dia,inicio,act2horario(horario,[0]));
        if(acts.length==0){
            let a =  {...actividadDefault,dia,inicio,
                fin:Math.min(configHorario.intervalo[1],inicio+space),estado:1} 
            return {...a, intervalo:actividad2intervalo(a)}
        }
        if(acts.length==2){
            const actEditar = horario.filter((e)=>{
                return (e.estado!=1 && e.intervalo.indexOf(idSelect)!=-1)
            })
            return actEditar[0];
            //console.log("Change",newChangeHorario);
        }
        if(act.estado==1){
            let a =  {...actividadDefault,dia,inicio,fin:Math.min(configHorario.intervalo[1],inicio+space),estado:1}  
            return {...a, intervalo:actividad2intervalo(a)}
        }
        return act;
    }

    useEffect(()=>{

        const elementos = document.getElementsByClassName('unlock-item');
        
        const tam = elementos.length;
        const descpHorario= document.getElementById('description-horario');
        
        for(let i=0;i<tam;i++){
            elementos[i].onclick = () =>{
                dispatch(restoreActivity());
                const numEle = parseInt(elementos[i].id.match(/(\d+)/)[0]);
                setIdSelect(numEle);
                setOcultarDescripcion(false);
                //const acts = id2ObtainAllActivities(horario,idSelect);
                //console.log("Estados",acts.map((e)=>e.estado));
                const {sub} = sessionState;
                if(sub){
                    dispatch(changeBase());
                    setDescripcionRender(<DescripcionActividad
                    sub = {sub}
                    mensajeDisplay={setMensajesAlertComplete}
                    actividad = {id2actividadClick(numEle)}
                    idAct = {numEle}
                    handleVisible={setOcultarDescripcion} 
                    
                    minmax={minmaxIntervalo} 
                    />)
                }
            }
            elementos[i].onmouseover = () =>{
                const descriptionContent = document.getElementById("description-content-horario");
                const tamDescriptionContent = descriptionContent.getBoundingClientRect();
                const tamDescription = descpHorario.getBoundingClientRect();
                descpHorario.style.display='block';
                
                const rectanguloElemento = elementos[i].getBoundingClientRect();
                
                descpHorario.style.minHeight = `${rectanguloElemento.height}px`;
                const despLeft = descriptionContent.getBoundingClientRect().width;
                const widthColumnAdd = i%7>2?-despLeft:rectanguloElemento.width;
                descpHorario.style.left = `${rectanguloElemento.left + widthColumnAdd}px`;
                descpHorario.style.top = `${rectanguloElemento.top}px`;
                
                const numEle = parseInt(elementos[i].id.match(/(\d+)/)[0]);
                if(horasOcupadas.indexOf(numEle)!=-1){
                    if(horario.length>0){
                        const act = id2actividad(horario,numEle);
                        setContentDescription(act.nombre);
                    }
                    
                }else{
                    setContentDescription("Click para crear ana actividad");
                }
                
            }
            elementos[i].onmouseout = () =>{
                descpHorario.style.display='None';
            }
        }
        //console.log("XDD",configHorario.intervalo);
    },[horasOcupadas,configHorario]);
    
    

    const handleIntervaloHoras = (e) =>{
        setIntervaloHoras(e.target.checked);
    }
    const handleVisibleConfig = () =>{
        
        setVisibleConfig(!visibleConfig);
        
    }
    const handleMinMax = (min,max) =>{
        setMinmaxIntervalo([min,max]);        
    }
    
    useEffect(()=>{
        
        if(!horario) return;
        if(horario.length<1){
            setAyudaVacio(<AyudaInical 
                closeAyuda={()=>{setAyudaVacio(null)}}
                mostrarConfig={()=>{setVisibleConfig(!visibleConfig)}}/>);
        }else{
            setAyudaVacio(null);
        }
        let flag_horario = true;
        horario.forEach((e)=>{
            if(e.dia<0) flag_horario=false;
        })
        if (!flag_horario) return;
        setHorasOcupadas(act2horario(horario));
        //console.log(horario,act2horario(horario,[1]));
        if(horario.length==1 ){
            if(horario[0].estado==0) return;
            const intervaloRetry = actividades2Intervalo(horario);
            dispatch(changeIntervalo([Math.min(6,intervaloRetry[0]),Math.max(18,intervaloRetry[1])]));
            return;
        }

        if((act2horario(horario,[0])).length==0){
            dispatch(changeIntervalo([Math.min(6,configHorario.intervalo[0]),Math.max(18,configHorario.intervalo[1])]));
            return;
        }

        
        const minHora = minHoraIntervalo(horario);
        const maxHora = maxHoraIntervalo(horario);
        if(minHora== configHorario.intervalo[0] && maxHora == configHorario.intervalo[1]) return;
        if(!configHorario.intervaloDefault){
            if(minHora<configHorario.intervalo[0] || maxHora>configHorario.intervalo[1]){
                dispatch(intervaloOverFlow([minHora,maxHora]));
            }
            return;
        }
        if(maxHora-minHora<minDistance){
            //console.log("Hola Min");
            const val = Math.floor((minDistance- (maxHora-minHora))/2)+1;
            dispatch(changeIntervalo([minHora-val,maxHora+val]))
            return;
        }
        
        dispatch(changeIntervalo([minHora,maxHora]));
        
        
    },[horario])
    useEffect(()=>{
        
        if(ocultarDescripcion && configBase){
            if(JSON.stringify(configHorario)===JSON.stringify(configBase)) return;
            //if(config)
            // de intervaloDefault intervalo 
            const intervaloActual = actividades2Intervalo(horario);
            if(!configHorario.intervaloDefault ){

            }
            //console.log("Comparando:",intervaloActual);
            
            actualizarHorarioConfigRequest(configHorario,getSub());

            //console.log(configHorario)
            //console.log(configBase);
        }
    },[ocultarDescripcion]);
  return (
    
    <div className='horario-container' >
        <div id="root-horario">
            
            {
                
                itemHorario.map((e)=>{
                    let ocupado="";
                    let state = "unlock-item";
                    let content = "***";
                    let horasclass = ""
                    let temp=""
                    if( (e>0 && e<8) || e%8==0) state = "lock-item";
                    if(e>0 && e<8) content = dias[e-1];
                    if(e%8==0){
                        content = `${Math.floor(e/8)-1} : ${Math.floor(e/8)}`;
                        horasclass="horas-item"
                    } 
                    if(e==0){
                       state = "";
                       content= <IconButton size="small" onClick={() =>{setVisibleConfig(!visibleConfig)}}>
                            <HandymanIcon fontSize="inherit" sx={{fontSize:'1.2em'}}/>
                        </IconButton>
                       
                    }
                    if(horasOcupadas.indexOf(e)!==-1){
                        ocupado="item-horario-ocupado";
                    }
                    if(e>7){
                        if(e<configHorario.intervalo[0]*8 || e>=(configHorario.intervalo[1]+1)*8) return;
                    }
                    if( horasOcupadas.indexOf(e)!=-1){
                        const act = id2actividad(horario,e);
                        if(act){
                            if(act.acr == '') content = (act.nombre==''?'...':act.nombre.substring(0,Math.min(5,act.nombre.length)).toUpperCase());
                            else content = act.acr.toUpperCase()
                            if(act.estado==1) temp =" item-temp"
                            else if (act.estado == 2) temp = " itemp-editando"
                        }
                    }
                    return <div className={"item-horario "+state +" "+horasclass+" "+ocupado+temp} 
                    id={`item-horario-${e}`} key={`item-${e}`}>
                        {content}
                    </div>
                })

            }
            <div  className='descp-item-horario' id='description-horario'>
                <div id="description-content-horario">
                    {contentDescription}
                </div>
            </div>
            
        </div>
        {ocultarDescripcion?ayudaVacio:descripcionRender}
        {visibleConfig?null:<ConfigHorario 
        sub = {getSub()}
        minmaxIntervalo={
            [minHoraIntervalo(horario),
                maxHoraIntervalo(horario)]
        }
        
        handleMinMax={handleMinMax}
        handleVisible={handleVisibleConfig}
        intervalo={minmaxIntervalo}
        handleIntervalo={handleIntervaloHoras}/>}
        {visibleAlert}
        {mensajesAlertComplete}
    </div>
    
  )
}
