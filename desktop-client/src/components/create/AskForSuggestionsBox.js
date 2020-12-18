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

export default function AskForSuggestionBox(props) {
  const classes = useStyles();
  return <div>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField multiline label="Ask for movie recommendations" rows={12} variant="outlined" style={{width: "90%"}}/>
    </form>
    <div>
    <Button style={{width: "40%"}}>
      <InsertPhoto />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
    </Button>
    </div>
    <Button style={{backgroundColor: "black", color: "white"}} variant="contained" className={classes.button} startIcon={<AddCircleOutline />}>Create</Button>
  </div>
}
