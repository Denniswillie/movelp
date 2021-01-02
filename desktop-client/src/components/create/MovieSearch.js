import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PostTypeContext from '../PostTypeContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function MovieSearch(props) {
  const classes = useStyles();
  const PostType = useContext(PostTypeContext);

  return <div style={{paddingTop: "0.5em"}}>
  <div style={{marginTop: "1em",
    boxShadow: "1px",
    borderRadius: "4px",
    borderStyle: "solid",
    borderColor:"#b5b5b5" ,
    borderWidth: "1px",
    width: "90%",
    height: "300px",
    margin: "auto",
    overflow: "auto"}}>

    {(props.createInput.chosenMovies.length >= 4 && props.postType !== PostType.RECOMMENDATION) || (props.createInput.chosenMovies.length >= 1 && props.postType === PostType.RECOMMENDATION)
      ? <p style={{fontFamily: "roboto"}}>You can only choose up to {props.postType === PostType.RECOMMENDATION ? "1" : "4"} movies.</p>
      : props.moviesList.reduce((result, movie) => {

      var imagePath;
      var title;
      if (!movie.poster_path) {
        imagePath = process.env.PUBLIC_URL + '/images/defaultImage.png';
      } else {
        imagePath = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      }

      if (movie.title) {
        title = movie.title;
      } else {
        title = movie.name;
      }

      var alreadyChosen = false;
      for (var i = 0; i < props.createInput.chosenMovies.length; i++) {
        if (props.createInput.chosenMovies[i].id === movie.id) {
          alreadyChosen = true;
        }
      }
      if (!alreadyChosen) {
        result.push(<Card className={classes.root} key={movie.id} style={{width: "30%", marginTop: "1em", float: "right", marginRight: "13px"}} onClick={() => {
          props.handleMovieClick(movie.id, title);
        }}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={movie.title}
              height="200"
              image={imagePath}
              title={title}
            />
            <CardContent style={{paddingTop: "0.5em", paddingBottom: "0.5em", height: "2em"}}>
              <p style={{fontFamily: "roboto", marginTop: "0", marginBottom: "0"}}>{title.toUpperCase()}</p>
            </CardContent>
          </CardActionArea>
        </Card>)
      }

      return result;
    }, [])}
  </div>
  </div>
}
