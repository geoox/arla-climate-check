import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Forum from './forum/Forum';
import Home from './home/Home';
import CreatePost from './create-post/CreatePost';
import Post from './post/Post';
import Posts from './posts/Posts';

function App() {
  const loggedIn = false;
  return (
    <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/home" />}
        </Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/forum' component={Forum}></Route>
        <Route exact path='/create-post' component={CreatePost}></Route>
        <Route exact path='/post/:id' component={Post}></Route>
        <Route exact path='/posts' component={Posts}></Route>
    </Switch>
  );
}

export default App;
