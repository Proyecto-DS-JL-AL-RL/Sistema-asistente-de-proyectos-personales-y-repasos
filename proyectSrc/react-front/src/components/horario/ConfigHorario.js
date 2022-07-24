import './estilosHorario.css';
import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Badge  from '@mui/material/Badge';
import { FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Slider, Switch as Sw, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useSelector,useDispatch} from 'react-redux';
import { changeIntervalo,changeIntervaloDefault, changeSobreescribir, changeTema } from '../../stores/sliceConfigHorario';
import {actividades2Intervalo,act2horario, temaChangeCSS}from './utilsHorario';
import SaveIcon from '@mui/icons-material/Save';
import ConstructionIcon from '@mui/icons-material/Construction';
import MicIcon from '@mui/icons-material/Mic';
import { setMensaje } from '../../stores/sliceMensajesCortos';

//const stateButton2String =  (state) =>{
//    const stringState = ['Editar','Crear','Guardar'];
//    return stringState[state];
//}

function valuetext(value) {
    return `${value}°C`;
  }

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
    const res = await fetch(`http://localhost:4000/api/horarioconfig/${sub}`,requestOptions);
    return res;

}
const minDistance = 8;
const temasDisponibles = Array.from({length:4},(_,e)=>{return "tema"+e})
export default function ConfigHorario(props) {
    const configHorario = useSelector((state)=>state.configHorario.value);
    const horario = useSelector((state)=>state.horario.value);
    const dispatch = useDispatch();

    //const [stateButton,setStateButton] = useState(0);
    //const [intervaloHoras,setIntervaloHoras]=useState(false);
    //const [value, setValue] = useState([2, 15]);
    const [temaValue,setTemaValue] = useState(0);
   // const [onlyMinMax,setOnlyMinMax] = useState(true);
    //const [intervaloMinMax,setIntervaloMinMax ] = useState(actividades2Intervalo(horario));
    const [minmax,setMinMax] = useState(actividades2Intervalo(horario));

    /*useState(()=>{
        if(!Array.isArray(props.intervalo)) return;
        setIntervaloMinMax(props.intervalo);
    },[props])*/
    
    useState(()=>{
        //if(!horario) return;
        setMinMax(actividades2Intervalo(horario));
    },[horario])
    const handleChange = (event, newValue,activeThumb) => {
        
        if (!Array.isArray(newValue)) {
            return;
        }
        
        if(!configHorario.defaultIntervalo) dispatch(changeIntervaloDefault(false));
        const minmax1 = (act2horario(horario,[0])).length==0?[25,-1]:minmax;
        
        if (activeThumb === 0) {
            const newMin = Math.min(newValue[0], configHorario.intervalo[1] - minDistance,minmax1[0]);
            if(configHorario.intervalo[0]!=newMin){
                dispatch(changeIntervalo([newMin,configHorario.intervalo[1]]));
            }
        } else {
            const newMax = Math.max(newValue[1], configHorario.intervalo[0] + minDistance,minmax1[1]);
            if(configHorario.intervalo[1] !=newMax){
                dispatch(changeIntervalo([configHorario.intervalo[0],newMax]));
            }
        }
    };
   
    
    const handleTema = (e) =>{
        
        dispatch(changeTema(e.target.value));
        temaChangeCSS(e.target.value);
        dispatch(setMensaje({content:"Cambiando tema",
        visible:true}))
    }
    const handleOnlyMinMax = (e) =>{
        //console.log(e.target.checked);
        if(e.target.checked){
            dispatch(changeIntervaloDefault(e.target.checked));
            
            if((act2horario(horario,[0])).length!=0){
                if(minmax[1]-minmax[0]>8){
                    dispatch(changeIntervalo(minmax));
                }
                
            }
            
        }else{
            dispatch(changeIntervaloDefault(e.target.checked));
        }
        
    }
    const handleSobrescribir = (e) =>{
        dispatch(changeSobreescribir(e.target.checked));
        dispatch(setMensaje({content:e.target.checked===true?"Se sobreescribiran las actividades automaticamente":"Se desactivo la sobrescritura",
        visible:true}))
    }
    const cerrarConfig = () =>{
        props.handleVisible();
        
        actualizarHorarioConfigRequest(configHorario,props.sub);
        dispatch(setMensaje({content:"Guardando Configuraciones",
        visible:true}))
    }
  return (
    <div className='config-horario'>
        <Badge 
        badgeContent={
            <button className='button-close' onClick={cerrarConfig}>
                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
            </button>
        }
        sx={{
            width:'80%',
            mx:'auto',
            p:3,
            border:'2px solid black',
            backgroundColor:'white',
            borderRadius:'10px',
            boxShadow:'0 0 4px 4px rgba(0, 0,0 , 0.6)'   
        }}
        >
        
        <Box sx={{
            width:'100%'
        }}>
            <Typography variant='h5' sx={{display:'flex',alignItems:'center'}}>
                <ConstructionIcon/>
                Configuracion Horario:
            </Typography>
            <Box>
                <Typography>
                    Intervalo Horas : 
                </Typography>
                <Slider
                getAriaLabel={() => 'Temperature range'}
                value={configHorario.intervalo}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={24}
            />
            </Box>
            <FormGroup>
                <FormControlLabel control={
                    <Sw checked={configHorario.intervaloDefault}
                     onChange={handleOnlyMinMax}/>

                } label="Intervalo por default "/>
            </FormGroup>
            <Typography>
                Tema
            </Typography>
            <FormControl sx={{ m: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Age
                </InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={configHorario.tema}
                label="Age"
                onChange={handleTema}
                >
                {temasDisponibles.map((e,i)=>{
                    return <MenuItem key={"tema-select-"+i} value={i}>
                        {e}
                    </MenuItem>
                })}
            
                </Select>
                <FormHelperText>Selecciona un tema para el horario</FormHelperText>
            </FormControl>
            <div className='mostrar-tema'>
                {(Array.from({length:5},(_,e)=>e)).map((e)=>{
                    return <div className='item-tema' id={`descrip-tema-${e}`} key={`item-des-${e}`}>
                        {e}
                    </div>
                })}
                
                
            </div>
            <FormGroup>
                <FormControlLabel control={
                    <Sw checked={configHorario.sobrescribir}
                    onChange={handleSobrescribir}
                     />

                } label="sobreEscribir "/>
            </FormGroup>
           <div className='content-button-display'>
                <button className='button-save' onClick={cerrarConfig}>
                    <SaveIcon sx={{color:'white',fontSize:'2em','&:hover':{color:'black'}}}/>
                    <div>Guardar</div>
                </button> 
           </div>
            
        
        </Box>
        <div className='micro-form'>
            <MicIcon  sx={{p:1,  borderRadius:50, background:'transparent', color:'white',cursor:'pointer', width: 50, height: 50 ,'&:hover':{color:'green'} }}/>
        </div>
        
        </Badge>
    </div>
  )
}
/**
 * 
 <input type={'color'}/>
            <input type={'color'}/>
            <input type={'color'}/>
            <input type={'color'}/>
 */