import './App.css';
import React,{useContext,useEffect,useState} from 'react';
import {Switch , Route, useLocation, useHistory} from 'react-router-dom';
//import Page1 from './pages/Page1';
import { Box, Grid } from '@mui/material';
import Presentacion from './pages/Presentation';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';
import CircularProgress from '@mui/material/CircularProgress';
import Horario1 from './pages/Horario1';
//import Proyectos from './pages/Proyectos';

import Tarjetas from './pages/verTarjeta';
import Inicio from './pages/Inicio';
import ProyectoView from './pages/projectDashboard';
import AlgoQueHacerPage from './pages/AlgoQueHacerPage';
//import { styled } from '@mui/material/styles';
import SR,{useSpeechRecognition} from 'react-speech-recognition';
import { Beforeunload } from 'react-beforeunload';
import {getCommands} from './util/redirectSpeech';
import ActivityQueue from './pages/ActivityQueue';
import Register from './pages/Register';
import MostrarFuncionalidades from './pages/MostrarFuncionalidades'
import VerMazos from './pages/VerMazo'
import {useSelector,useDispatch} from 'react-redux';
import Proyectos from './pages/Proyectos';
import {  AccountContext } from './AccountContext';
import DisplayAyuda from './components/Ayuda/DisplayAyuda';
import DisplayTutorial from './components/Ayuda/tutorialDisplay';
import MensajesCompletos from './components/horario/MensajesCompletos';
import { setVisible as setVisibleMensajeCorto } from './stores/sliceMensajesCortos';
import { BACK_IP } from './publicConstants';


import axios from 'axios';
import NofoundPage from './components/redirect/NofoundPage';
import EscuchandoDisplay from './components/Ayuda/EscuchandoDisplay';
import AyudaMicro from './components/Ayuda/AyudaMicro';


function App() {
  const [nameBar,setNameBar] = useState("Inicio")
  const CONTINOUS_ = false;
  const ayuda = useSelector((state)=>state.ayuda.value);
  const tutorial = useSelector(state=>state.tutoriales.value);
  const mensajesFantasma = useSelector((state)=>(state.mensajesCortos.value));
  const dispatch = useDispatch();
  
  const { getSession, logout , sessionState , setSessionState,setCurrentState,currentState }= useContext(AccountContext);
  const location = useLocation();
  const history = useHistory();
  const [lAfterComandFlag,setAfterCommandFlag] = useState(false);
  const commands = getCommands(location,history,setAfterCommandFlag,lAfterComandFlag);
  const {listening,transcript} = useSpeechRecognition({commands:commands});
  const [mensajesCortos,setMensajesCortos] = useState(null);
  const [initFlag,setInitFlag] = useState(false);

  const beforeUnload = ()=>{
    if (listening){
      setAfterCommandFlag(false);
      SR.stopListening();      
    }      
  }


  const listen = ()=> { 
    if (listening)
      SR.stopListening();
    else
      SR.startListening({language:'es',continuous:false});   
    }

  const [logged,setLogged] = useState(true);
  const [showFeedBack, setShowFeedBack] = useState({card:false, icon:false})
  const [showAnadir, setShowAnadir] = useState({card:false, icon:false})
  //const [showBars, setShowBars] = useState(true)
  
  useEffect(()=>{
    setInitFlag(false)
    getSession()
    .then((session)=>{
        setInitFlag(true);
    })
    .catch((err)=>{
        console.log(err);
        setInitFlag(true);
    });
  },[]);

  useEffect(()=>{
    if(mensajesFantasma.visible){
      setMensajesCortos(<MensajesCompletos 
        content={mensajesFantasma.content}
        visible={setMensajesCortos}/>)
      setTimeout(()=>{
        setMensajesCortos(null);
        dispatch(setVisibleMensajeCorto(false));
      },1700)
    }
  },[mensajesFantasma]);


  useEffect(()=>{
    if (sessionState?.nickname){
        axios.get(BACK_IP+'/api/state/'+sessionState.sub+'/'+sessionState.nickname)
        .then(data=>{
          setCurrentState(data.data);
          setInitFlag(true)
        })
        .catch(err=>{console.log(err);setInitFlag(true)});
    }else{
      setCurrentState({});
    }
  },[sessionState]);

  useEffect(()=>{
    if (listening){
      setAfterCommandFlag(false);
    }else{
      if (lAfterComandFlag)
        listen();
    }
  },[listening]);



  return (
          <div className='container-main'>
            {initFlag?
            <React.Fragment>
                            
              {sessionState?.nickname?
                    <React.Fragment><DrawerComponent/> </React.Fragment>:
                      null
                    }
                    

                    
                    <div className='other-container'>
                      {sessionState?.nickname?
                        <div className='head-container'>
                        <AppBarSearch stateButton={{showFeedBack, showAnadir}} 
                            ClickButton={{setShowFeedBack, setShowAnadir, listen}}
                            name={nameBar} setName={setNameBar}/>
                          </div>:null
                      }
                      
                      <div className='content-container'>
                        {sessionState?.nickname?
                        <Switch>
                          <Route exact path = '/'>
                            <MostrarFuncionalidades showAdd={{showAnadir, setShowAnadir}} showFuncionalidades={{showFeedBack, setShowFeedBack}}/>
                          </Route>
                  
                          <Route path = '/proyectos'>
                            <Proyectos showAdd={{showAnadir, setShowAnadir}}/>
                          </Route>
                          <Route path = '/proyecto/:idProyecto'>
                            <ProyectoView/>
                          </Route>
                          <Route path = '/algoQueHacer'>
                            <AlgoQueHacerPage showAdd={{showAnadir, setShowAnadir}}/>
                          </Route>
                          <Route path = '/activityQueue'>
                            <ActivityQueue/>
                          </Route>
                          <Route path='/microAyuda'>
                            <AyudaMicro showAdd={{showAnadir, setShowAnadir}}/>
                          </Route>
                          <Route exact path = "/Tarjetas/:idSeccion" >
                                  <Tarjetas showFuncionalidades={{showFeedBack, setShowFeedBack}} showAdd={{showAnadir, setShowAnadir}} />
                          </Route>
                              <Route path = '/Mazos'>
                                    <VerMazos showAdd={{showAnadir, setShowAnadir}} showFeed={{showFeedBack, setShowFeedBack}}/>
                              </Route>
                              <Route path = '/horario'>
                                <Horario1 showAdd={{showAnadir, setShowAnadir}}/>
                              </Route>
                              <Route path = '/Presentacion'>
                                    <Presentacion/>
                              </Route>
                          <Route>
                            <NofoundPage/>
                          </Route>
                        </Switch>
                        :
                        <Switch>
                    
                          <Route exact path = '/registro'>
                            <Register/>
                          </Route>
                          <Route default>
                            <Inicio  logged={{logged,setLogged}}/>
                          </Route>
                          
                        </Switch>
                        }
                      </div>
                    </div>
                    <Beforeunload onBeforeunload= {beforeUnload} />
                    
                    {ayuda.display?<DisplayAyuda/>:null}
                    {tutorial.display?<DisplayTutorial/>:null}
                    {listening?<EscuchandoDisplay mensaje={transcript}/>:null}
            </React.Fragment>
            :
            <Grid container  sx={{ display: 'flex', width:'100%',height:'100%'}} alignItems = 'center' justifyContent = 'center'>
              <CircularProgress size={150}/>
            </Grid>
            }
            {mensajesCortos}    
            </div>
  );
}

export default App;
