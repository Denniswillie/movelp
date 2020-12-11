import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateAskForSuggestionBox() {
  const classes = useStyles();
  return <div style={{
      width: "500px",
      height: "400px",
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
    <div>
      <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>General Post</p>
    </div>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField multiline="true" label="Create a general post" rows={10} variant="outlined" style={{width: "90%"}}/>
    </form>
    <Button style={{width: "40%"}}>
      <InsertPhoto />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
    </Button>
    <Button style={{width: "40%"}}>
      <LocalOffer />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Tag movies</p>
    </Button>
  </div>
}
