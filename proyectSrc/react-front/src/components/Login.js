import  React,{useContext,useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import {  AccountContext } from '../AccountContext';
import MensajeAdvertencia from './horario/MensajeAdvertencia';
import './login.css'
/*
    login simple:
        - correo 
        - contraseña
        - botones de registrarse
        - botones de iniciar sesion
*/


export default function Login(props) {
  const { authenticate } = useContext(AccountContext);
  const [mensajeAdvertenciaDisplay,setMensajeAdvertenciaDisplay] = useState(null);
  let history = useHistory()

  const lleneDatos = () =>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"Llene los campos de Usuario y contraseña"}
    comentario={<>
            Llene los campos de Usuario y contraseña
            </>}
    />
  }

  const usuarioNoConfirmado = () =>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"Usuario no verificado"}
    comentario={<>
            Vea el link AWS que le enviamos a su correo. O pidale a un admin que lo confirme manualmente
            </>}
    />
  }

  const noAutorizado = ()=>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"Usuario-Contraseña incorrectos"}
    comentario={<>
            Combinación usuario contraseña incorrecta
            </>}
    />
  }

  const OtroError = (codeG) =>{
    return ()=>{
    return <MensajeAdvertencia 
    visible={setMensajeAdvertenciaDisplay}
    content={"Error desconocido"}
    comentario={<>
            {codeG}
            </>}
    />
    }
  }

  const [values, setValues] = React.useState({
    usuario: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = ()=>{
    authenticate(values.usuario,values.password).then(data=>{
      //console.log("app:",data);
      history.push('/');
  }).catch((err)=>{
      if (err.code){
        if (err.code == 'InvalidParameterException')
          setMensajeAdvertenciaDisplay(lleneDatos);
        else if(err.code == 'UserNotConfirmedException')
          setMensajeAdvertenciaDisplay(usuarioNoConfirmado);
        else if (err.code == 'NotAuthorizedException')
          setMensajeAdvertenciaDisplay(noAutorizado)
        else 
          setMensajeAdvertenciaDisplay(OtroError(err.code));
      }else{
        setMensajeAdvertenciaDisplay(OtroError('Algo paso'));
      }
  });
  };

  return (
    <React.Fragment>
      <Box className="container-box">
      <FormControl  sx={{ textAlign:'center', width:'45ch'}} variant="outlined">
              <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField id="outlined-basic" label="Nombre de usuario" variant="outlined" value = {values.usuario} onChange = {handleChange('usuario')}/>
              </FormControl>
              <FormControl sx={{mt: 3, width: '100%'}} variant="outlined">
                    
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
              </FormControl>
              <FormControl sx={{textAlign: 'center', mt: 3, width:'100%'}} variant="outlined">
                    
                                <Button onClick={handleLogin} sx={{p:2,  borderRadius: 5, py: 2, color: 'white' ,background:'#0000cc'}} variant="contained" size="large">
                                      <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Iniciar Sesión</Typography>
                                        </Button>                            
                                                
                                        <Button onClick={()=>{history.push('./Registro')}} sx={{marginTop:'10px',py:2, borderRadius: 5, color: 'white', background:'#00b347'}} variant="contained" size="large">
                                      <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Registrate</Typography>
                                  </Button>
              </FormControl>
          </FormControl>
          </Box>
          <Box sx = {{left:'50%',top:'50%',marginLeft:'-250px',marginTop:'-5%',position:'fixed'}}>
                        {mensajeAdvertenciaDisplay}                 
          </Box>
    </React.Fragment>
  );
}
