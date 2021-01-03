import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Profile from './components/Profile';
import Movie from './components/Movie';
import Navbar from './components/Navbar';
import PageNotFoundError from './components/PageNotFoundError';
import './App.scss';

export default function App(props) {
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [userId, setUserId] = useState();
  const [creatorId, setCreatorId] = useState();
  const [movieId, setMovieId] = useState();

  function handleChangeDisplayNavbar(display) {
    if (display) {
      setDisplayNavbar(true);
    } else {
      setDisplayNavbar(false);
    }
  }

  function handleChangeCreatorId(id) {
    setCreatorId(id);
  }

  function handleChangeMovieId(id) {
    setMovieId(id);
  }

  function handleChangeUserId(id) {
    setUserId(id);
  }

  return (
    <main>
      {displayNavbar && <Navbar
        userId={userId}
        handleChangeCreatorId={handleChangeCreatorId}
        handleChangeMovieId={handleChangeMovieId}
      />}
      <Switch>
        <Route path="/" exact render={(props) => {
          return <Home
            handleChangeDisplayNavbar={handleChangeDisplayNavbar}
            handleChangeCreatorId={handleChangeCreatorId}
            handleChangeMovieId={handleChangeMovieId}
            handleChangeUserId={handleChangeUserId}
            {...props} />
        }}/>
        <Route path="/profile/:creatorId" exact render={(props) => {
          return <Profile
            handleChangeDisplayNavbar={handleChangeDisplayNavbar}
            {...props}/>
        }}/>
        <Route path="/movie/:movieId" exact render={(props) => {
          return <Movie
            handleChangeDisplayNavbar={handleChangeDisplayNavbar}
            {...props}/>
        }}/>
	      <Route component={PageNotFoundError} />
      </Switch>
    </main>
  )
}
