import React from "react";
import Box from '@mui/material/Box';
//import Tooltip from '@mui/material/Tooltip';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../userPool';
import { initUser } from "../userMethods";

export default function Register(props){
    let history = useHistory()
    //const [showRegister, setShowRegister] = useState(false)
    const [values, setValues] = React.useState({
      usuario: '',
      password: '',
      nombre: '',
      apellido: '',
      correo: '',
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
      console.log(values);
    };

    const handleRegister = ()=>{
      console.log(values);
      const password = values.password;
      const username = values.usuario;
      UserPool.signUp(username,password,[
        new CognitoUserAttribute({Name:'given_name',Value: values.nombre}),
        new CognitoUserAttribute({Name:'family_name',Value: values.apellido}),
        new CognitoUserAttribute({Name:'email',Value: values.correo}),
        new CognitoUserAttribute({Name:'nickname',Value: values.usuario}),
      ],null,(err,data) =>{
        if(err){
        alert(err.message);
        //console.log(err);
        }else{
        //console.log('Result:',data);
        const sub = data.userSub;
        const userData = {
            "sub" : sub,
            "email": values.correo,
            "family_name": values.apellido,
            "given_name": values.nombre,
            "nickname": username,
        }
        initUser(userData);
        history.push('/');
        alert('Usuario creado con exito');
        }

      });
      
    }
        return (
    <Box sx={{
            mx: '34%',
            mt:'10%',
            position: 'absolute',
            }}>  
                 <Grow  timeout={1000} in={true}>
                 <Box sx={{justifyContent:"center"}}>
                        <Stack spacing={4}>
                                <FormControl  sx={{width: '45ch' }} variant="outlined">
                                        <Typography sx={{textAlign:'center',fontWeight: 'bold'}} variant="h3" component="div">
                                            Registro de usuario
                                        </Typography>
                                </FormControl>
                                <FormControl  sx={{ width: '45ch' }} variant="outlined">
                                        <TextField id="outlined-basic" label="Nombre de Usuario" 
                                         onChange={handleChange('usuario')} value = {values.usuario}  variant="outlined" />
                                </FormControl>
                                <FormControl  sx={{ width: '45ch' }} variant="outlined">
                                        <TextField id="outlined-basic" label="Nombre" 
                                         onChange={handleChange('nombre')} value = {values.nombre}  variant="outlined" />
                                </FormControl>
                                <FormControl  sx={{ width: '45ch' }} variant="outlined">
                                        <TextField id="outlined-basic" label="Apellido" 
                                        onChange={handleChange('apellido')} value = {values.apellido}  variant="outlined" />
                                </FormControl>
                                <FormControl sx={{ width: '45ch' }} variant="outlined">
                                        <TextField  id="outlined-basic" label="Correo" 
                                        onChange={handleChange('correo')} value = {values.correo}  variant="outlined" />
                                </FormControl>
                                <FormControl  sx={{  width: '45ch' }} variant="outlined">
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
                                        <FormControl sx={{m: 2, width: '45ch' }} variant="outlined">
                                                    <Button  onClick={handleRegister}  sx={{ p:2, borderRadius: '3%', color: 'white', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                        <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Comenzemos 😁</Typography>
                                                    </Button>
                                        </FormControl>
                                </Stack>                
                            </Box>
                        </Grow>
                    </Box>
    )
}