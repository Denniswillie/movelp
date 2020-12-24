import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function MovieSearch(props) {
  const classes = useStyles();

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
    {props.moviesList.map(movie => {
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

      return <Card className={classes.root} key={movie.id} style={{width: "30%", marginBottom: "2em"}} onClick={() => {
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
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    })}
  </div>
  </div>
}
