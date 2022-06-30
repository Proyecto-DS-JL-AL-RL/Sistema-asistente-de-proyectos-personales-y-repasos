import './App.css';
import {Switch , Route} from 'react-router-dom';
import Page1 from './pages/Page1';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';
import Horario from './pages/Horario';
import Proyectos from './pages/Proyectos';

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
            <Route path = '/' exact>
              <Page1/>
            </Route>
            <Route path = '/horario'>
              <Horario/>
            </Route>
            <Route path='/proyecto'>
              <Proyectos/>
            </Route>
          </Switch>
        </div>
      </div>
  </div>
  );
}

export default App;
