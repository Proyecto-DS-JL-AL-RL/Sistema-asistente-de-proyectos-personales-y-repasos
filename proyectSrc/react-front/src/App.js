import './App.css';
import React,{useContext,useEffect,useState} from 'react';
import {Switch , Route, useLocation, useHistory} from 'react-router-dom';
//import Page1 from './pages/Page1';

import Presentacion from './pages/Presentation';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';

import Horario1 from './pages/Horario1';
//import Proyectos from './pages/Proyectos';

import Tarjetas from './pages/verTarjeta';
import Inicio from './pages/Inicio';
import ProyectoView from './pages/projectDashboard';
import AlgoQueHacerPage from './pages/AlgoQueHacerPage';
import { styled } from '@mui/material/styles';
import SR,{useSpeechRecognition} from 'react-speech-recognition';
import { Beforeunload } from 'react-beforeunload';
import {getCommands} from './util/redirectSpeech';
import ActivityQueue from './pages/ActivityQueue';
import Register from './pages/Register';
import MostrarFuncionalidades from './pages/MostrarFuncionalidades'
import VerMazos from './pages/VerMazo'
import {useSelector} from 'react-redux';
import Proyectos from './pages/Proyectos';
import {  AccountContext } from './AccountContext';
import DisplayAyuda from './components/Ayuda/DisplayAyuda';
import axios from 'axios';

function App() {
  const [nameBar,setNameBar] = useState("Inicio")
  const CONTINOUS_ = false;
  const ayuda = useSelector((state)=>state.ayuda.value);


  const { getSession, logout , sessionState , setSessionState,setCurrentState,currentState }= useContext(AccountContext);
  const location = useLocation();
  const history = useHistory();
  const [listeningState,setListeningState] = useState(false);
  const commands = getCommands(location,history);
  const {listening,transcript} = useSpeechRecognition({commands:commands});
  const beforeUnload = ()=>{
    if (listening)
      SR.stopListening();
  }

  document.addEventListener("visibilitychange", event => {
    

    if (listeningState){
    if (document.visibilityState === "visible") {
      SR.startListening({language: 'es', continuous: CONTINOUS_});
    } else {
      SR.stopListening();
    }
    }else{
      SR.stopListening(); 
    }
  })
  const listen = ()=> { SR.startListening({language:'es',continuous:false})}

  const [logged,setLogged] = useState(true);
  const [showFeedBack, setShowFeedBack] = useState({card:false, icon:false})
  const [showAnadir, setShowAnadir] = useState({card:false, icon:false})
  //const [showBars, setShowBars] = useState(true)
  
  useEffect(()=>{
    getSession()
    .then((session)=>{
        console.log('State:',session);
    })
    .catch((err)=>{
        console.log(err);
    });
  },[]);

  useEffect(()=>{
    if (sessionState.nickname){
        axios.get('http://localhost:4000/api/state/'+sessionState.sub)
        .then(data=>{
          setCurrentState(data.data);
        })
        .catch(err=>console.log(err));
    }else{
      setCurrentState({});
    }
  },[sessionState]);

  //<button onClick = {()=>{listening?SR.stopListening():SR.startListening({language: 'es', continuous: CONTINOUS_});setListeningState(!listeningState)}}>xd</button>
  return (
          <div className='container-main'>
                  
                  <DrawerComponent/>
                  <div className='other-container'>
                    <div className='head-container'>
                      <AppBarSearch stateButton={{showFeedBack, showAnadir}} 
                          ClickButton={{setShowFeedBack, setShowAnadir, listen}}
                          name={nameBar} setName={setNameBar}/>
                        </div>
                    <div className='content-container'>
                      {transcript}
                      <Switch>
                        <Route exact path = '/'>
                          <MostrarFuncionalidades showAdd={{showAnadir, setShowAnadir}} showFuncionalidades={{showFeedBack, setShowFeedBack}}/>
                        </Route>
                        <Route exact path = '/registro'>
                          <Register/>
                        </Route>
                        <Route path = '/proyectos'>
                          <Proyectos/>
                        </Route>
                        <Route path = '/proyecto/:idProyecto'>
                          <ProyectoView/>
                        </Route>
                        <Route path = '/algoQueHacer'>
                          <AlgoQueHacerPage/>
                        </Route>
                        <Route path = '/activityQueue'>
                          <ActivityQueue/>
                        </Route>
                        <Route exact path = "/inicio" >
                          <Inicio  logged={{logged,setLogged}}/>
                        </Route>
                        <Route exact path = "/Tarjetas/:idSeccion" >
                                <Tarjetas showFuncionalidades={{showFeedBack, setShowFeedBack}} showAdd={{showAnadir, setShowAnadir}} />
                        </Route>
                            <Route path = '/Mazos'>
                                  <VerMazos showAdd={{showAnadir, setShowAnadir}} showFeed={{showFeedBack, setShowFeedBack}}/>
                            </Route>
                            <Route path = '/horario'>
                              <Horario1 setName={setNameBar}/>
                            </Route>
                            <Route path = '/Presentacion'>
                                  <Presentacion/>
                            </Route>
                      </Switch>
                    </div>
                  </div>
                  <Beforeunload onBeforeunload= {beforeUnload} />
                  
                  {ayuda.display?<DisplayAyuda/>:null}
                    
            </div>
  );
}

export default App;
