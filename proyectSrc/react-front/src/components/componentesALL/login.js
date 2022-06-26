import  React from 'react';
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

/*
    login simple:
        - correo 
        - contraseña
        - botones de registrarse
        - botones de iniciar sesion
*/


export default function Login() {
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
    <React.Fragment>
      <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 2, width: '45ch' }} variant="outlined">
                <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" />
          </FormControl>
            <FormControl sx={{ m: 2, width: '45ch' }} variant="outlined">
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
              <FormControl sx={{m: 2}} variant="outlined">
                    <Button sx={{color: 'white' ,background:'#0000cc'}} variant="contained" size="large">
                    <Typography variant = 'h5'>Iniciar Sesión</Typography>
                    </Button>                            
                            <Typography variant = 'h8'>¿Olvidaste tu contraseña?</Typography>
                    <Button  sx={{color: 'white', background:'#00b347'}} variant="contained" size="large">
                        <Typography variant = 'h5'>Registrate</Typography>
                    </Button>
              </FormControl>
      </Box>
    </React.Fragment>
  );
}