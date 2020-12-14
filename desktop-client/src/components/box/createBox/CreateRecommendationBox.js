import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ReactSelect from 'react-select';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
];

export default function SimpleSelect() {
  const classes = useStyles();
  const [currentRating, setCurrentRating] = useState('5');

  const handleRatingClick = (event) => {
    setCurrentRating(event.target.value);
  };

  const handleMovieTitleChange = (event) => {
    const value = event.target.value;
    if (value != "") {
      console.log(value);
    } else {
      console.log(value);
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
        <IconButton style={{position: "absolute", top: "10px", right: "10px"}}>
          <Clear/>
        </IconButton>
        <div>
          <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>Recommendation Post</p>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <Autocomplete
            style={{margin: "auto", marginBottom: "5px"}}
            id="free-solo-demo"
            freeSolo
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <TextField {...params} label="Movie Title" margin="normal" variant="outlined" />
            )}
          />
        </form>
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
      <form className={classes.root} noValidate autoComplete="off">
        <TextField multiline label="Review for the movie" rows={3} variant="outlined" style={{width: "90%"}} />
      </form>
      <div>
      <Button style={{width: "40%"}}>
        <InsertPhoto />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
      </Button>
      </div>
      <Button style={{backgroundColor: "black", color: "white"}} variant="contained" className={classes.button} startIcon={<AddCircleOutline />}>Create</Button>
    </div>
  );
}
