import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Forum from './forum/Forum';
import Home from './home/Home';
import CreatePost from './create-post/CreatePost';
import Post from './post/Post';

function App() {
  const loggedIn = false;
  return (
    <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/home" />}
        </Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/forum' component={Forum}></Route>
        <Route path='/create-post' component={CreatePost}></Route>
        <Route path='/post/:id' component={Post}></Route>
    </Switch>
  );
}

export default App;
