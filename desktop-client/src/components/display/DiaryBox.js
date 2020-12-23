import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function DiaryBox(props) {
  const classes = useStyles();
  return <div style={{
      width: "610px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999"}}>
    <div>
      <div style={{width: "100%", margin: "auto", textAlign: "left", padding: "5px", display: "flex"}}>
      <div className={classes.root}>
        <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
      </div>
        <p style={{bottom: "0", fontFamily: "roboto", fontWeight: "700"}}>Dennis Willie</p>
      </div>
    </div>
    <div style={{padding: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      This is diary post. This type of post consists of the writer's experience with the movie. It can be a sad experience,
      happy, or whatever kinds of experience that the user may have.
    </div>
    <img style={{width: "100%", height: "30em"}} src={process.env.PUBLIC_URL + '/images/clapperboard.png'} />
  </div>
}
