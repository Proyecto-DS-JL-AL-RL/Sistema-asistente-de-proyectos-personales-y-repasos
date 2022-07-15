import React,{useEffect, useState} from 'react';
import { Grid , Card, Typography, Button, Box } from '@mui/material';
import LogrosShow from '../components/LogrosShow';
import ProjectStats from '../components/ProjectStats';
import ObjetivosList from '../components/ObjetivosList';
import { useHistory } from 'react-router-dom';
import ObjetivoForm from '../components/objForm';

const arrayNum = Array.from({length:2},(x,i)=>({titulo:'Titulo de un Objetivo',descripcion:'Descripcion'}));
export default function ProyectoView(){
    const [pTitulo,setPTitulo] = useState ('Titulo Proyecto');
    const history = useHistory();
    const [objetivos,setObjetivos] = useState(arrayNum);
    const[showForm,setShowForm] = useState(false);

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
                <Grid container item  sx = {{ width : '100%', height:'40%',bgcolor:'red'}} direction = 'row' columnGap = {5} rowGap ={1} justifyContent = "center">
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
                            <ProjectStats/>
                            </Box>
                    </Grid>
                </Grid>

                <Box sx = {{overflowY :'auto', maxHeight:'50%' , width:'80%', bgcolor: '#C4B5FD', marginLeft:'10%', marginTop:'10px' ,borderRadius:'30px',padding:'30px'} }>
                    <LogrosShow/>             
                </Box>

            {showForm?
            <ObjetivoForm close = {()=>setShowForm(false)} activities = {objetivos} setActivities = {setObjetivos} />
            :
            null
            }
        </React.Fragment>
    );
}