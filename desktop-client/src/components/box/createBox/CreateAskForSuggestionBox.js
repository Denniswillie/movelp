import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
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

export default function CreateAskForSuggestionBox() {
  const classes = useStyles();
  return <div style={{
      width: "500px",
      height: "450px",
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
      zIndex: "100000000",
      position: "absolute",
      paddingLeft: "5px",
      paddingRight: "5px",
      paddingBottom: "3px"}}>
    <IconButton style={{position: "absolute", top: "10px", right: "10px"}}>
      <Clear/>
    </IconButton>
    <div>
      <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>General Post</p>
    </div>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField multiline="true" label="Ask for movie recommendations" rows={10} variant="outlined" style={{width: "90%"}}/>
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
