import axios from 'axios';
import { BACK_IP } from './publicConstants';
const initUser  = async (userData)=>{
    const {sub,email,family_name,given_name,nickname} = userData;
    const data2 = {
        userSub: sub,
        NombreUsuario: nickname,
        Nombre: given_name,
        Apellido: family_name,
        Correo: email,
    }
    axios.post(BACK_IP+'/api/users',data2,{withCredentials: false})
    .then((data)=>{
        console.log(data);
    })
    .catch(err=>{
        console.error(err);
    });
}


export {initUser}


