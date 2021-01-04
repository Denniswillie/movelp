import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Theaters from '@material-ui/icons/Theaters';
import Movie from '@material-ui/icons/Movie';
import LiveTv from '@material-ui/icons/LiveTv';
import Button from '@material-ui/core/Button';
import PostTypeContext from '../PostTypeContext';
import {
  isBrowser,
  isMobile
} from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateBox(props) {
  const PostType = useContext(PostTypeContext);
  const classes = useStyles();
  return <div style={{
      width: isBrowser ? "600px" : "100%",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999",
      padding: "5px"}}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField name={PostType.GENERAL} id={PostType.GENERAL} label="Create a general post" variant="outlined" style={{width: "70%"}} onClick={props.handleClick}/>
    </form>
    <div style={{borderTop: "1px solid #9ba89e", paddingTop: "5px", width: "100%"}}>
    <Button style={{width: isBrowser ? "30%" : "50%"}} name={PostType.DIARY} onClick={props.handleClick}>
      {isBrowser && <Theaters style={{pointerEvents: "none"}}/>}
      <p style={{fontFamily: 'Roboto', marginLeft: isBrowser ? "6px" : "1px"}} id={PostType.DIARY}>Diary</p>
    </Button>
    <Button style={{width: isBrowser ? "30%" : "50%"}} name={PostType.RECOMMENDATION} onClick={props.handleClick}>
      {isBrowser && <Movie style={{pointerEvents: "none"}}/>}
      <p style={{fontFamily: 'Roboto', marginLeft: isBrowser ? "6px" : "3px"}} id={PostType.RECOMMENDATION}>Recommendation</p>
    </Button>
    {isBrowser && <Button style={{width: "30%"}} name={PostType.ASK_SUGGESTION} onClick={props.handleClick}>
      <LiveTv style={{pointerEvents: "none"}}/>
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}} id={PostType.ASK_SUGGESTION}>Ask Suggestion</p>
    </Button>}
    </div>
  </div>
}
