import React, {useState} from "react";
import Login from '../components/componentsLiq/Login.js'
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { Typography } from '@mui/material';

//import PanelControl from '../components/componentesALL/PanelControl'
//import MostrarFuncionalidades from '../components/componentesALL/MostrarFuncionalidades'
//<login/>  
//<PanelControl/>
//<MostrarFuncionalidades/>

const Item = styled(Paper)(({ theme }) => ({
  border: '0.5px solid black',
  padding: theme.spacing(15),
  textAlign: 'center',
}));

//const darkTheme = createTheme({ palette: { mode: 'dark' } });
//sx={{ flexGrow: 1 }} mt={10}
export default function Inicio(){
  let history = useHistory()
  const [showRegister, setShowRegister] = useState(false)
    return (
      <React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
          {showRegister?
                       <Box mt={20} sx={{flexGrow: 1,
                                        width: 350,
                                        height: 350,
                                        zIndex:1,
                                        position: 'absolute' }}>  
                        <Grow  timeout={1000}  in={showRegister}>
                          <Card  sx={{borderRadius: '5%', mx:100, minWidth: 600, border: '0.5px solid purple'  }}>
                                <CardContent>
                                    <Tooltip title="Cancelar" placement="right">
                                            <CloseIcon onClick={()=>{setShowRegister(false)}} sx={{p:1,mx:65, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                    </Tooltip>   
                                      <Typography sx={{fontWeight: 'bold', mx:3}} variant="h4" component="div">
                                          Registro de usuario
                                      </Typography>
                                      <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                          <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                                <TextField sx={{py:2}} id="outlined-basic" label="Nombre" defaultValue= {''} variant="outlined" />
                                                <TextField sx={{py:2}} id="outlined-basic" label="Apellido" defaultValue= {''} variant="outlined" />
                                                <TextField sx={{py:2}} id="outlined-basic" label="Correo" defaultValue= {''} variant="outlined" />
                                          </FormControl>
                                            <Button onClick={()=>{
                                                            setShowRegister(false)
                                                            history.push('/Presentacion')
                                                      }} sx={{p:2, borderRadius: 3, color: 'white', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                               <Typography sx= {{fontWeight: 'bold'}} variant = 'h5'>Comenzemos 😁</Typography>
                                            </Button>
                                        </Box>
                                  </CardContent>
                            </Card>
                          </Grow>
                          </Box>
                        :null}
            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 10  }}>
                <Grid item xs={3} mt={35}  md = {10} sm={10} lg ={4} xl = {4.5}>
                              <Item ><Login show={{showRegister, setShowRegister}}/></Item>
                    </Grid>
                  <Grid item xs={6.5}  mt={20}>
                          ok
                    </Grid>
                </Grid>
        </Box>
      </React.Fragment>
        );
    }
  //history.push('/Presentacion')