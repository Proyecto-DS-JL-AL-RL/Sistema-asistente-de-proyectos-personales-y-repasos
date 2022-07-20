import { Card, Grid, Typography,Button } from '@mui/material';
import React,{useState,useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ActividadForm from '../components/actividadForm';
import { AccountContext } from '../AccountContext';
import { useSpeechRecognition } from 'react-speech-recognition';
import { getCommandsPage } from '../speechMethods/actividadesMethods';
import axios from 'axios';
import  ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux';
import { changePage } from '../stores/sliceAyuda';

export default function ActivityQueue(params) {
    const dispatch = useDispatch();
    const { sessionState,currentState } = useContext( AccountContext );   
    const history = useHistory();

    const [activities,setActivities]     = useState([]);    
    const [showForm,setShowForm]         = useState(false);
    const [proyectList,setProyectList]   = useState([]);

    const getProyects = async()=>{
        const {sub} = sessionState;
        const {BaseProyect} = currentState;
        if (sub && BaseProyect){
            axios.get('http://localhost:4000/api/Proyectos/Nombres/'+sub)
                .then(data=>{
                    if (data.data){
                        const arr = data.data.filter((value,ind,arr) => (BaseProyect!=value._id));
                        //console.log(data.data);
                        //console.log(arr);
                        setProyectList(arr);
                    }
                }).catch(err=>console.log(err));
        }
    }


    const getActs = async () =>{
        const {sub} = sessionState;
        //console.log(sub);
        if (sub){            
            axios.get('http://localhost:4000/api/colaActividades/'+sub)
            .then((data)=>{
                //console.log(data.data);
                setActivities(data.data);
            })
            .catch(err=>console.log(err));
        }else{
            setActivities([]);
        }
    }

    const initCrearActividad = ()=>{setShowForm(true)};
    const handleBack = ()=>{
        if (!showForm){
            history.push('/algoQueHacer');
        }
    };

    const commands = getCommandsPage({initCrearActividad,handleBack});
    const {listening,transcript} = useSpeechRecognition({commands:commands});

    useEffect(()=>{
        getActs();  
    },[sessionState]);

    useEffect(()=>{
        getProyects(); 
    },[sessionState,currentState]);

    useEffect (()=>{
        const component = ReactDOMServer.renderToString(<div>Ayuda No disponible</div>);
        dispatch(changePage({content:component,title:"Cola de Actividades"}));
    },[]);
    return(
    <React.Fragment>
        <Grid container direction = 'row' columnGap={2} alignItems='center'>
                <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {handleBack}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                </Button>
            <Typography variant = 'h3' width = '75%'>
                Cola de actividades
            </Typography>
            <Button variant = 'contained' color = 'success' sx = {{width:'50px',bgcolor: '#207F18',height:'50px', borderRadius:'50%'}} onClick = {initCrearActividad}>
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
        <ActividadForm close = {()=>setShowForm(false)} activities = {activities} setActivities = {setActivities} proyectList = {proyectList} />
        :null}
    </React.Fragment>
    );
}

