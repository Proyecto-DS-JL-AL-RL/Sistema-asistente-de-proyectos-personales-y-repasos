import './App.css';
import {Switch , Route} from 'react-router-dom';
import Presentacion from './pages/Presentation';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';
import Inicio from './pages/Inicio';
import ProyectoView from './pages/projectDashboard';
import AlgoQueHacer from './pages/AlgoQueHacer';
import MostrarFuncionalidades from './pages/MostrarFuncionalidades'
import VerMazos from './pages/VerMazo'


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
                <Presentacion/>
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
              <Route path = '/Mazos'>
                    <VerMazos/>
              </Route>
        </Switch>
      </div>
    </div>
  </div>
  );
}

export default App;
