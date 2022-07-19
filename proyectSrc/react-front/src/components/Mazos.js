import  React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import '../pages/funcionalidades.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
      backgroundColor: '#20B2AA',
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
      },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   backgroundColor: '#00FFFF',
   padding: theme.spacing(2),
   borderTop: '1px solid rgba(89, 196, 232, .200)',
}));

export default function Mazos(props) {
  const [expanded, setExpanded] = useState('panel1');
  const [mazo, setMazo] = useState({})
  const mazos = props.getmazo
  const [showEdit, setShowEdit] = useState(false)
  const [showEditCard, setShowEditCard] = useState(false)
  const [tarjeta, setTarjeta] = useState({})
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [showAddCard, setShowAddCard] = useState(false)
  const [tarjetaIndex, setTarjetaIndex] = useState(0)
  const [pregunta, setPregunta] = useState('')
  const [opcion1, setOpcion1] = useState('')
  const [opcion2, setOpcion2] = useState('')
  const [opcion3, setOpcion3] = useState('')
  const [opcion4, setOpcion4] = useState('')
  const [respuesta, setRespuesta] = useState('') 
  let history = useHistory()
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
/*
  Este archivo crea los Mazos, es decir cada sección la cual contendra  las tarjetas para el repaso
  y los proyectos.
  {show?<BasicCard/>:null}
  sx={{fontWeight:'bold', color:'white', '&:hover': {backgroundColor: '#00b347'}}}
  mazo.Tarjetas.length
  ``  
*/
  return (

    <React.Fragment>
       <Box sx={{
                  width: 350,
                  height: 350,
                  zIndex:1,
                  position: 'relative',
                }}
                >
                  {showEdit?
                      <Grow  timeout={1000}  in={showEdit}>  
                      <Box className="mazo-edit" justifyContent="center" sx={{ position:'absolute', display: 'flex', flexWrap:'wrap' }}>  
                        <Card  sx={{borderRadius: '3%', border: '0.5px solid black'}}>
                            <CardContent>
                                <Tooltip title="Cancelar" placement="right">
                                      <Button sx={{mx:'90%'}} onClick={(e)=>{setShowEdit(false)}}>
                                        <CloseIcon sx={{p:1, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                      </Button>
                                 </Tooltip>   
                                    <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                            <Typography sx={{fontWeight: 'bold', mx:'1vw'}} variant="h4" component="div">
                                                Editar Mazo
                                            </Typography>
                                              <TextField  onChange={(e=>{setTitulo(e.target.value)})} sx={{py:2}} id="outlined-basic" label="Titulo de la Sección" value= {titulo} variant="outlined" />
                                              <TextField
                                                  
                                                  id="outlined-multiline-static"
                                                  label="Descripcion"
                                                  multiline
                                                  rows={4}
                                                  onChange={(e=>{
                                                    setDescripcion(e.target.value)
                                                    
                                                  })}
                                                  value={descripcion}
                                                />
                                      </FormControl>
                                    </Box>
                                    <Box className="edit-mazo-button" justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                      <Tooltip title="Guardar" placement="left">
                                            <Button className="edit-mazo-button" onClick={()=>{setShowEdit(false)
                                                                  axios.put('/api/mazos/'+mazo._id, { "Titulo":titulo,
                                                                  "Descripcion":descripcion})
                                                                  window.location.reload(false);
                                            }} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                <SaveIcon sx={{p:1}}/>
                                            </Button>
                                        </Tooltip>
                                        </Box>
                              </CardContent>
                        </Card>
                        </Box>
                      </Grow>:null}
                      {showEditCard?
                      <Grow  timeout={1000}  in={showEditCard}>  
                        <Box className="mazo-edit"  justifyContent="center" sx={{ position:'absolute', display: 'flex' }}>
                            <Card  sx={{borderRadius: '3%', width: '160%', border: '0.5px solid black'}}>
                                <CardContent >
                                          <Button sx={{mx:'90%'}} onClick={(e)=>{setShowEditCard(false)}}>
                                              <Tooltip title="Guardar" placement="left">  
                                                  <CloseIcon sx={{p:1, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                              </Tooltip>
                                          </Button>   
                                        <Box  justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                            <FormControl  sx={{width: '45ch' }} variant="outlined">
                                            <Typography sx={{fontWeight: 'bold', mx:'1vw'}} variant="h4" component="div">
                                                    Editar Tarjeta
                                                </Typography>
                                                  <TextField onChange={(e=>{
                                                    setPregunta(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Pregunta" defaultValue= {pregunta} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setOpcion1(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 1" defaultValue= {opcion1} variant="outlined" />
                                                  <TextField  onChange={(e=>{
                                                    setOpcion2(e.target.value)
                                                    
                                                  })}sx={{py:'2%'}} id="outlined-basic" label="Opción 2" defaultValue= {opcion2} variant="outlined" />
                                                  <TextField  onChange={(e=>{
                                                    setOpcion3(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 3" defaultValue= {opcion3} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setOpcion4(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 4" defaultValue= {opcion4} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setRespuesta(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Respuesta (poner el número de la  rpta e.g : 1 o 2 o ..)" defaultValue= {respuesta} variant="outlined" />
                                          </FormControl>
                                        </Box>
                                        <Box  className="edit-mazo-button"  justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                                      <Tooltip title="Guardar" placement="left">
                                                          <Button onClick={()=>{
                                                            let key_pregunta = "Tarjetas."+tarjetaIndex+".Pregunta"
                                                            let key_respuesta = "Tarjetas."+tarjetaIndex+".Respuesta"
                                                            let key_opciones = "Tarjetas."+tarjetaIndex+".Opciones"
                                                            
                                                            let update_card = {}   
                                                            update_card["$set"] = {}
                                                            update_card["$set"][key_pregunta] = pregunta
                                                            update_card["$set"][key_respuesta] = respuesta
                                                            update_card["$set"][key_opciones] = [opcion1, 
                                                                                                opcion2, 
                                                                                                opcion3, 
                                                                                                opcion4]
                                                                                            //const a['Tarjetas.${tarjetaIndex}.Pregunta']=1
                                                            setShowEditCard(false)
                                                            
                                                            //`
                                                            //let update_tarjeta = {"$set":{update}}
                                                            //console.log(update_card)
                                                            //console.log(mazos.Tarjetas[tarjetaIndex])
                                                            axios.put('/api/mazos/'+mazo._id, update_card)
                                                            setPregunta("")
                                                             setOpcion1("")
                                                             setOpcion2("")
                                                             setOpcion3("")
                                                             setOpcion4("")
                                                             setRespuesta("")
                                                            window.location.reload(false);
                                                          }} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                              <SaveIcon sx={{p:1}}/>
                                                          </Button>
                                                      </Tooltip>
                                        </Box>
                                  </CardContent>
                            </Card>
                        </Box>
                      </Grow>:null}
                      {showAddCard?
                      <Grow  timeout={1000}  in={showAddCard}>  
                        <Box  className="mazo-edit" justifyContent="center" sx={{position:'absolute', display: 'flex' }}>
                            <Card  sx={{borderRadius: '3%', width: '160%', border: '0.5px solid black'}}>
                                <CardContent >
                                          <Button sx={{mx:'90%'}} onClick={(e)=>{setShowAddCard(false)}}>
                                              <Tooltip title="Guardar" placement="left">  
                                                  <CloseIcon sx={{p:1, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                              </Tooltip>
                                          </Button>   
                                        <Box  justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                            <FormControl  sx={{width: '45ch' }} variant="outlined">
                                            <Typography sx={{fontWeight: 'bold', mx:'1vw'}} variant="h4" component="div">
                                                   Añadir Tarjetas
                                                </Typography>
                                                <TextField onChange={(e=>{
                                                    setPregunta(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Pregunta" defaultValue= {pregunta} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setOpcion1(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 1" defaultValue= {opcion1} variant="outlined" />
                                                  <TextField  onChange={(e=>{
                                                    setOpcion2(e.target.value)
                                                    
                                                  })}sx={{py:'2%'}} id="outlined-basic" label="Opción 2" defaultValue= {opcion2} variant="outlined" />
                                                  <TextField  onChange={(e=>{
                                                    setOpcion3(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 3" defaultValue= {opcion3} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setOpcion4(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Opción 4" defaultValue= {opcion4} variant="outlined" />
                                                  <TextField onChange={(e=>{
                                                    setRespuesta(e.target.value)
                                                    
                                                  })} sx={{py:'2%'}} id="outlined-basic" label="Respuesta (poner el número de la  rpta e.g : 1 o 2 o ..)" defaultValue= {respuesta} variant="outlined" />
                                          </FormControl>
                                        </Box>
                                        <Box  className="edit-mazo-button" justifyContent="center" sx={{mt:'4%', display: 'flex', flexWrap: 'wrap' }}>
                                                      <Tooltip title="Guardar" placement="left">
                                                          <Button  onClick={()=>{
                                                             setShowAddCard(false)
                                                             mazo.Tarjetas.push({
                                                              "Pregunta": pregunta,
                                                              "Opciones": [opcion1,
                                                                           opcion2, 
                                                                           opcion3,
                                                                           opcion4
                                                                          ],
                                                              "Respuesta": respuesta,
                                                              "Puntos":0
                                                             })
                                                             setMazo(mazo)
                                                             axios.put('/api/mazos/'+mazo._id, mazo)
                                                             setPregunta("")
                                                             setOpcion1("")
                                                             setOpcion2("")
                                                             setOpcion3("")
                                                             setOpcion4("")
                                                             setRespuesta("")
                                                            /*
                                                            let key_pregunta = "Tarjetas."+tarjetaIndex+".Pregunta"
                                                            let key_respuesta = "Tarjetas."+tarjetaIndex+".Respuesta"
                                                            let key_opciones = "Tarjetas."+tarjetaIndex+".Opciones"
                                                            
                                                            let update_card = new Object()   
                                                            update_card["$set"] = {}
                                                            update_card["$set"][key_pregunta] = pregunta
                                                            update_card["$set"][key_respuesta] = respuesta
                                                            update_card["$set"][key_opciones] = [opcion1, 
                                                                                                opcion2, 
                                                                                                opcion3, 
                                                                                                opcion4]
                                                                                            //const a['Tarjetas.${tarjetaIndex}.Pregunta']=1
                                                            setShowEditCard(false)//`
                                                            //let update_tarjeta = {"$set":{update}}
                                                            //console.log(update_card)
                                                            //console.log(mazos.Tarjetas[tarjetaIndex])
                                                            axios.put('/api/mazos/'+mazo._id, update_card)
                                                            window.location.reload(false);*/
                                                          }} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                                              <SaveIcon sx={{p:1}}/>
                                                          </Button>
                                                      </Tooltip>
                                        </Box>
                                  </CardContent>
                            </Card>
                        </Box>
                      </Grow>:null}
        </Box> 
    <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
      <Box  sx={{position: 'absolute',  background:'#20B2AA'}}>
        {
        mazos.map((mazo, idx)=>{
          return  (
              <React.Fragment  key={idx}>
                
                  <Accordion sx={{width:'130vh'}} expanded={expanded === `panel${idx}$`} onChange={handleChange(`panel${idx}$`)}>
                    <AccordionSummary aria-controls={`panel${idx}$d-content`} id={`panel${idx}$d-header`}>
                        <Typography  variant="h5" sx={{ flexGrow: 1, color: 'white' }}>{mazo.Titulo}</Typography>
                        <Grid item>
                        <Tooltip title="crear tarjeta" placement="right">
                                  <IconButton onClick={()=>{
                                    setMazo(mazo)
                                    setPregunta("")
                                    setOpcion1("")
                                    setOpcion2("")
                                    setOpcion3("")
                                    setOpcion4("")
                                    setRespuesta("")
                                    setShowAddCard(true)
                                  }} sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}} aria-label="comment">
                                      <AddIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Iniciar repaso" placement="right">
                                <IconButton onClick={()=>{
                                      history.push('/Tarjetas/'+mazo._id)
                                      }}
                                      sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}}>   
                                                    
                                          <LaunchOutlinedIcon/>
                                </IconButton>
                          </Tooltip>
                          <Tooltip title="editar mazo" placement="right">
                                
                                    <IconButton onClick={()=>{
                                      setShowEdit(true)
                                      setMazo(mazo)
                                      setTitulo(mazo.Titulo)
                                      setDescripcion(mazo.Descripcion)    
                                      }} sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}}>                             
                                          <EditIcon/>
                                        </IconButton>
                                
                          </Tooltip>
                          <Tooltip title="borrar mazo" placement="right">
                              <IconButton onClick={()=>{
                                  mazos.splice(idx, 1);
                                  //setMazos(mazos)
                                  axios.delete('/api/mazos/'+mazo._id)
                                  if (mazos.length===0){
                                    window.location.reload(false);
                                  }
                                  //window.location.reload(false);
                              }} sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}}>                             
                                  <DeleteIcon />
                                </IconButton>
                          </Tooltip>
                        </Grid>
                    </AccordionSummary>
                        <AccordionDetails >
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {mazo.Descripcion}
                          </Typography>
                            <List sx={{fontWeight: 'bold', color: 'white',bgcolor: '#454545'}}>
                                {mazo.Tarjetas.map((value, idx) => (
                                <React.Fragment key={idx}>  
                                  <ListItem
                                    key={value}
                                    disableGutters
                                    secondaryAction={
                                      <React.Fragment>
                                            <IconButton onClick={()=>{  
                                              setTarjetaIndex(idx)
                                              setMazo(mazo)
                                              setPregunta(mazo.Tarjetas[idx].Pregunta)
                                              setOpcion1(mazo.Tarjetas[idx].Opciones[0])
                                              setOpcion2(mazo.Tarjetas[idx].Opciones[1])
                                              setOpcion3(mazo.Tarjetas[idx].Opciones[2])
                                              setOpcion4(mazo.Tarjetas[idx].Opciones[3])
                                              setRespuesta(mazo.Tarjetas[idx].Respuesta)
                                              setShowEditCard(true);
                                              setTarjeta(value)
                                            }}  sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}} aria-label="comment">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={()=>{
                                              mazo.Tarjetas.splice(idx, 1);
                                              setMazo(mazo.Tarjetas)
                                              axios.put('/api/mazos/'+mazo._id, {"Tarjetas":mazo.Tarjetas})
                                            }}  sx={{color:'white',  '&:hover': {backgroundColor: '#00b347', color:'black'}}} aria-label="comment">
                                                <DeleteIcon />
                                            </IconButton>
                                      </React.Fragment>
                                    }
                                  >
                                    <ListItemButton sx={{fontWeight:'bold', color:'white', '&:hover': {backgroundColor: '#00b347', color:'black'}}}>                                  
                                        <ListItemText primary={`${value.Pregunta}`} />
                                    </ListItemButton>
                                  </ListItem>
                                  </React.Fragment>
                                ))}
                            </List>      
                        </AccordionDetails>
                    </Accordion>
              </React.Fragment>
              )       
            })
          }
          </Box>
      </Slide>    
      </React.Fragment>
  );
}