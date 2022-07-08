import { Card, Grid, Typography,Button } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ActividadForm from '../components/actividadForm';
const arrayNum = Array.from({length:3},(x,i)=>({titulo:'Actividad de Prueba',descripcion:'Descripción de la actividad'}));
export default function ActivityQueue(params) {
    const[activities,setActivities] = useState(arrayNum);
    const history = useHistory();
    const[showForm,setShowForm] = useState(false);
    


    return(
    <React.Fragment>
        <Grid container direction = 'row' columnGap={2} alignItems='center'>
                <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {()=>{history.push('/algoQueHacer')}}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                </Button>
            <Typography variant = 'h3' width = '75%'>
                Cola de actividades
            </Typography>
            <Button variant = 'contained' color = 'success' sx = {{width:'50px',bgcolor: '#207F18',height:'50px', borderRadius:'50%'}} onClick = {()=>{setShowForm(true)}}>
                <AddIcon/>
            </Button>
        </Grid>
        



        <Grid container direction='row' sx={{width:'70%',marginLeft:'15%',bgcolor:'#C4B5FD',padding:'20px',borderRadius : '30px',
                                            marginTop:'20px',maxHeight:'80%',overflowY:'auto'}} rowGap = {2}>
        {activities.map((act,idx)=>(
            <Grid key = {idx} item xs = {12} >
                <Card sx = {{height:'100px',padding:'10px'}}>
                    <Typography variant = 'h5'>{act.titulo}</Typography>     
                    <Typography variant = 'h6'>{act.descripcion}</Typography>                 
                </Card>
            </Grid>
        ))}
        </Grid>
        
        {showForm?
        <ActividadForm close = {()=>setShowForm(false)} activities = {activities} setActivities = {setActivities} />
        :
        null
        }


    </React.Fragment>
    );
}

