import React, {useState} from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
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

export default function Register(props){
    let history = useHistory()
    const [showRegister, setShowRegister] = useState(false)
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
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
        return (
    <Box sx={{
            mx: '30%',
            mt:'10%',
            position: 'absolute',
            }}>  
                 <Box sx={{justifyContent:"center" , display: 'flex' }}>
                        <Stack spacing={4}>
                                <Typography sx={{textAlign:'center',fontWeight: 'bold'}} variant="h3" component="div">
                                    Registro de usuario
                                </Typography>
                                <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                    <TextField id="outlined-basic" label="Nombre" defaultValue= {''} variant="outlined" />
                                </FormControl>
                                <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                    <TextField id="outlined-basic" label="Apellido" defaultValue= {''} variant="outlined" />
                                </FormControl>
                                <FormControl sx={{m: 2, width: '45ch' }} variant="outlined">
                                    <TextField  id="outlined-basic" label="Correo" defaultValue= {''} variant="outlined" />
                                </FormControl>
                                <FormControl  sx={{ m: 2, width: '45ch' }} variant="outlined">
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
                                    <Button  sx={{m:4,  width: '45ch', p:2, borderRadius: '3%', color: 'white', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                        <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Comenzemos 😁</Typography>
                                    </Button>
                                </FormControl>
                                </Stack>                
                            </Box>
                    </Box>
    )
}