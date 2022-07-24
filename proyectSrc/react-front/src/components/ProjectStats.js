import React,{useState,useEffect} from "react";
import {Grid, Typography} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export default function ProjectStats(props){
    const [stats,setStats] = useState([
        {label:'Constancia',value:0},
        {label:'Logros',value:0},
        {label:'puntos',value:200}
    ])

    useEffect(()=>{
        setStats(props.stats);
        const constancia = Math.round(props.stats?.ConstanciaDiff);
        setStats([
            {label:'Dias de inactividad: ',value: String(constancia)},
            {label:'Actividades Registradas',value:props.stats?.LogrosDiff},
            {label:'Puntos',value:props.stats?.Puntos}
        ]);
    },[props.stats]);

    return(
    <React.Fragment>
        <Grid container sx = {{bgcolor:'Pink', height:'100%', borderRadius :'30px'}} direction = 'column'>
            {stats.map((stat,idx)=>(
                <Grid key = {idx} item container xs = {4} direction = 'row'>
                    <Grid container item xs = {8} sx = {{}} justifyContent = 'center' direction = 'column'>
                        <Grid item>
                            <Typography sx = {{}} textAlign = 'left' ml={3} mr = {3} variant = 'h5'>
                                {stat.label}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs = {4} sx = {{}} justifyContent = 'center' direction = 'column'>
                        <Grid item>
                            <Typography sx = {{}} textAlign = 'right' ml={3} mr = {3} variant = 'h5'>
                                {stat.value}
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </React.Fragment>
    );
}