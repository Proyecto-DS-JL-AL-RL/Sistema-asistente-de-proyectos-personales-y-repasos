import React, { useState,useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';
import { AccountContext } from '../AccountContext';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import AvatarScore from './AvatarScore';

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(5),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
          },
        }),
      },
    }),
  );
/*
backgroundColor:'#6969cc',
          opacity:1,
          backgroundImage: 'linear-gradient(135deg, #8589d8 25%, transparent 25%), linear-gradient(225deg, #8589d8 25%, transparent 25%), linear-gradient(45deg, #8589d8 25%, transparent 25%), linear-gradient(315deg, #8589d8 25%, #6969cc 25%)',
          backgroundPosition: '33px 0, 33px 0, 0 0, 0 0',
          backgroundSize : '33px 33px',
          backgroundRepeat: 'repeat'

backgroundImage:'radial-gradient(#8589d8 15%, transparent 16%),radial-gradient(#058ad8 15%, transparent 16%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
*/
export default function DrawerComponent() {
    const {sessionState} = useContext(AccountContext);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
          document.documentElement.style.setProperty('--avatar-drawer-display',open?'visible':'hidden'); 
        },100);
      },[open]);
    return (
        <Drawer variant="permanent" open={open} 
        sx={{'& .MuiDrawer-paper':{
          backgroundColor: '#7C3AED',
          color:'white'
        }}}>
            <Toolbar
                sx={{
                
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
              
            <IconButton sx={{paddingBottom:'1px',
            paddingTop:'1px'}} onClick={()=>{setOpen(!open)}}>
                {open?<ChevronLeftIcon 
                sx={{fontSize:'1.5em',color:'white',fontWeight:'bold'}}  />:
                <ChevronRightIcon sx={{fontSize:'1.5em',
                color:'white',
                fontWeight:'bold',
                }}/>}
            </IconButton>
   
                
            </Toolbar>
            <div className='ctn-avatar'>
                <AvatarScore/>
            </div>
            <Typography sx ={{width:'100%',textAlign:'center' ,display:'inline'}} variant = 'h5' >{((sessionState?.nickname)&&open)?sessionState.nickname:null}</Typography>
 

            <Divider />
            <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
            </Drawer>
    )
}
