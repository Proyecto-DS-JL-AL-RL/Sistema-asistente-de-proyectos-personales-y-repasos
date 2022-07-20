import { Box } from '@mui/material'
import React,{useState,useContext,useEffect} from 'react';
import { AccountContext } from '../AccountContext';
import axios from 'axios';
import AddProyect from '../components/proyecto/AddProyect';
import OrderProyect from '../components/proyecto/OrderProyect';
import Proyecto from '../components/proyecto/Proyecto'
import ProyectoForm from '../components/projectForm';

import './proyectos.css'
export default function Proyectos() {
  const [proyects,setProyects] = useState([]);
  const {sessionState} = useContext(AccountContext);
  const [tituloInput,setTituloInput] = useState("");
  const [showForm,setShowForm] = useState(false);  

  const getProyects = async ()=>{
    const {sub} = sessionState;
    if (sub){
      //console.log('subb:',sub);
      axios.get('http://localhost:4000/api/Proyectos/'+sub)
        .then(data=>{
          //console.log(data.data);
          setProyects(data.data);
        })
        .catch(err=>console.log(err));
    }
  }

  const close = ()=>{setShowForm(false);}

  const addProyect = async ()=>{
    if (tituloInput == ''){
      return;
    }
    const {sub} = sessionState;
      if (showForm && sub){
        const proyect_ = {
          UserSub : sub,
          Titulo : tituloInput,
        }
        axios.post('http://localhost:4000/api/Proyectos/addProyect',proyect_)
          .then(data=>{
            console.log('data:', data.data);
            setShowForm(false);
            setProyects([...proyects, {
              ...proyect_,
              ActividadSemanal: [1,1,1,1,1,1,1],
              Puntajes:{Puntos:50}
            }])
            setTituloInput("");
          }).catch(err=>console.log(err));
      }      
  };
  
  useEffect(()=>{
    getProyects();
  },[sessionState]);

  return (
    <React.Fragment>
    <Box className='containerProyect' display={'flex'} sx={{
      justifyContent:'center',
      flexWrap:'wrap',
      
    }}>
      
      <Box display={'flex'} sx={{
        justifyContent:'center',
        flexWrap:'wrap'
      }}>
        <AddProyect  setShowForm = {setShowForm}/>
        {
          proyects.map((p,i)=>{
            return (
            <Proyecto 
            key={'proyect'+i} proyect = {p}
            ></Proyecto>
            )
          })
        }
        
      </Box>
    </Box>

        {showForm?
        <React.Fragment>
          <ProyectoForm setTitulo = {setTituloInput} titulo = {tituloInput} agregarProyecto = {addProyect} close = {close}/>
          </React.Fragment>
        :null}
    </React.Fragment>
  )
}
