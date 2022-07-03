import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import Stack from '@mui/material/Stack';


export default function VerTarjeta() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <React.Fragment>
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
                <Paper sx={{
                    mx:'4%',  
                    position: 'absolute',        
                    width: '88%',
                    height: '80%',
                    color:'yellow',
                    background:'#c8a2c8',
                    border: '0.5px solid black'
                }}
                    variant="outlined" >
                        <Paper sx={{
                            mt:'1%',
                            mx: '-1%',
                            zIndex:1,  
                            position: 'absolute',        
                            width: '99.9%',
                            height: '99%',
                            color:'yellow',
                            background:'#c8a2c8',
                            border: '0.5px solid black'
                        }}
                            variant="outlined" >
                                <Paper sx={{
                                    mt:'1%',
                                    mx: '-1%',
                                    zIndex:1,  
                                    position: 'absolute',        
                                    width: '99.9%',
                                    height: '99%',
                                    color:'yellow',
                                    background:'#c8a2c8',
                                    border: '0.5px solid black'
                                }}
                                    variant="outlined" >
                                                    <Paper sx={{
                                                        mx:'3%',
                                                        mt:'4%',
                                                        zIndex:1,
                                                        justifyContent: 'center',  
                                                        position: 'absolute',        
                                                        width: '93%',
                                                        height: '40%',
                                                        borderRadius:'12%',
                                                        background:'#EEB5EB',
                                                        border: '0.5px solid black'
                                                    }}
                                                        variant="outlined" >
                                                            <Typography mt={'7%'} sx={{fontWeight: 'bold', textAlign: 'center'}} variant="h2" component="div">¿Esta es una pregunta?</Typography>
                                                    </Paper>
                                                    <Paper sx={{
                                                        mx:'3%',
                                                        mt:'26%',
                                                        justifyContent: 'center',  
                                                        position: 'absolute',        
                                                        width: '93%',
                                                        height: '40%',
                                                       
                                                        background:'#c8a2c8'
                                                    }}>
                                                    <Box sx={{display: 'flex'}}> 
                                                                <Box sx={{flexGrow:1, textAlign: 'center'  }}>
                                                                    <Grid  container spacing={1}>
                                                                            <Grid item xs>
                                                                                    <Box sx={{ width: '100%' }}>
                                                                                        <Stack spacing={2}>
                                                                                            <Button sx={{borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE'}}>Item 1</Button>
                                                                                            <Button sx={{borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE'}}>Item 2</Button>
                                                                                        </Stack>
                                                                                    </Box>
                                                                            </Grid>
                                                                            <Grid mt={'6%'} item xs={'1%'}>
                                                                                        <MicIcon sx={{p:2, borderRadius:'50%', background:'red',
                                                                                        color:'white', width: '30%', height: '30%', '&:hover': {backgroundColor: '#FF6347'} }}/>
                                                                            </Grid>
                                                                            <Grid item xs>
                                                                                    <Box sx={{ width: '100%' }}>
                                                                                        <Stack spacing={1}>
                                                                                            <Button sx={{borderRadius:'6%',p:9,color: 'black',background:'#BBE7FE'}}>Item 1</Button>
                                                                                            <Button sx={{borderRadius:'6%',p:9, color: 'black',background:'#BBE7FE'}}>Item 2</Button>
                                                                                        </Stack>
                                                                                    </Box>
                                                                            </Grid>
                                                                    </Grid> 
                                                                    </Box>
                                                            </Box>
                                                    </Paper> 
                                </Paper>
                        </Paper>
                </Paper>
                
    </Box>
    <Box
      sx={{
        mt:'47%',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
        <Pagination sx={{textAlign: 'center'}} count={5} page={page} onChange={handleChange}  color="secondary" />
    </Box>
    </React.Fragment>
  );
}