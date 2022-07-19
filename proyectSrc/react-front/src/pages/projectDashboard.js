import React,{useEffect, useState} from 'react';
import { Grid , Card, Typography, Button, Box } from '@mui/material';
import LogrosShow from '../components/LogrosShow';
import ProjectStats from '../components/ProjectStats';
import ObjetivosList from '../components/ObjetivosList';
import { useHistory, useParams } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import ObjetivoForm from '../components/objForm';
import axios from 'axios';

export default function ProyectoView(){
    const history = useHistory();
    const {idProyecto} = useParams();
    const [pTitulo,setPTitulo] = useState ('Titulo Proyecto');

    const [objetivos,setObjetivos] = useState([]);
    const [logros,setLogros] = useState([]);
    const [stats,setStats] = useState({Puntos:0,ConstanciaDiff:0,LogrosDiff:0});
    const[showForm,setShowForm] = useState(false);
    
    const getProyectInfo = async () => {
        if(idProyecto){
            console.log('ProyectInfo:',idProyecto);
            axios.get('http://localhost:4000/api/Proyectos/getProyecto/'+idProyecto)
                .then(data=>{
                    console.log(data.data);
                    const {Titulo,Objetivos,Logros,Puntajes} = data.data;
                    setPTitulo(Titulo);
                    setLogros(Logros);
                    setObjetivos(Objetivos);
                    setStats(Puntajes);
                })
                .catch(err=>console.log(err));
        }
    }

    useEffect(()=>{
        getProyectInfo();
    },[idProyecto]);


    return (
        <React.Fragment>

                <Grid item container  sx = {{width:'100%', maxHeight:'30%'}}>
                    <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10} onClick = {()=>{history.push('/')}}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                    </Button>
                    <Typography variant = 'h3' ml = {2} fontWeight = 'bold'>
                        {pTitulo}
                    </Typography>
                </Grid>
                <Grid container item  sx = {{ width : '100%', height:'40%'}} direction = 'row' columnGap = {5} rowGap ={1} justifyContent = "center">
                    <Grid item container  sm={4} lg ={4} xl = {4} sx = {{maxHeight:'100%'}}>
                        <ObjetivosList objetivos = {objetivos}/>
                    </Grid>
                    <Grid item container  sm = {4} lg = {4} xl = {4} direction = 'column'>

                            <Button sx = {{width:'80%',bgcolor: '#C0DAE5', borderRadius:'20px',height:'15%', marginLeft: '10%'}} variant = 'contained' mb = {1} onClick = {()=>{setShowForm(true)}}>
                                <Typography color = 'black' sx = {{fontWeight : 'bold'}}>
                                    Agregar
                                </Typography>
                            </Button>
                            <Box sx = {{height:'80%',marginTop:'10px'}}>
                            <ProjectStats stats = {stats}/>
                            </Box>
                    </Grid>
                </Grid>

                <Box sx = {{overflowY :'auto', maxHeight:'50%' , width:'80%', bgcolor: '#C4B5FD', marginLeft:'10%', marginTop:'10px' ,borderRadius:'30px',padding:'30px'} }>
                    <LogrosShow Logros = {logros} />             
                </Box>

            {showForm?
            <ObjetivoForm close = {()=>setShowForm(false)} activities = {objetivos} setActivities = {setObjetivos} idProyecto = {idProyecto}/>
            :
            null
            }
        </React.Fragment>
    );
}