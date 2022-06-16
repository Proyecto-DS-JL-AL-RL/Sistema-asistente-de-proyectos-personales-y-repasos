import './App.css';
import {Switch , Route} from 'react-router-dom';
import Page1 from './pages/Page1';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/'>
          <Page1/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
