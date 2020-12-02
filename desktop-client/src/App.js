import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import PageNotFoundError from './components/PageNotFoundError';
import './App.scss';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
	      <Route path="/profile" component={Profile} />
	      <Route component={PageNotFoundError} />
      </Switch>
    </main>
  )
}

export default App;
