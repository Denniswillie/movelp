import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {useEffect, useState} from 'react';
import {
  isBrowser,
  isMobile
} from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export default function MovieInfoBox(props) {
  const classes = useStyles();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    async function fetchData() {
      var movieDataRaw =
          await fetch("https://api.themoviedb.org/3/movie/" + props.movieId + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
      if (movieDataRaw.status === 404) {
        movieDataRaw = await fetch("https://api.themoviedb.org/3/tv/" + props.movieId + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
      }
      const movie = await movieDataRaw.json();
      var title;
      if (movie.title) {
        title = movie.title;
      } else {
        title = movie.name;
      }

      var genres = "";
      if (movie.genres) {
        for (var i = 0; i < movie.genres.length; i++) {
          genres += (" " + movie.genres[i].name);
          if (i !== movie.genres.length - 1) {
            genres += " |";
          }
        }
      }
      const releaseDate = movie.release_date;
      const overview = movie.overview;
      const runtime = movie.runtime;
      const posterUrl = !movie.poster_path ? process.env.PUBLIC_URL + '/images/defaultImage.png' : "https://image.tmdb.org/t/p/w500" + movie.poster_path;

      setMovieData({
        title: title,
        genres: genres,
        releaseDate: releaseDate,
        overview: overview,
        posterUrl: posterUrl,
        runtime: runtime
      })
    }

    fetchData();
  }, [])

  return <div style={{
      position: "absolute",
      width: isBrowser ? "300px" : "95%",
      backgroundColor: "white",
      right: "5em",
      top: "6em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999",
      paddingTop: "1em",
      paddingBottom: "1em"}}>
      {movieData && <div style={{width: "100%", margin: "auto", position: "relative"}}>
        <img
          style={{borderStyle: "solid", borderRadius: "10px", borderColor: "#F0F2F5", borderWidth: "2px", width: "17em", margin: "auto", height: "21em"}}
          alt="movie poster"
          src={movieData.posterUrl}/>
        <div style={{textAlign: "center"}}>
          <h1 style={{fontFamily: "roboto", fontWeight: "normal", marginBottom: "0.2em"}}>{movieData.title}</h1>
          <p style={{marginTop: "0", marginBottom: "0.4em", fontFamily: "roboto"}}>Release Date: <b>{movieData.releaseDate}</b></p>
          <p style={{marginTop: "0", marginBottom: "0.4em", fontFamily: "roboto"}}>Genres: <b>{movieData.genres}</b></p>
          <p style={{marginTop: "0", marginBottom: "0.4em", fontFamily: "roboto"}}>Runtime: <b>{movieData.runtime} minutes</b></p>
        </div>
      </div>}
  </div>
}
