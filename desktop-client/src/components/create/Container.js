import DiaryBox from './DiaryBox';
import AskForSuggestionBox from './AskForSuggestionsBox';
import GeneralBox from './GeneralBox';
import RecommendationBox from './RecommendationBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Backspace from '@material-ui/icons/Backspace'
import MovieSearch from './MovieSearch';
import {useState} from 'react';

export default function Container(props) {
  const [isSearchingMovie, setSearchingMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [chosenMoviesIds, setChosenMoviesIds] = useState([]);

  function renderBox(param) {
    if (param.generalBox) {
      return <GeneralBox chosenMoviesIds={chosenMoviesIds}/>
    } else if (param.diaryBox) {
      return <DiaryBox chosenMoviesIds={chosenMoviesIds}/>
    } else if (param.recommendationBox) {
      return <RecommendationBox chosenMoviesIds={chosenMoviesIds}/>
    } else if (param.askSuggestionBox) {
      return <AskForSuggestionBox/>
    }
  }

  function handleSearchFieldClick() {
    setSearchingMovie(true);
  }

  function handleSearchFieldUnclick() {
    if (isSearchingMovie) {
      setSearchingMovie(false);
    }
  }

  function handleMovieClick(movieId) {
    setChosenMoviesIds(prevData => {
      return [...prevData, movieId];
    })
  }

  function handleMovieTitleInput(event) {
    const value = event.target.value;
    if (value.trim()) {
      fetch("https://api.themoviedb.org/3/search/multi?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US&query=" + value)
        .then(res => res.json())
        .catch(console.log)
        .then(res => {
          setMoviesList(res.results);
        })
        .catch(err => console.log(err));
    } else {
      setMoviesList([]);
    }
  }

  return (
    <div style={{
        width: "500px",
        height: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5em",
        backgroundColor: "white",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        borderRadius: "5px",
        boxShadow: "0 0 20px #999",
        zIndex: "100",
        position: "absolute",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "3px"}}>
      <IconButton style={{position: "absolute", top: "10px", right: "10px"}} onClick={props.handleExitClick}>
        <Clear/>
      </IconButton>
      <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>{props.createType.titleText}</p>
      {isSearchingMovie && <Button style={{backgroundColor: "black", color: "white", position: "absolute", top: "30px", left: "30px"}} variant="contained" startIcon={<Backspace />} onClick={handleSearchFieldUnclick}>Back</Button>}
      {!props.createType.askSuggestionBox && <TextField label="Movie title" variant="outlined" style={{width: "90%"}} onClick={handleSearchFieldClick} onChange={handleMovieTitleInput}/>}
      {isSearchingMovie ? <MovieSearch moviesList={moviesList} handleMovieClick={handleMovieClick}/> : renderBox(props.createType)}
    </div>
  );
}
