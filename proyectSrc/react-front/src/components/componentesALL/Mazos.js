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
  backgroundColor: '#751aff',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   backgroundColor: '#59C4E8',
   padding: theme.spacing(2),
   borderTop: '1px solid rgba(89, 196, 232, .200)',
}));

export default function Mazos(props) {
  const [expanded, setExpanded] = useState('panel1');
  const [mazos, setMazos] = useState(props.getmazo)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
/*
  Este archivo crea los Mazos, es decir cada sección la cual contendra  las tarjetas para el repaso
  y los proyectos.
  
*/
  return (
    <div>
      {
        mazos.map((mazo, idx)=>{
          return  ( 
                <React.Fragment key={idx}>
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
                              <EditIcon />
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
    </div> 
  );
}