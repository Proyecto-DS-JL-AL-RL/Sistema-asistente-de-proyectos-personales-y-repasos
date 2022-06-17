import './App.css';
import {Switch , Route} from 'react-router-dom';
import Page1 from './pages/Page1';
import AppBarSearch from './components/AppBarSearch';
import DrawerComponent from './components/DrawerComponent';

function App() {
  return (
    <div className='container-main'>
      <DrawerComponent/>
    <div className='other-container'>
      <div className='head-container'>
        <AppBarSearch/>
      </div>
      <div className='content-container'>
        contenido
        <Switch>
          <Route path = '/'>
            <Page1/>
          </Route>
        </Switch>
      </div>
    </div>
  </div>
  );
}

export default App;
