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

const itemHorario = Array.from({length:200},(v,i)=>i);
const dias = 'L,M,M,J,V,S,D'.split(",");

const act2horario = (actividades) =>{
    const act = []
    actividades.forEach((e) => {
        for(let i=e.inicio;i<e.fin;i++){
            act.push((i)*8+e.dia+1);
        }  
    });
    return act.sort((a,b)=>{return a-b});
}

const id2actividad = (actividades,id) =>{
    
    let act;
    actividades.forEach((e)=>{
        if(e.intervalo.indexOf(id)!=-1) act=e;
        
    })
    return act;
}

const minHoraIntervalo = (actividades) =>{
    let min=0;
    actividades.map((e,i)=>{
        if(i==0) min=e.inicio;
        else{
            if(min>e.inicio) min=e.inicio;
        }
    })
    return min;
}
const maxHoraIntervalo = (actividades) =>{
    let max = 0;
    actividades.map((e,i)=>{
        if(max<e.fin) max=e.fin;
    })
    return max-1;
}

const actividadDefault = {
    nombre:'',acr:'',descrip:'',dia:-1,incio:-1,fin:-1,link:''
}
const getFinWithDefault = (dia,inicio,horasOcupadas) =>{
    let i =0;
    while (i<3){
        const newFin = (inicio+i)*8 + dia+1;
        if(horasOcupadas.indexOf(newFin)!=-1) return i
        i++;
        
    }
    return i;
}

const minDistance = 8;


export default function Horario() {
    
    const [ocultarDescripcion, setOcultarDescripcion] = useState(true);
    const [visibleConfig,setVisibleConfig] = useState(true);
    const [actividades,setActividades ] = useState([]);
    const [intervaloHoras,setIntervaloHoras]=useState(false);
    const [minmaxIntervalo,setMinmaxIntervalo] = useState([0,24]);
    const [horasOcupadas,setHorasOcupadas] = useState([]);
    const [contentDescription,setContentDescription] = useState("");
    const [idSelect,setIdSelect] = useState(0);
    const [actividadSelect,setActividadSelect] = useState('None');
    const [descripcionRender,setDescripcionRender] = useState(null);
    const [newActividad,setNewActividad] = useState(null);
    const [visibleAlert,setVisibleAlert] = useState(null);
    useEffect(() =>{
        updateAllwithActividades(actividadesInfo);
    },[])
    const updateAllwithActividades = (actAll) =>{
        setActividades(actAll);
        setHorasOcupadas(act2horario(actAll));
        if(maxHoraIntervalo(actAll)-minHoraIntervalo(actAll)>minDistance){
            setMinmaxIntervalo([minHoraIntervalo(actAll),
                maxHoraIntervalo(actAll)]);
        }
        
    }
    const eliminarActividad = (id) =>{
        const newActividades = actividades.filter((e)=>{
            return (e.intervalo.indexOf(id)==-1)
        })
        updateAllwithActividades(newActividades);
        setOcultarDescripcion(true);
        console.log(newActividades);
    }
    
    const tempActividades = (act) =>{
        const nombre = act.nombre==''?'Ingrese el nombre de la actividad':act.nombre;
        const acr = act.acr ==''? '...':act.acr;
        const at = new Actividad(nombre,acr,act.descrip,
            act.dia,act.inicio,act.fin,1,act.link);
        setNewActividad(at);
        if(at.inicio==-1 || at.dia==-1) return;
        updateAllwithActividades([...actividades,at])
    }
    const guardarActividades = (act) =>{
        if(act.nombre == '') {
            setVisibleAlert(<MensajeAlert visible={setVisibleAlert}
            mensaje={"Ingresa un nombre a tu actividad"}/>);
            return;
        }
        if(act.acr=='') act.acr=act.nombre.substring(0,5).replace("",' '); 
        const act1 = new Actividad(act.nombre,act.acr,act.descrip,act.dia,
            act.inicio,act.fin,act.estado,act.link);
        setActividades([...actividades,act]);
        updateAllwithActividades([...actividades,act1]);
        setOcultarDescripcion(true);
        
    }



    useEffect(()=>{
        if(horasOcupadas.indexOf(idSelect)!=-1){
            const act = id2actividad(actividades,idSelect);
            setDescripcionRender(<DescripcionActividad 
                default={false}
                idAct = {idSelect}
                deleteActividad = {eliminarActividad}
                actividad={act}
                handleVisible={setOcultarDescripcion} 
                visible={ocultarDescripcion}
                minmax={minmaxIntervalo} actividades={actividades}
                tempActividad={tempActividades}
                saveActividades={guardarActividades} />);
        }else{
            const dia = idSelect%8-1;
            const inicio = Math.floor(idSelect/8);
            const space = getFinWithDefault(dia,inicio,horasOcupadas);

            
            
            setDescripcionRender(<DescripcionActividad 
                actividad={{...actividadDefault,dia,inicio,fin:inicio+space}}
                idAct={-1}
                default={true}
        handleVisible={setOcultarDescripcion} 
        visible={ocultarDescripcion} 
        minmax = {minmaxIntervalo}
        actividades={actividades}
        tempActividad={tempActividades}
        saveActividades={guardarActividades}/>);
        }
        
    },[idSelect]);

    

    
    useState(()=>{
        if(!newActividad) return;
        
        newActividad.intervalo.map((e,k)=>{
            const item = document.getElementById(`item-horario-${e}`);
            console.log(item);
        })
    },[newActividad])
    useEffect(()=>{

        const elementos = document.getElementsByClassName('unlock-item');
        
        const tam = elementos.length;
        const descpHorario= document.getElementById('description-horario');
        
        for(let i=0;i<tam;i++){
            elementos[i].onclick = () =>{
                const numEle = parseInt(elementos[i].id.match(/(\d+)/)[0]);
                setIdSelect(numEle);
                setOcultarDescripcion(false);
                const newActividades = actividades.filter((e)=>{return (e.estado==0)})
                if(newActividades.length!=actividades.length) updateAllwithActividades(newActividades);
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
                    const act = id2actividad(actividades,numEle);
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
    useEffect (()=>{
        if(ocultarDescripcion && actividades.length>0){
            const newActividades = actividades.filter((e)=>{
                return (e.estado==0);
            })
            updateAllwithActividades(newActividades);
        }
    },[ocultarDescripcion])
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
                    if( (e>0 && e<8) || e%8==0) state = "lock-item";
                    if(e>0 && e<8) content = dias[e-1];
                    if(e%8==0){
                        content = Math.floor(e/8);
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
                    if(horasOcupadas.indexOf(e)!=-1){
                        const act = id2actividad(actividades,e);
                        content = act.acr.toUpperCase();
                        if(act.estado==1) temp =" item-temp"
                    }
                    return <div className={"item-horario "+state +" "+horasclass+" "+ocupado+temp} 
                    id={`item-horario-${e}`} key={`item-${e}`}>
                        {content}
                    </div>
                })

            }
            <div className='descp-item-horario' id='description-horario'>
                <div id="description-content-horario">
                    {contentDescription}
                </div>
            </div>
            
        </div>
        {ocultarDescripcion?null:descripcionRender}


        {visibleConfig?null:<ConfigHorario minmaxIntervalo={
            [minHoraIntervalo(actividades),
                maxHoraIntervalo(actividades)]
        }
        handleMinMax={handleMinMax}
        handleVisible={handleVisibleConfig}
        intervalo={minmaxIntervalo}
        handleIntervalo={handleIntervaloHoras}/>}
        {visibleAlert}
    </div>
    
  )
}
