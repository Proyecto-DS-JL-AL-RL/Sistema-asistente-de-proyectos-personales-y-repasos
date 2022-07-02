import { Card, Grid, Typography,Button } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const arrayNum = Array.from({length:100},(x,i)=>({titulo:'aasd'}));
export default function ActivityQueue(params) {
    const[activities,setActivities] = useState(arrayNum);
    const history = useHistory();


    return(
    <React.Fragment>

        <Grid container direction = 'row' columnGap={2} alignItems='center'>
            <Button variant = 'contained' color = 'success' sx = {{height:'80%'}} onClick = {()=>{history.push('/algoQueHacer')}}>
                Back
            </Button>
            <Typography variant = 'h3' width = '75%'>
                Cola de actividades
            </Typography>
            <Button variant = 'contained' color = 'success' >
                asd
            </Button>
        </Grid>
        



        <Grid container direction='row' sx={{width:'70%',marginLeft:'15%',bgcolor:'cyan',padding:'20px',borderRadius : '30px',
                                            marginTop:'20px',maxHeight:'80%',overflowY:'auto'}} rowGap = {2}>
        {activities.map((act,idx)=>(
            <Grid key = {idx} item xs = {12} >
                <Card sx = {{height:'100px'}}>
                    {act.titulo}
                </Card>
            </Grid>
        ))}
        </Grid>


    </React.Fragment>
    );
}

