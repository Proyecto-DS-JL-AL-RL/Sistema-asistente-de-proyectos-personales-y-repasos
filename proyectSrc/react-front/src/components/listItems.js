import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StyleIcon from '@mui/icons-material/Style';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from '../AccountContext';
import InfoIcon from '@mui/icons-material/Info';

function ItemButttonBar(props){
  const history = useHistory();
  return (
    <ListItemButton sx={{backgroundColor:'rgba(255,255,255,0.1)',mb:"3px"}} onClick={()=>{history.push(props.page)}}>
      <ListItemIcon>
        {props.icon || <DashboardIcon sx={{color:'white'}}/>}
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItemButton>
  )
}

function LoggoutButttonBar(props){
  const history = useHistory();
  const {logout} = useContext(AccountContext);;
  return (
    <ListItemButton sx={{backgroundColor:'rgba(255,255,255,0.1)',mb:"3px"}} onClick={()=>{logout();history.push('/')}}>
      <ListItemIcon>
        <LogoutIcon sx={{color:'white', borderBottom:'solid 1px white'}}/>
      </ListItemIcon>
      <ListItemText primary="Salir" />      
    </ListItemButton>
  )
}

export const  mainListItems = (
  <React.Fragment>
    <ItemButttonBar page={"/proyectos"}
    icon = {<DashboardIcon sx={{color:'white',
    borderBottom:'solid 1px white'}}/>} name= {"Gestionar Proyectos"}/>
    <ItemButttonBar page = {"/Mazos"}
    icon={<StyleIcon sx={{color:'white',
    borderBottom:'solid 1px white'}}/>} name={"Tarjetas"} />
    <ItemButttonBar page={"/horario"} 
    icon={<CalendarViewWeekIcon sx={{color:'white',
    borderBottom:'solid 1px white'}}/>}  name={"Actividades"}
    />
    <ItemButttonBar page={"/algoQueHacer"} 
    icon={<PlayCircleFilledWhiteIcon sx={{color:'white',
    borderBottom:'solid 1px white'}}/>}  name={"Algo que hacer"}
    />
    
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" 
    sx={{backgroundColor:'transparent',
    borderBottom:'solid 2px white',
    borderTop:'solid 2px white',
    color:'white'}} inset>
      Accesos Rapidos
    </ListSubheader>

    <LoggoutButttonBar/>
    
    <ItemButttonBar page={"/"}
    icon={<HomeIcon sx={{color:'white',
    borderBottom:'solid 1px white'}}/>} name={"Home"}/>

  </React.Fragment>
    
);