import { Box } from '@mui/material'
import React,{useState,useContext,useEffect} from 'react';
import { AccountContext } from '../AccountContext';
import axios from 'axios';
import AddProyect from '../components/proyecto/AddProyect';
import OrderProyect from '../components/proyecto/OrderProyect';
import Proyecto from '../components/proyecto/Proyecto'

import './proyectos.css'
export default function Proyectos() {
  const [proyects,setProyects] = useState([]);
  const {sessionState} = useContext(AccountContext);
  

  const getProyects = async ()=>{
    const {sub} = sessionState;
    if (sub){
      console.log('subb:',sub);
      axios.get('http://localhost:4000/api/Proyectos/'+sub)
        .then(data=>{
          console.log(data.data);
          setProyects(data.data);
        })
        .catch(err=>console.log(err));
    }
  }

  
  useEffect(()=>{
    getProyects();
  },[sessionState]);

  return (
    <Box className='containerProyect' display={'flex'} sx={{
      justifyContent:'center',
      flexWrap:'wrap',
      
    }}>
      <OrderProyect></OrderProyect>
      <Box display={'flex'} sx={{
        justifyContent:'center',
        flexWrap:'wrap'
      }}>
        <AddProyect/>
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
      
  )
}
