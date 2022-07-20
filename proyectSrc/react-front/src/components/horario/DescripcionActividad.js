import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge  from '@mui/material/Badge';
import MicIcon from '@mui/icons-material/Mic';
import { FormControl,Slider,Typography } from '@mui/material';
import { width } from '@mui/system';
import MicroFormHorario from './MicroFormHorario';
import {act2horario, actividad2intervalo} from './utilsHorario';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import './descripcionHorario.css';
import { deleteActivity,addTempActivity, addActivity,
    saveActivity,handleTempActivity,restoreActivity, changeEditableActivity, saveWithSobrescritura, sobrescribirTodo } from '../../stores/sliceHorario';
import { useDispatch,useSelector} from 'react-redux';
import MensajeAlert from './MensajeAlert';
import MensajeAlertWithBottons from './MensajeAlertWithBottons';
import MensajesCompletos from './MensajesCompletos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setMensaje } from '../../stores/sliceMensajesCortos';
import MensajeAdvertencia from './MensajeAdvertencia';
import { restoreValueConfig } from '../../stores/sliceConfigHorario';
import SR,{ useSpeechRecognition } from 'react-speech-recognition';
import { getDescCommands } from '../../speechMethods/horarioMethods';




const stateButton2String =  (state) =>{
    const stringState = ['Editar','Crear','Guardar'];
    return stringState[state];
}
const actividadDefault = {
    nombre:'',acr:'',descrip:'',dia:-1,inicio:-1,fin:-1,link:''
}
function valuetext(value) {
    return `${value}°C`;
  }
const validarActividad = (actividades,newActividad) =>{
    let flag = true;
    actividades.forEach(element => {
        console.log(element);
    });
    return flag;
}
const sobrescribir = (actividades)=>{
    console.log("Entro");
    const actualSave = actividades.filter((e)=> {return e.estado==1})[0];
    console.log("Oremos");
    const witoutTemps = actividades.filter((e)=>{
        return (e.estado!=2)
    });
    const inter = null;
    const mapeado = witoutTemps.map((e)=>{
        if(e.dia == actualSave.dia){
            if(e.fin>actualSave.inicio && e.inicio<actualSave.inicio){
                //console.log(e);
                return {...e,fin:actualSave.inicio};
            }
            if(e.inicio<actualSave.fin && actualSave.fin<e.fin){
                return {...e,inicio:actualSave.fin};
            }
            if(e.inicio<actualSave.inicio && actualSave.fin<e.fin){
                inter = e;
                return {...e,estado:3};
            }
            if(actualSave.inicio < e.inicio && e.fin<actualSave.fin){
                return {...e,estado:3};
            }
            if(actualSave.inicio == e.inicio && actualSave.fin == e.fin && e.estado!=1 ){
                return {...e,estado:3}
            }
        }
        return e;
    });
    console.log("Actual save:",actualSave);
    if(inter!=null){
        mapeado = [...mapeado,
            {...inter,inicio:inter.incio,fin:actualSave.inicio},
            {...inter,inicio:inter.fin,fin:actualSave.fin}]
    }
            
    return mapeado.filter((e)=>{
        return (e.estado!=3)
    }).map((e)=>{return {...e,estado:0,intervalo:actividad2intervalo(e)}});
}

const saveActual = (actividades) =>{

    return actividades.filter((e)=>{
        return (e.estado!=2)
    }).map((e)=> {return {...e,estado:0}})
}
const deleteForActivity = (actividades,idAct) =>{
    return actividades.filter((e)=>{
        return (e.intervalo.indexOf(idAct)==-1)
    })
}
const actualizarHorarioRequest = async(newHorario,sub) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const content = JSON.stringify({
        horario:newHorario
    })
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: content,
        redirect: 'follow'
    }
    const res = await fetch(`http://localhost:4000/api/horario/${sub}`,requestOptions);
    return res;

}

const diasSemana = 'L,M,M,J,V,S,D'.split(",");
export default function DescripcionActividad(props) {
    const dispatch = useDispatch();
    const horario = useSelector((state)=>state.horario.value);
    const configHorario = useSelector((state)=>state.configHorario.value)
    const configBase = useSelector((state)=>state.configHorario.base);
    const [stateButton,setStateButton] = useState(0);
    const [actividad,setActividad] = useState(actividadDefault);
    const [editable,setEditable] = useState(false);
    const [duracion,setDuracion] = useState([0,1]);
    const [duracionFin,setDuracionFin] = useState(24);
    const[llenarMic,setLlenarMic] = useState(null);
    const [alertContent,setAlertContent] = useState(null);
    const [puntero,setPuntero] = useState(null);
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
    const matches = useMediaQuery('(min-height:750px)');
    
    //useEffect(()=>{
    //    console.log("Funciona",matches);
    //},[matches])

    const handleVisible = () =>{
        
        props.handleVisible(true);
        
        
    }
    const closeDescription = () =>{
        props.handleVisible(true);
        dispatch(restoreValueConfig());
        dispatch(restoreActivity());
    }
    useEffect(()=>{
        if(!props.actividad)return;

        setActividad(props.actividad);
        setDuracion([props.actividad.inicio,props.actividad.fin]);
        setEditable(props.actividad.estado==1?true:false);
        setStateButton(props.actividad.estado==1?1:0)
        setDuracionFin(props.actividad.fin);
        
    },[props])
    
    const handleNombre = (e) =>{
        if(!editable)return;
        if(e.target.value.match(/^\s+/)) return;
        
        setActividad({...actividad,nombre:e.target.value})
    }
    const handleAcr = (e) =>{
        if(!editable) return;
        if(e.target.value.length>5) return;
        setActividad({...actividad,acr:e.target.value})
    }
    const handleDescrip = (e) =>{
        if(!editable) return;
        setActividad({...actividad,descrip:e.target.value})
    }
    const handleLink = (e) =>{
        if(!editable) return;
        
        setActividad({...actividad,link:e.target.value})
    }
    const handleDia = (i) =>{
        if(!editable) return;
        setActividad({...actividad,dia:i});
    }
    const handleIncio = (i) =>{
        if(!editable) return;
        setActividad({...actividad,inicio:i});
    }
    const handleFin = (i) =>{
        if(!editable) return;
        setActividad({...actividad,fin:i});
    }
    const acceptSobreescritura = ()=>{
        console.log("Aceeept");
        const newHorario = sobrescribir(horario);
        console.log(newHorario);
        dispatch(sobrescribirTodo(newHorario)); 
        actualizarHorarioRequest(newHorario,props.sub);
        setStateButton(0);
        handleVisible();
    }
    /*const handleMensajeDisplay = (msg)=>{
        props.mensajeDisplay(<MensajesCompletos
            content={msg} 
            visible={props.mensajeDisplay}/>)
        setTimeout(()=>{
            props.mensajeDisplay(null);
        },1500);
    }*/
    //Crear editar guardar
    const actividadSinNombrePaper = () =>{
        return <MensajeAdvertencia
        visible={setMensajeAdvertenciaDisplay}
        content={"Al parecer tu actividad no tiene un nombre."}
        imgContent={"./Existe.jpg"}
        comentario={<>
                Puedes colocar un nombre a tu actividad que mas te recuerde a ella
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    ok
                </button>
                </>}
        />
    }
    const actividadSobreescritaPaper = () =>{
        return <MensajeAdvertencia
        visible={setMensajeAdvertenciaDisplay}
        content={"Ya tienes una actividad, Quieres sobre escribirlo"}
        
        comentario={<>
                <div className='advertencia-buttons-container'>
                    <button className='btn-advertencia-ok' onClick={acceptSobreescritura}
                    >Si</button>
                    <button className='btn-advertencia-no' 
                    onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>No</button>
                </div>
                Puedes desactivar esta advertencia en las configuraciones.
                
                </>}
        />
    }
    const handleClickState = () =>{
        if(stateButton==0){
            setEditable(true);
            setStateButton(2);
            console.log("Hola donde estoy",props.idAct);
            dispatch(changeEditableActivity(props.idAct));
            return;
        }
        //Crear
        if(stateButton==1){
            if(actividad.nombre.match(/^\s*$/)){
                setMensajeAdvertenciaDisplay(actividadSinNombrePaper);
                return;
            }
            const actTemp = {...actividad,
                inicio:duracion[0],fin:duracion[1],estado:1}
            const intervaloActTemp = actividad2intervalo(actTemp);
            const intervaloTemp = act2horario(horario,[0]);
            console.log("Interval ? ",intervaloActTemp);
            let flag = false;
            intervaloActTemp.forEach((e)=>{
                if(intervaloTemp.indexOf(e)!=-1) flag =true;
            })
            
            if(flag && !configHorario.sobrescribir){
                setMensajeAdvertenciaDisplay(actividadSobreescritaPaper);
                //setAlertContent(<MensajeAlertWithBottons  
                //    mensaje = "Existe una tarea dentro del intervalo, desea sobreescribir"
                //    visible = {setAlertContent} onAccept ={acceptSobreescritura}/>)
                //mostrar advertencia
                return;
            }
            console.log("flas",flag);
            if(flag){
                //Guardar sobreescribirendo
                
                //dispatch(saveWithSobrescritura());
                const newHorario = sobrescribir(horario);
                console.log(newHorario);
                dispatch(sobrescribirTodo(newHorario));
                actualizarHorarioRequest(newHorario,props.sub);
                setStateButton(0);
                handleVisible();
                //handleMensajeDisplay("Actividad Creada, sobreescribiendo actividad(es)");
                dispatch(setMensaje({content:"Actividad Creada, se sobreescribieron actividad(es)"
                    ,visible:true}));
                return;
            }
            //dispatch(saveActivity());
            /* Falta validar cuando esta vacio */
            const newHorario = saveActual(horario);
            dispatch(sobrescribirTodo(newHorario));
            actualizarHorarioRequest(newHorario,props.sub);

            setStateButton(0);
            handleVisible();
            //handleMensajeDisplay("Actividad Creada");
            dispatch(setMensaje({content:"Actividad Creada",
                    visible:true}));
            return;
        }
        if(stateButton==2){
            if(actividad.nombre.match(/^\s*$/)){
                setMensajeAdvertenciaDisplay(<MensajeAdvertencia
                visible={setMensajeAdvertenciaDisplay}/>)
                return;
            }
            const actTemp = {...actividad,
                inicio:duracion[0],fin:duracion[1],estado:1}
            const intervaloActTemp = actividad2intervalo(actTemp);
            const intervaloTemp = act2horario(horario,[0]);
            console.log("Interval ? ",intervaloActTemp);
            let flag = false;
            intervaloActTemp.forEach((e)=>{
                if(intervaloTemp.indexOf(e)!=-1) flag =true;
            })
            
            if(flag && !configHorario.sobrescribir){
                setMensajeAdvertenciaDisplay(actividadSobreescritaPaper);
                //setAlertContent(<MensajeAlertWithBottons  
                //    mensaje = "Existe una tarea dentro del intervalo, desea sobreescribir"
                //visible = {setAlertContent} onAccept ={acceptSobreescritura}/>)
                //mostrar advertencia
                return;
            }
            console.log("flas",flag);
            if(flag){
                //Guardar sobreescribirendo
                
                //dispatch(saveWithSobrescritura());
                const newHorario = sobrescribir(horario);
                console.log(newHorario);
                dispatch(sobrescribirTodo(newHorario));
                actualizarHorarioRequest(newHorario,props.sub);
                setStateButton(0);
                handleVisible();
                //handleMensajeDisplay("Actividad Editada, se sobreescribieron actividad(es)");
                dispatch(setMensaje({content:"Actividad Editada, se sobreescribieron actividad(es)"
                    ,visible:true}));
                return;
            }




            const newHorario = saveActual(horario);
            dispatch(sobrescribirTodo(newHorario));
            actualizarHorarioRequest(newHorario,props.sub);
            setStateButton(0);
            handleVisible();
            
            dispatch(setMensaje({content:"Actividad Editada",
                    visible:true}))
            return;
        } 

    }
    const handleEliminarActividad = () =>{
        
        if(props.idAct==-1) return;
        
        
        dispatch(deleteActivity(props.idAct));
        const newHorario = deleteForActivity(horario,props.idAct);
        actualizarHorarioRequest(newHorario,props.sub);
        props.handleVisible(true);
        dispatch(setMensaje({content:"Actividad Eliminada",
                    visible:true}));
        
    }
    const handleDuracionInicio = (e) =>{
        if(!editable) return;
        if(e.target.value=="") {
            setDuracion([0,duracion[1]]);
            return;
        }
        const newMin = parseInt(e.target.value);
        if(newMin>23) return;
        if(newMin>=duracion[1]){
            setDuracion([newMin,newMin+1]);
            setDuracionFin(newMin+1);
            return;
        }
        setDuracion([newMin,duracion[1]]);

    }
    
    const handleDuracionFin = (e) =>{
        if(!editable) return;
        if(e.target.value==""){
            setDuracionFin(e.target.value);
            return;
        }
        const newMax = parseInt(e.target.value);
        if(newMax>24) return;
        if(newMax>duracion[0]){
            setDuracion([duracion[0],newMax])
        }
        setDuracionFin(newMax);

    } 
    const handleSliderDuration  = (event, newValue,activeThumb) =>{
        if(!editable) return;
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            const newMin = Math.min(newValue[0], duracion[1] - 1);
            setDuracion([newMin, duracion[1]]);  
            
        } else {
            const newMax = Math.max(newValue[1], duracion[0] + 1);
            setDuracion([duracion[0],newMax ]);
            setDuracionFin(newMax);
            
        }
    }



    const handleMic=()=>{
        //setLlenarMic(<MicroFormHorario setVisible={setLlenarMic}/>)   
        if (listening)
            SR.stopListening();
        else
            SR.startListening({language:'es',continuous:false});   
    }
    useEffect(()=>{
        const actTemp = {...actividad,
            inicio:duracion[0],fin:duracion[1],estado:1}
        const intervaloAct = actividad2intervalo(actTemp);
        dispatch(addActivity({...actTemp,intervalo:intervaloAct}))
        
    },[actividad,duracion,duracionFin])
    
    const setPunteroPage     = (puntero)=>setPuntero(puntero);
    const setDictionary = {
        "nombre": (tra)=>{handleNombre({target:{value:tra}})} ,
        "descripción": (tra)=>{handleDescrip({target:{value:tra}})},
        "acrónimo": (tra)=>{handleAcr({target:{value:tra}})},
    }

    const commands = getDescCommands({handleDia,handleDuracionInicio,handleDuracionFin,setDuracion,setDuracionFin,setPunteroPage,handleClickState});
    const {listening,transcript,finalTranscript,resetTranscript} = useSpeechRecognition({commands:commands});

    useEffect(()=>{
        if (puntero in setDictionary)
            if(puntero && listening){
                //alert("|"+puntero+"|");
                resetTranscript();
                setDictionary[puntero](finalTranscript);
            }
    },[finalTranscript]);

  return (
    <>
    <div className='actividad-description'> 
        <div className='panel-descripcion'>

        
        <div className='container-button-close'>
            <button className='button-close' onClick={closeDescription}>
                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
            </button> 
        </div>

        
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': {mb:'20px',
            width:'100%'
            },
            
        }}
        noValidate
        autoComplete="off"
        >
        <div width={"100%"}>
            {puntero?
            <Typography variant = 'h6' sx = {{width:'100%',textAlign:'center'}}>
                Escribiendo en : {puntero}
            </Typography>
            :
            null}

            <TextField
            required
            className='text-entrain'
            id="standard-required"
            label="Nombre"
            
            value={actividad.nombre}
            
            //inputProps={{style: {fontSize: '0.8em'}}} // font size of input text
            //InputLabelProps={{style: {fontSize: '1em'}}} 
            size={matches?'Normal':"small"}
            onChange={handleNombre}
            />
            <TextField
            id="standard-read-only-input"
            label="Acrónimo"
            value={actividad.acr}
            size={matches?'Normal':"small"}
            onChange={handleAcr}
            />
            
            <TextField
            id="standard-read-only-input"
            label="Descripcion"
            value={actividad.descrip}
            size={matches?'Normal':"small"}
            
            onChange={handleDescrip}
            />
            <Box>
                Dia:
            </Box>
            <Box sx={{
                display:'flex',
                width:'90%',
                border:'solid 2px black',
                justifyContent:'space-around',
                mx:'auto',
                px:2,py:1,userSelect:'none',
                mb:3,
                borderRadius:2
            }}>
                {diasSemana.map((e,i)=>{
                    return <Box key = {"dia"+i} 
                    backgroundColor={actividad.dia==i?"blue":"yellow"}
                    className="item-descripcion-actividad-dia"
                    onClick ={()=>{handleDia(i)}}
                    sx = {{
                        textAlign:'center',px:2,cursor:'pointer',
                        boxShadow:(actividad.dia==i?0:3),
                        borderRadius:1
                    }}
                    
                    >
                            {e}
                        </Box>
                })}
            </Box>
            <Box>
                <Typography>
                    Intervalo Horas : 
                </Typography>
                <Slider
                getAriaLabel={() => 'Temperature range'}
                value={duracion}
                onChange={handleSliderDuration}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={24}
            />
            </Box>
           <FormControl sx = {{display:'flex',flexDirection:'row',px:10}}>
                <TextField label="Desde" 
                inputProps={{type:'number',min:0,max:24}}
                value={duracion[0].toString()}
                onChange={handleDuracionInicio}
                sx = {{maxWidth:100}}
                size={matches?'Normal':"small"}
                />
                <Box sx={{width:'100%',textAlign:'center',fontSize:'2em'}}>
                    -
                </Box>
                <TextField label="Hasta" 
                inputProps={{type:'number',min:duracion[0]+1,max:24}}
                value={duracionFin}
                onChange={handleDuracionFin}
                onBlur={()=>{setDuracionFin(duracion[1])}}
                sx = {{maxWidth:100}}
                size={matches?'Normal':"small"}
                />
           </FormControl>
            {actividad.link !== '' && stateButton==0?
            <div className='ctn-bld'>
                <button className='button-link-descripcion' 
                onClick={(e)=>{e.preventDefault(); window.open(actividad.link,'_blank')}}>
                    <div className='description-button-link'>Ir a actividad</div>
                    <DirectionsRunIcon sx={{fontSize:'1.8em'}}/>
                </button>

            </div>
            
            :
            <TextField
            id="standard-read-only-input"
            label="Link"
            value={actividad.link}
            size={matches?'Normal':"small"}
            onChange={handleLink}
            />
            }
            
        
        </div>
        <Box sx={{
            width:'100%',
            display:'flex',
            justifyContent:'center'
        }}>
            <Button variant="contained" 
            sx={{mr:2}}
            onClick={handleClickState} >{stateButton2String(stateButton)}</Button>
            {stateButton==0?<Button variant="contained" onClick={handleEliminarActividad}>Eliminar</Button>:null}
        </Box>
        </Box>
        <div className='micro-form' 
            onClick={handleMic}>
            {listening?
            <MicIcon  sx={{p:1,  borderRadius:50, background:'blue', color:'white',cursor:'pointer', width: 50, height: 50 ,'&:hover':{color:'green'} }} />
            :
            <MicIcon  sx={{p:1,  borderRadius:50, background:'red', color:'white',cursor:'pointer', width: 50, height: 50 ,'&:hover':{color:'green'} }} />
            }
            
        </div>
        
    </div>
    </div>
    {alertContent}
    {llenarMic}
    {mensajeAdvertenciaDisplay}
    
    </>
  )
}
