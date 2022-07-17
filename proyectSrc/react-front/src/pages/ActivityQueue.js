import { Card, Grid, Typography,Button } from '@mui/material';
import React,{useState,useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ActividadForm from '../components/actividadForm';
import { AccountContext } from '../AccountContext';
import axios from 'axios';

export default function ActivityQueue(params) {
    const { sessionState } = useContext( AccountContext );   
    const[activities,setActivities] = useState([]);
    const history = useHistory();
    const[showForm,setShowForm] = useState(false);
    
    const getActs = async () =>{
        const {sub} = sessionState;
        //console.log(sub);
        if (sub){            
            axios.get('http://localhost:4000/api/colaActividades/'+sub)
            .then((data)=>{
                console.log(data.data);
                setActivities(data.data);
            })
            .catch(err=>console.log(err));
        }else{
            setActivities([]);
        }
        
    }
    
    useEffect(()=>{
        getActs();        
    },[sessionState]);

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
                <Card sx = {{minHeight:'100px',padding:'10px',paddingBottom:'5px'}}>
                    <Typography variant = 'h5'>{act.Titulo}</Typography>     
                    <Typography variant = 'h6'>{act.Descripcion}</Typography>  
                    <Grid container sx = {{width:'100%',marginTop:'5px'}} justifyContent="space-between" direction="row" alignItems="center" >
                        {act.Blocked?
                        <Typography sx = {{bgcolor:'#1DB5BE',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline',color:'black'}}> Requiere Subir Evidencias</Typography>
                        :
                        <Typography sx = {{width:'300px'}}>.</Typography>}
                        
                        {act.ProyectoAsociado?
                            <Typography sx ={{bgcolor:'orange',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline'}} variant = 'h6'>
                                {act.ProyectoTitulo}
                            </Typography>
                        :
                            <Typography sx = {{width:'300px'}}>.</Typography>}
                    </Grid>                                   
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

