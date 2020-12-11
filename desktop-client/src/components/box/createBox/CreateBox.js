import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Theaters from '@material-ui/icons/Theaters';
import Movie from '@material-ui/icons/Movie';
import LiveTv from '@material-ui/icons/LiveTv';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateBox() {
  const classes = useStyles();
  return <div style={{
      width: "600px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999",
      padding: "5px"}}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Create a general post" variant="outlined" style={{width: "70%"}}/>
    </form>
    <div style={{borderTop: "1px solid #9ba89e", paddingTop: "5px"}}>
    <Button style={{width: "30%"}}>
      <Theaters />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Diary</p>
    </Button>
    <Button style={{width: "30%"}}>
      <Movie />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Recommendation</p>
    </Button>
    <Button style={{width: "30%"}}>
      <LiveTv />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Ask Suggestion</p>
    </Button>
    </div>
  </div>
}
