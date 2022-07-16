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
import { act } from 'react-dom/test-utils';
import MensajeAlert from './MensajeAlert';
import MensajeAlertWithBottons from './MensajeAlertWithBottons';
import MensajesCompletos from './MensajesCompletos';
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
const diasSemana = 'L,M,M,J,V,S,D'.split(",");
export default function DescripcionActividad(props) {
    const dispatch = useDispatch();
    const horario = useSelector((state)=>state.horario.value);
    const configHorario = useSelector((state)=>state.configHorario.value)
    const [stateButton,setStateButton] = useState(0);
    const [actividad,setActividad] = useState(actividadDefault);
    const [editable,setEditable] = useState(false);
    const [duracion,setDuracion] = useState([0,1]);
    const [duracionFin,setDuracionFin] = useState(24);
    const[llenarMic,setLlenarMic] = useState(null);
    const [alertContent,setAlertContent] = useState(null);
    
    const handleVisible = () =>{
        props.handleVisible(true);
        dispatch(restoreActivity());
    }
    /**
     *console.log(props.actividad,"Desp");
        if(!props.actividad) return;
        setEditable(props.default);
        const newAct = {...props.actividad,intervalo:actividad2intervalo(props.actividad),estado:1}; 
        dispatch(addActivity(newAct));
        setActividad(newAct);
        setDuracion([props.actividad.inicio,props.actividad.fin]);
        setDuracionFin(props.actividad.fin);
        if(props.default==true) {
            setStateButton(1);
        }
        else {
            setStateButton(0);
        }
     */
    useEffect(()=>{
        //if(props.actividad.dia == -1) return;
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
        setStateButton(0);
        handleVisible();
    }
    const handleMensajeDisplay = (msg)=>{
        props.mensajeDisplay(<MensajesCompletos
            content={msg} 
            visible={props.mensajeDisplay}/>)
        setTimeout(()=>{
            props.mensajeDisplay(null);
        },1500);
    }
    // Crear editar guardar
    const handleClickState = () =>{
        if(stateButton==0){
            setEditable(true);
            setStateButton(2);
            console.log("Hola donde estoy",props.idAct);
            dispatch(changeEditableActivity(props.idAct));
            return;
        }
        if(stateButton==1){
            if(actividad.nombre.match(/^\s*$/)){
                setAlertContent(<MensajeAlert
                    visible = {setAlertContent}/>)
                console.log("Hola");
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
                
                setAlertContent(<MensajeAlertWithBottons  
                    mensaje = "Existe una tarea dentro del intervalo, desea sobreescribir"
                    visible = {setAlertContent} onAccept ={acceptSobreescritura}/>)
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
                setStateButton(0);
                handleVisible();
                handleMensajeDisplay("Actividad Creada, sobreescribiendo actividad(es)");
                return;
            }
            dispatch(saveActivity());
            /* Falta validar cuando esta vacio */
            
            setStateButton(0);
            handleVisible();
            handleMensajeDisplay("Actividad Creada");
            return;
        }
        if(stateButton==2){
            if(actividad.nombre.match(/^\s*$/)){
                setAlertContent(<MensajeAlert visible = {setAlertContent}/>)
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
                setStateButton(0);
                handleVisible();
                handleMensajeDisplay("Actividad Editada, se sobreescribieron actividad(es)");
                return;
            }




            dispatch(saveActivity());
            setStateButton(0);
            handleVisible();
            handleMensajeDisplay("Actividad Editada");
            return;
        } 

    }
    const handleEliminarActividad = () =>{
        
        if(props.idAct==-1) return;
        handleMensajeDisplay("Actividad Eliminada");
        
        dispatch(deleteActivity(props.idAct));
        props.handleVisible(true);
        
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
        setLlenarMic(<MicroFormHorario setVisible={setLlenarMic}/>)
    }
    useEffect(()=>{
        const actTemp = {...actividad,
            inicio:duracion[0],fin:duracion[1],estado:1}
        const intervaloAct = actividad2intervalo(actTemp);
        dispatch(addActivity({...actTemp,intervalo:intervaloAct}))
        
    },[actividad,duracion,duracionFin])
    
  return (
    <>
    <div className='actividad-description'>  
        <Badge 
        badgeContent={
            <button className='button-close' onClick={handleVisible}>
                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
            </button>
        }
        sx={{
            
            width:'80%',
            mx:'auto',
            p:2,
            border:'2px solid black',
            borderRadius:2,
            backgroundColor:'white',
            boxShadow:4  
        }}
        
        >
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
            <TextField
            required
            id="standard-required"
            label="Nombre"
            
            value={actividad.nombre}
            
            sx={{justifyContent:'center'}}
           
            onChange={handleNombre}
            />
            <TextField
            id="standard-read-only-input"
            label="Acrónimo"
            value={actividad.acr}
            
            onChange={handleAcr}
            />
            
            <TextField
            id="standard-read-only-input"
            label="Descripcion"
            value={actividad.descrip}
            
            
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
            <MicIcon  sx={{ fontSize: 40,color:'white','&:hover':{color:'green'} }} />
        </div>
        </Badge>
        
    </div>
    {alertContent}
    {llenarMic}
    
    
    </>
  )
}
