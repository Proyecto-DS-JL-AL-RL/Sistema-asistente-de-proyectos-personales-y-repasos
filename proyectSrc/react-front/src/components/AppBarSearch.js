import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from   '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import InputBase from  '@mui/material/InputBase';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAyuda } from '../stores/sliceAyuda';
import SR,{useSpeechRecognition} from 'react-speech-recognition';
import { AccountContext } from '../AccountContext';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

/*const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
*/

export default function AppBarSearch(props) {
  const dispatch = useDispatch();
  const ayuda = useSelector((state)=>state.ayuda.value);
  const handleAyuda = () =>{
    dispatch(mostrarAyuda());
  }
  const {listening,transcript} = useSpeechRecognition();
  const {sessionState,logout} = React.useContext(AccountContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img src="./medalla.png"
             alt="logro" className='img-medalla'></img>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {ayuda.title}

          </Typography>
          <Search>


            <IconButton
              color="inherit"
              
            >
              <QuestionMarkRoundedIcon onClick={handleAyuda}
                 sx={{color:'white', 
                 background:'green',fontSize:'2em',
                  p:1,borderRadius:50}}/> 
  
            </IconButton>

            <IconButton
              color="inherit"
              
            >        
              {listening?
                <MicIcon sx={{p:1, borderRadius:50, background:'blue',
                color:'white',fontSize:'2em' }}
                onClick={()=>{props.ClickButton.listen()}} 
                />
                :
                <MicIcon sx={{p:1, borderRadius:50, background:'red',
                color:'white', fontSize:'2em' }}
                onClick={()=>{props.ClickButton.listen()}} 
                />
              }
            </IconButton>
            {props.stateButton.showAnadir.icon?<IconButton
              color="inherit"
            >        
              <AddIcon mx={2} onClick={()=>{
                props.ClickButton.setShowAnadir({card:true, icon:true})}} sx={{ fontSize:'2em' , background:'purple', color:'white', p:1, borderRadius:50, '&:hover': {backgroundColor: '#6f2da8'}}}/>
            </IconButton>:null}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
