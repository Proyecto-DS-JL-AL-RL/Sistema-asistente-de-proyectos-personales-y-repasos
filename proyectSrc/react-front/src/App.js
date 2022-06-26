import './App.css';
import {Switch , Route} from 'react-router-dom';
import Page1 from './pages/Page1';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';
import Inicio from './pages/Inicio';
import ProyectoView from './pages/projectDashboard';
import AlgoQueHacer from './pages/AlgoQueHacer';
import MostrarFuncionalidades from './components/componentesALL/MostrarFuncionalidades'

function App() {
  return (
    <div className='container-main'>
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
          <Route path = '/Funcionalidades'>
            <MostrarFuncionalidades/>
          </Route>
        </Switch>
      </div>
    </div>
  </div>
  );
}

export default App;
