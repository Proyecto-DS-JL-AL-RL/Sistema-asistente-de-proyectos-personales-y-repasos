import { Card, Grid, Typography,Button,Box, IconButton } from '@mui/material';
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
import MensajeAdvertencia from '../components/horario/MensajeAdvertencia';
import { BACK_IP } from '../publicConstants';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ActivityQueue(params) {
    const dispatch = useDispatch();
    const { sessionState,currentState } = useContext( AccountContext );   
    const history = useHistory();

    const [activities,setActivities]     = useState([]);    
    const [showForm,setShowForm]         = useState(false);
    const [proyectList,setProyectList]   = useState([]);
    const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);

    const AdvertenciaNoInit = () =>{
        return <MensajeAdvertencia 
        visible={setMensajeAdvertenciaDisplay}
        content={"Usuario no inicializado"}
        comentario={<>
                Parece que hubo un problema al momento de preparar la bienvenida a su usuario. Estamos trabajando en ello. Pruebe recargar la página. O vuelva en un rato.
                <button className='btn-advertencia-ok' onClick={()=>{setMensajeAdvertenciaDisplay(null)}}>
                    ok
                </button>
                </>}
        />
      }

    const getProyects = async()=>{
        const {sub} = sessionState;
        const {BaseProyect} = currentState;
        if (sub && BaseProyect){
            axios.get(BACK_IP+'/api/Proyectos/Nombres/'+sub)
                .then(data=>{
                    if (data.data){
                        if (data.data.error){
                            //console.log(data.data)
                            if(data.data.error == 'no_init'){
                                setMensajeAdvertenciaDisplay(AdvertenciaNoInit);
                            }
                            setProyectList([]);
                        }else{
                            const arr = data.data.filter((value,ind,arr) => (BaseProyect!=value._id));
                            //console.log(data.data);
                            //console.log(arr);
                            setProyectList(arr);
                        }
                    }
                }).catch(err=>console.log(err));
        }
    }


    const getActs = async () =>{
        const {sub} = sessionState;
        //console.log(sub);
        if (sub){            
            axios.get(BACK_IP+'/api/colaActividades/'+sub)
            .then((data)=>{
                if (data.data)
                    setActivities(data.data);
                else
                    setActivities([])
            })
            .catch(err=>console.log(err));
        }else{
            setActivities([]);
        }
    }

    const handleDelete = async (idAct) =>{
        if(idAct){
            axios.delete(BACK_IP+'/api/colaActividades/deleteActividad/'+idAct)
                .then(data=>{
                    getActs();
                }).catch(err=>console.log(err))
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
        const aa = <div className='sugerencia-contenido'>
        <div className='sugenrencia-contenido-img'>
        
            <img  src='./Sugerencia.jpg'/>
            <div>Cola de actividades</div>
        </div>
        <div className='sugerencia-contenido-descripcion'>
            Estan son las actividades que puedes recibir por "Dame algo que hacer" 
            <div className='sugerencia-descripcion'>
                Puedes definir tus actividades con Pesos, lo cual indica que tan importante es. Sera asi más probable que te toque dicha actividad. 
            </div>
            <div className='sugerencia-descripcion'>
                Puedes asociar una actividad a un proyecto, si no lo haces tus puntos iran a tu proyecto Base.  
            </div>
        </div>
    </div>
    const component=ReactDOMServer.renderToString(aa);
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
                        
                        <Typography sx = {{bgcolor:'#1DDDBE',width:'70px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline',color:'black'}}> Peso {act.Peso} </Typography>


                        {act.ProyectoAsociado?
                            <Typography sx ={{bgcolor:'orange',width:'300px',borderRadius:'30px',textAlign :'center',fontWeight:'bold',display:'inline'}} variant = 'h6'>
                                {act.ProyectoTitulo}
                            </Typography>
                        :
                            <Typography sx = {{width:'300px'}}>.</Typography>}
                        
                    </Grid>  
                    <Button variant = 'contained' color = 'error' sx = {{height:'22px',cursor : 'pointer'}} onClick = {()=>handleDelete(act._id)}>
                        <DeleteIcon/>
                    </Button>                                
                </Card>
            </Grid>
        ))}
        </Grid>
        
        {showForm?
        <ActividadForm close = {()=>setShowForm(false)} activities = {activities} setActivities = {setActivities} proyectList = {proyectList} refresh = {getActs} />
        :null}

        <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'absolute'}}>
            {mensajeAdvertenciaDisplay}                 
        </Box>

    </React.Fragment>
    );
}

