import './App.css';

import {Switch , Route, useLocation, useHistory} from 'react-router-dom';
import Page1 from './pages/Page1';

import Presentacion from './pages/Presentation';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';

import Horario from './pages/Horario';
import Proyectos from './pages/Proyectos';

import Inicio from './pages/Inicio';
import ProyectoView from './pages/projectDashboard';
import AlgoQueHacer from './pages/AlgoQueHacer';

import SR,{useSpeechRecognition} from 'react-speech-recognition';
import { Beforeunload } from 'react-beforeunload';
import {getCommands} from './util/redirectSpeech';
import { useState } from 'react';
import ActivityQueue from './pages/ActivityQueue';

import MostrarFuncionalidades from './pages/MostrarFuncionalidades'
import VerMazos from './pages/VerMazo'

function App() {
  const CONTINOUS_ = false;


  const location = useLocation();
  const history = useHistory();
  const [listeningState,setListeningState] = useState(false);
  const commands = getCommands(location,history);
  const {listening} = useSpeechRecognition({commands:commands});
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



  return (
    <div className='container-main'>

      <button onClick = {()=>{listening?SR.stopListening():SR.startListening({language: 'es', continuous: CONTINOUS_});setListeningState(!listeningState)}}>xd</button>
      <DrawerComponent/>
    <div className='other-container'>
      <div className='head-container'>
        <AppBarSearch/>
      </div>
      <div className='content-container'>
        <Switch>
          <Route exact path = '/'>
            <Page1/>
          </Route>
          <Route path = '/inicio'>
            <Inicio/>
          </Route>
          <Route path = '/proyect'>
            <ProyectoView/>
          </Route>
          <Route path = '/algoQueHacer'>
            <AlgoQueHacer/>
          </Route>
          <Route path = '/activityQueue'>
            <ActivityQueue/>
          </Route>
              <Route path = '/Mazos'>
                    <VerMazos/>
              </Route>
              <Route path = '/horario'>
                <Horario/>
              </Route>
              <Route path = '/Presentacion'>
                    <Presentacion/>
              </Route>
        </Switch>
      </div>
    </div>
    <Beforeunload onBeforeunload= {beforeUnload} />
  </div>
  );
}

export default App;
