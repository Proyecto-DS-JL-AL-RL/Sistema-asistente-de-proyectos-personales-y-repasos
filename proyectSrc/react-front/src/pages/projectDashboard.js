import React,{useEffect, useState} from 'react';
import { Grid , Card, Typography, Button } from '@mui/material';
import LogrosShow from '../components/LogrosShow';
import ProjectStats from '../components/ProjectStats';
import ObjetivosList from '../components/ObjetivosList';

export default function ProyectoView(){
    const [pTitulo,setPTitulo] = useState ('Titulo Proyecto');



    return (
        <React.Fragment>
            <Grid container sx = {{ height : '100%'}} alignItems = "center"  direction = 'column' spacing = {2}>
                <Grid item container xs = {1} >
                    <Button sx = {{width:'50px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} ml = {10}>
                        <Typography color = 'black' sx = {{fontWeight : 'bold'}} >
                            Back
                        </Typography>
                    </Button>
                    <Typography variant = 'h3' ml = {2} fontWeight = 'bold'>
                        {pTitulo}
                    </Typography>
                </Grid>
                <Grid container item xs = {4} sx = {{ width : '100%'}} direction = 'row' columnGap = {5} rowGap ={1} justifyContent = "center">
                    <Grid item container xs = {12} md = {12} sm={12} lg ={6} xl = {5}>
                        <ObjetivosList/>
                    </Grid>
                    <Grid item container xs = {12} md = {12} sm = {12} lg = {6} xl = {4} direction = 'column'>
                        <Grid item container xs = {2} justifyContent = 'center'>
                            <Button sx = {{width:'500px',bgcolor: '#C0DAE5', borderRadius:'20px'}} variant = 'contained' mb = {1} >
                                <Typography color = 'black' sx = {{fontWeight : 'bold'}}>
                                    Agregar
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs = {9}  mt = {1}>
                            <ProjectStats/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs = {0.2} >                       
                </Grid>
                <Grid container item xs = {6} sx = {{overflowY :'auto', width:'80%', bgcolor: '#C4B5FD', borderRadius:'30px'} }>
                    <LogrosShow/>
                </Grid>              
            </Grid>
        </React.Fragment>
    );
}