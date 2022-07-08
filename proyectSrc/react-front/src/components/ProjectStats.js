import React,{useState,useEffect} from "react";
import {Grid, Typography} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export default function ProjectStats(){
    const [stats,setStats] = useState([
        {label:'Constancia',value:5},
        {label:'Logros',value:-5},
        {label:'puntos',value:200}
    ])


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
                                {stat.value>0?
                                    <ArrowUpwardIcon/>
                                    :
                                    <ArrowDownwardIcon/>
                                }
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </React.Fragment>
    );
}