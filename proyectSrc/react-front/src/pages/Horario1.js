import React from 'react';
import { useEffect,useState } from 'react';


import HandymanIcon from '@mui/icons-material/Handyman';

import './horario.css';
import { display, width } from '@mui/system';
import { IconButton } from '@mui/material';
import DescripcionActividad from '../components/horario/DescripcionActividad';
import ConfigHorario from '../components/horario/ConfigHorario';
import { actividadesInfo,Actividad } from '../components/horario/HorarioInfo';
import MensajeAlert from '../components/horario/MensajeAlert';
import { useSelector,useDispatch} from 'react-redux';
import { changeEditableActivity, restoreActivity } from '../stores/sliceHorario';
import { actividad2intervalo } from '../components/horario/utilsHorario';
import { changeContent } from '../stores/sliceAyuda';
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
            console.log(e.estado);
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




export default function Horario(props) {
    const horario = useSelector((state)=>state.horario.value);
    const dispatch = useDispatch();

    const [ocultarDescripcion, setOcultarDescripcion] = useState(true);
    const [visibleConfig,setVisibleConfig] = useState(true);
    const [intervaloHoras,setIntervaloHoras]=useState(false);
    const [minmaxIntervalo,setMinmaxIntervalo] = useState([0,24]);
    const [horasOcupadas,setHorasOcupadas] = useState([]);
    const [contentDescription,setContentDescription] = useState("");
    const [idSelect,setIdSelect] = useState(-1);
    const [actividadSelect,setActividadSelect] = useState('None');
    const [descripcionRender,setDescripcionRender] = useState(null);
    const [newActividad,setNewActividad] = useState(null);
    const [visibleAlert,setVisibleAlert] = useState(null);
    const [formMicHorario,setFormMicHorario] = useState(null);
    /*
    let act = id2actividad(horario,idSelect);
        const acts = id2ObtainAllActivities(horario,idSelect);
        console.log("acts:",acts.length);
        const dia = idSelect%8-1;
        const inicio = Math.floor(idSelect/8);
        const space = getFinWithDefault(dia,inicio,act2horario(horario,[0]));
        if(acts.length==0){
            
            let a =  {...actividadDefault,dia,inicio,
                fin:inicio+space,estado:1} 
            
            return {...a, intervalo:actividad2intervalo(a)}
        }
        if(acts.length==1){
            const newChangeHorario = horario.map((e)=>{
                if(e.intervalo.indexOf(idSelect)!=-1) return {...e,estado:2}
            })
            console.log("Change",newChangeHorario);
        }
        if(act.estado==1){
            console.log(inicio)
            let a =  {...actividadDefault,dia,inicio,fin:inicio+space,estado:1}  
            return {...a, intervalo:actividad2intervalo(a)}
        }
        if(act.estado==0){
            console.log("Editar");
        }
        return act;
    */
    useEffect(()=>{
        const aa = <div>hola</div>
        dispatch(changeContent(aa));
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
                fin:inicio+space,estado:1} 
            
            return {...a, intervalo:actividad2intervalo(a)}
        }
        if(acts.length==2){
            const newChangeHorario = horario.map((e)=>{
                if(e.intervalo.indexOf(idSelect)!=-1) return {...e,estado:2}
            })
            const actEditar = horario.filter((e)=>{
                return (e.estado!=1 && e.intervalo.indexOf(idSelect)!=-1)
            })
            console.log(actEditar);
            return actEditar[0];
            //console.log("Change",newChangeHorario);
            
        }
        if(act.estado==1){
            console.log(inicio)
            let a =  {...actividadDefault,dia,inicio,fin:inicio+space,estado:1}  
            return {...a, intervalo:actividad2intervalo(a)}
        }
        if(act.estado==0){
            console.log("Editar");
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
                const acts = id2ObtainAllActivities(horario,idSelect);
                console.log("Estados",acts.map((e)=>e.estado));

                setDescripcionRender(<DescripcionActividad
                    actividad = {id2actividadClick(numEle)}
                    idAct = {numEle}
                    handleVisible={setOcultarDescripcion} 
                    
                    minmax={minmaxIntervalo} 
                    />)
                
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
                    const act = id2actividad(horario,numEle);
                    setContentDescription(act.nombre);
                }else{
                    setContentDescription("Click para crear ana actividad");
                }
                
            }
            elementos[i].onmouseout = () =>{
                descpHorario.style.display='None';
            }
        }
    },[minmaxIntervalo,horasOcupadas]);
    
    

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
        console.log(horario);
        if(!horario) return;
        let flag_horario = true;
        horario.forEach((e)=>{
            if(e.dia<0) flag_horario=false;
        })
        if (!flag_horario) return;
        setHorasOcupadas(act2horario(horario));
        if(maxHoraIntervalo(horario)-minHoraIntervalo(horario)>minDistance){
            setMinmaxIntervalo([minHoraIntervalo(horario),
                maxHoraIntervalo(horario)]);
        }
        console.log("Tamano hor:",horario.map((e)=>e.estado));
    },[horario])
  return (
    
    <div className='horario-container' >
        <div id="root-horario">
            
            {
                
                itemHorario.map((e)=>{
                    let ocupado="";
                    let state = "unlock-item";
                    let content = "N/D";
                    let horasclass = ""
                    let temp=""
                    let editando = ""
                    if( (e>0 && e<8) || e%8==0) state = "lock-item";
                    if(e>0 && e<8) content = dias[e-1];
                    if(e%8==0){
                        content = `${Math.floor(e/8)-1} : ${Math.floor(e/8)}`;
                        horasclass="horas-item"
                    } 
                    if(e==0){
                       state = "";
                       //horasclass="";
                       content= <IconButton size="small" onClick={() =>{setVisibleConfig(!visibleConfig)}}>
                            <HandymanIcon fontSize="inherit" sx={{fontSize:'1.2em'}}/>
                        </IconButton>
                       
                    }
                    if(horasOcupadas.indexOf(e)!==-1){
                        ocupado="item-horario-ocupado";
                    }
                    if(e>7){
                        if(e<minmaxIntervalo[0]*8 || e>=(minmaxIntervalo[1]+1)*8) return;
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
        {ocultarDescripcion?null:descripcionRender}


        {visibleConfig?null:<ConfigHorario minmaxIntervalo={
            [minHoraIntervalo(horario),
                maxHoraIntervalo(horario)]
        }
        handleMinMax={handleMinMax}
        handleVisible={handleVisibleConfig}
        intervalo={minmaxIntervalo}
        handleIntervalo={handleIntervaloHoras}/>}
        {visibleAlert}
        
    </div>
    
  )
}
