import  React,{useContext,useEffect} from 'react';
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
/*
    login simple:
        - correo 
        - contraseña
        - botones de registrarse
        - botones de iniciar sesion
*/


export default function Login(props) {
  const { authenticate } = useContext(AccountContext);
  let history = useHistory()
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
      alert(err.message);
      //console.error("app",err);sx={{width:'5vw', height:'5vw'}}
  });
  };

  return (
    <React.Fragment>
      <Box sx={{width:'80%', height:'20vw', position: 'relative', boxShadow: 16}}>
      <FormControl  sx={{ mx:'6%', mt: 1, alignItems:'center', textAlign:'center', width:'45ch'}} variant="outlined">
              <FormControl sx={{mt: 3, width: '100%' }} variant="outlined">
                    <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value = {values.usuario} onChange = {handleChange('usuario')}/>
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
                                                <Typography sx={{py:2}} variant = 'h8'>¿Olvidaste tu contraseña?</Typography>
                                        <Button onClick={()=>{history.push('./Registro')}} sx={{py:2, borderRadius: 5, color: 'white', background:'#00b347'}} variant="contained" size="large">
                                      <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Registrate</Typography>
                                  </Button>
              </FormControl>
          </FormControl>
          </Box>
    </React.Fragment>
  );
}
