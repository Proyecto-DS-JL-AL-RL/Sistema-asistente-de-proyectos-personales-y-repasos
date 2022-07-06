import './estilosHorario.css';
import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge  from '@mui/material/Badge';
import { FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Slider, Switch as Sw, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const stateButton2String =  (state) =>{
    const stringState = ['Editar','Crear','Guardar'];
    return stringState[state];
}

function valuetext(value) {
    return `${value}°C`;
  }


const minDistance = 8;
const temasDisponibles = Array.from({length:4},(_,e)=>{return "tema"+e})
export default function ConfigHorario(props) {
    const [stateButton,setStateButton] = useState(0);
    const [intervaloHoras,setIntervaloHoras]=useState(false);
    const [value, setValue] = useState([2, 15]);
    const [temaValue,setTemaValue] = useState(0);
    const [onlyMinMax,setOnlyMinMax] = useState(true);
    const [intervaloMinMax,setIntervaloMinMax ] = useState([2,15]);
    useState(()=>{
        if(!Array.isArray(props.intervalo)) return;
        setIntervaloMinMax(props.intervalo);
    },[props])
    const handleChange = (event, newValue,activeThumb) => {
        
        if (!Array.isArray(newValue)) {
            return;
        }
        const minmax = props.minmaxIntervalo;
        if(onlyMinMax) setOnlyMinMax(false);
        if (activeThumb === 0) {
            const newMin = Math.min(newValue[0], intervaloMinMax[1] - minDistance,minmax[0]);
            setIntervaloMinMax([newMin, intervaloMinMax[1]]);  
            props.handleMinMax(newMin,intervaloMinMax[1]); 
        } else {
            const newMax = Math.max(newValue[1], intervaloMinMax[0] + minDistance,minmax[1]);
            setIntervaloMinMax([intervaloMinMax[0],newMax ]); 
            props.handleMinMax(intervaloMinMax[0],newMax);
        }
    };
    const handleTemaValue = (e) =>{
        console.log(e.target.value)
        setTemaValue(e.target.value)
        
    }
    const [age, setAge] = React.useState('');

    const handleChange1 = (event) => {
        setAge(event.target.value);
    };
    const handleOnlyMinMax = (e) =>{
        console.log(e.target.checked);
        
        setIntervaloMinMax(props.minmaxIntervalo);
        props.handleMinMax(props.minmaxIntervalo[0],props.minmaxIntervalo[1]);
        
        setOnlyMinMax(e.target.checked);
    }
  return (
    <div className='config-horario'>
        <Badge 
        badgeContent={
            <button className='button-close' onClick={props.handleVisible}>
                <ClearIcon sx={{color:'white',fontSize:'1em','&:hover':{color:'black'}}}/>
            </button>
        }
        sx={{
            
            width:'80%',
            mx:'auto',
            p:2,
            border:'2px solid black',
            backgroundColor:'white',   
        }}
        
        >
        
        <Box sx={{
            width:'100%'
        }}>
            <Typography variant='h5'>Configuracion Horario:</Typography>
            <Box>
                <Typography>
                    Intervalo Horas : 
                </Typography>
                <Slider
                getAriaLabel={() => 'Temperature range'}
                value={intervaloMinMax}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={24}
            />
            </Box>
            <FormGroup>
                <FormControlLabel control={
                    <Sw checked={onlyMinMax}
                     onChange={handleOnlyMinMax}/>

                } label="no se "/>
            </FormGroup>
            <Typography>
                Tema
            </Typography>
            <FormControl sx={{ m: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Age"
                onChange={handleChange1}
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
                <div className='item-tema'>
                    a
                </div>
                <div className='item-tema'>
                    b
                </div>
                <div className='item-tema'>
                    c
                </div>
                <div className='item-tema'>
                    d
                </div>
            </div>

           
            
        
        </Box>
        
        
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