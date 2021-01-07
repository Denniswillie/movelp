import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Movie from './components/Movie';
import PageNotFoundError from './components/PageNotFoundError';
import './App.scss';

export default function App(props) {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/profile/:creatorId" exact render={(props) => {
          return <Profile creatorId={props.match.params.creatorId}/>
        }}/>
        <Route path="/movie/:movieId" exact render={(props) => {
          return <Movie movieId={props.match.params.movieId}/>
        }}/>
	      <Route component={PageNotFoundError} />
      </Switch>
    </main>
  )
}
