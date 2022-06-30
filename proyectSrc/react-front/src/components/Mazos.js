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
  const [nameSection, setSection] = useState('')
  const [description, setDescription] = useState('')
  const [mazos, setMazos] = useState(props.getmazo)
  const [showEdit, setShowEdit] = useState(false)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
/*
  Este archivo crea los Mazos, es decir cada sección la cual contendra  las tarjetas para el repaso
  y los proyectos.
  {show?<BasicCard/>:null}
*/
  return (

    <React.Fragment>
       <Box sx={{
                  width: 350,
                  height: 350,
                  zIndex:1,
                  position: 'absolute',
                }}
                >
                  {showEdit?
                      <Grow  timeout={1000}  in={showEdit}>  
                        <Card  sx={{borderRadius: '5%', mx:50, minWidth: 600, border: '0.5px solid purple'}}>
                            <CardContent>
                                <Tooltip title="Cancelar" placement="right">
                                        <CloseIcon onClick={(e)=>{setShowEdit(false)}} sx={{p:1,mx:65, backgroundColor: 'red', '&:hover': {backgroundColor: '#FF6347'},borderRadius: '50%', color: 'white'}}/>
                                 </Tooltip>   
                                  <Typography sx={{fontWeight: 'bold', mx:3}} variant="h4" component="div">
                                      Editar Sección
                                  </Typography>
                                    <Box  justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl  sx={{m: 2, width: '45ch' }} variant="outlined">
                                              <TextField sx={{py:2}} id="outlined-basic" label="Titulo de la Sección" defaultValue= {nameSection} variant="outlined" />
                                              <TextField
                                                  id="outlined-multiline-static"
                                                  label="Descripcion"
                                                  multiline
                                                  rows={4}
                                                  defaultValue={description}
                                                />
                                      </FormControl>
                                      <Tooltip title="Guardar" placement="left">
                                        <Button onClick={()=>{setShowEdit(false)}} sx={{borderRadius: 3, color: 'black', background:'#00b347', '&:hover': {backgroundColor: '#cfe619'}}} variant="contained" size="small">
                                          <SaveIcon sx={{p:1}}/>
                                        </Button>
                                    </Tooltip>
                                    </Box>
                              </CardContent>
                        </Card>
                      </Grow>:null}
        </Box> 
    <Slide direction="up" timeout={1000} in={true} mountOnEnter unmountOnExit>
      <Box mt={20} sx={{position: 'absolute', pr:1.5, background:'#20B2AA'}}>
        {
        mazos.map((mazo, idx)=>{
          return  (
              <React.Fragment  key={idx}>
                <Accordion expanded={expanded === `panel${idx}$`} onChange={handleChange(`panel${idx}$`)}>
                  <AccordionSummary aria-controls={`panel${idx}$d-content`} id={`panel${idx}$d-header`}>
                      <Typography  variant="h5" sx={{ flexGrow: 1, color: 'white' }}>{mazo.titulo}</Typography>
                      <Grid item>
                        <Tooltip title="abrir" placement="right">
                            <IconButton sx={{color: "white"}}>                             
                                <LaunchOutlinedIcon />
                              </IconButton>
                        </Tooltip>
                        <Tooltip title="editar" placement="right">
                            <IconButton sx={{color: "white"}}>                             
                                <EditIcon onClick={()=>{
                                  setShowEdit(true)
                                  setSection(mazo.titulo)
                                  setDescription(mazo.descripcion)
                                  }}/>
                              </IconButton>
                        </Tooltip>
                        <Tooltip title="borrar" placement="right">
                            <IconButton sx={{color: "white"}}>                             
                                <DeleteIcon />
                              </IconButton>
                        </Tooltip>
                      </Grid>
                  </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="h6">
                              {mazo.descripcion}
                        </Typography>
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