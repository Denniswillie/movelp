import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DiaryBox(props) {
  const classes = useStyles();

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  return <div>
    <div id = "createDiaryForm">
      <form className={classes.root} noValidate autoComplete="off" method="POST">
        <TextField label="Diary Title" variant="outlined" style={{width: "90%"}}/>
        <TextField multiline label="Share your story" rows={4} variant="outlined" style={{width: "90%"}}/>
        {props.chosenMoviesIds.map(chosenMovieId => {
          return <input type="hidden" name="chosenMoviesIds[]" value={chosenMovieId}/>
        })}
        <input type="file" id="imageUpload" style={{display: "none"}}/>
        <input type="submit" id="submit" style={{display: "none"}}/>
      </form>
      <div>
        <Button style={{width: "40%"}} onClick={uploadPhoto}>
          <InsertPhoto />
          <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
        </Button>
      </div>
      <Button
        style={{backgroundColor: "black", color: "white"}}
        variant="contained"
        className={classes.button}
        startIcon={<AddCircleOutline />}
        onClick={submit}>Create</Button>
    </div>
  </div>
}
