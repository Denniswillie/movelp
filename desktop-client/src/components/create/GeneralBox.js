import React from 'react';
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

export default function GeneralBox(props) {
  const classes = useStyles();

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  return <div>
    <form className={classes.root} noValidate autoComplete="off" method="POST" action="/post/create/general" encType="multipart/form-data">
      <TextField multiline label="Create a general post" rows={7} variant="outlined" style={{width: "90%"}} name="text"/>
      {props.chosenMoviesIds.map(chosenMovieId => {
        return <input type="hidden" name="chosenMoviesIds[]" value={chosenMovieId}/>
      })}
      <input type="file" id="imageUpload" name="fileInput" style={{display: "none"}} multiple/>
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
}
