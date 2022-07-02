import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from   '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from  '@mui/material/InputBase';
import MenuIcon from   '@mui/icons-material/Menu';


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

const SearchIconWrapper = styled('div')(({ theme }) => ({
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

export default function AppBarSearch() {
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
            <img src="https://i.pinimg.com/originals/d5/16/80/d5168001add6c3c50a1ea9328b466013.png" className='img-medalla'></img>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Algo
          </Typography>
          <Search>
            <IconButton
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
