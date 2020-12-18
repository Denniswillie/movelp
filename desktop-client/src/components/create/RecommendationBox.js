import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ratings = [
  {
    value: '1',
    label: '1 (Very Bad)',
  },
  {
    value: '2',
    label: '2 (Bad)',
  },
  {
    value: '3',
    label: '3 (Average)',
  },
  {
    value: '4',
    label: '4 (Good)',
  },
  {
    value: '5',
    label: '5 (Very Good)',
  },
];

export default function RecommendationBox(props) {
  const classes = useStyles();
  const [currentRating, setCurrentRating] = useState('5');

  const handleRatingClick = (event) => {
    setCurrentRating(event.target.value);
  };

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Rate</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={currentRating}
            onChange={handleRatingClick}
            label="Rating"
            style={{zIndex: "1000000000000000000000000000000"}}
          >
            {ratings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField multiline label="Review for the movie" rows={3} variant="outlined" style={{width: "90%"}} />
        {props.chosenMoviesIds.map(chosenMovieId => {
          return <input type="hidden" name="chosenMoviesIds[]" value={chosenMovieId}/>
        })}
        <input type="file" style={{display: "none"}} id="imageUpload"/>
        <input type="submit" style={{display: "none"}} id="submit"/>
      </form>
      <div>
      <Button style={{width: "40%"}} onClick={uploadPhoto}>
        <InsertPhoto />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
      </Button>
      </div>
      <Button
        onClick={submit}
        style={{backgroundColor: "black", color: "white"}}
        variant="contained"
        className={classes.button}
        startIcon={<AddCircleOutline />}>Create</Button>
    </div>
  );
}
