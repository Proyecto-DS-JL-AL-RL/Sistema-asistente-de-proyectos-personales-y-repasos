
import React,{useEffect,useState} from 'react';
import {Grid,Card, Typography} from '@mui/material';

const arrayNum = Array.from({length:4},(x,i)=>({titulo:'aasd'}));
export default function ObjetivosList(){
    const [objetivos,setObjetivos] = useState(arrayNum);

    return(
        <React.Fragment>
            <Grid container sx = {{bgcolor:'red', height : '300px'}} direction = 'column'>
                <Grid item container sx = {{bgcolor:'#1DB5BE'}} xs = {2}  color = 'white' alignItems = 'center'>
                    <Grid item  sx = {{width : '100%'}}>
                        <Typography fontWeight='bold' color = 'white' textAlign='left' ml={4} fontSize={30}>
                            Próximos Objetivos
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs = {10} sx = {{overflowY :'auto', width:'100%',bgcolor:'#D9D9D9',height:'100%'}}>
                    <Grid item container sx = {{bgcolor:'#D9D9D9', height : '100%'}} direction = 'row'>
                            {arrayNum.map((obj,idx)=>(
                                <Grid container key = {idx} item xs ={12} height = '100px'  >
                                    <Typography>
                                        {obj.titulo}
                                    </Typography>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}