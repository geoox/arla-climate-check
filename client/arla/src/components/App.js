import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Forum from './forum/Forum';
import Home from './home/Home';

function App() {
  const loggedIn = false;
  return (
    <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/home" />}
        </Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/forum' component={Forum}></Route>
    </Switch>
  );
}

export default App;
