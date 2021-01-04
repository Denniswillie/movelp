import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {
  isBrowser,
  isMobile
} from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  buttonBrowser: {
    margin: theme.spacing(1),
    position: "absolute",
    top: "0",
    right: "0"
  },
}));

export default function UserInfoBox(props) {
  const classes = useStyles();

  return <div style={{
      width: isBrowser ? "700px" : "100%",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999",
      paddingLeft: "1em",
      paddingBottom: "1em"}}>
      <div style={{width: "100%", margin: "auto", textAlign: "left", display: "flex", position: "relative"}}>
        <Avatar
          style={{borderStyle: "solid", borderColor: "#F0F2F5", borderWidth: "2px", marginTop: "10px"}}
          alt={props.user.nickname}
          src={props.creator.profileImageUrl ? props.creator.profileImageUrl : process.env.PUBLIC_URL + '/images/loginImage.png'}
          className={isBrowser ? classes.large : classes.small} />
        <div style={{marginLeft: "2em", marginTop: "1em"}}>
          {isBrowser ?
          <h1 style={{fontFamily: "roboto", fontWeight: "normal", marginBottom: "0.2em"}}>{props.creator.nickname.toUpperCase()}</h1> :
          <h3 style={{fontFamily: "roboto", fontWeight: "normal", marginBottom: "0.2em"}}>{props.creator.nickname.toUpperCase()}</h3>}
          <div style={{marginTop: "0", textAlign: "left", padding: "5px", display: "flex"}}>
            <p style={{marginTop: "0", fontFamily: "roboto"}}><b>{props.creator.numOfPosts}</b> posts</p>
          </div>
        </div>
        {props.user._id === props.creator._id && <div style={{position: "absolute", width: "100%"}}>
            <Button
              onClick={props.displayUserInfoForm}
              style={{backgroundColor: "black", color: "white"}}
              variant="contained"
              className={classes.buttonBrowser}>Edit Profile</Button>
        </div>}
      </div>
  </div>
}
