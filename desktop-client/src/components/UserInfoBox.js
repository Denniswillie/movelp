import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export default function UserInfoBox(props) {
  const classes = useStyles();

  return <div style={{
      width: "700px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999",
      paddingRight: "5px",
      paddingLeft: "1em",
      paddingTop: "1em",
      paddingBottom: "1em"}}>
      <div style={{width: "100%", margin: "auto", textAlign: "left", padding: "5px", display: "flex", position: "relative"}}>
        <Avatar
          style={{borderStyle: "solid", borderColor: "#F0F2F5", borderWidth: "2px"}}
          alt={props.user.nickname}
          src={props.creator.profileImageUrl ? props.creator.profileImageUrl : process.env.PUBLIC_URL + '/images/loginImage.png'}
          className={classes.large} />
        <div style={{marginLeft: "2em", marginTop: "1em"}}>
          <h1 style={{fontFamily: "roboto", fontWeight: "normal", marginBottom: "0.2em"}}>{props.creator.nickname.toUpperCase()}</h1>
          <div style={{marginTop: "0", textAlign: "left", padding: "5px", display: "flex"}}>
            <p style={{marginTop: "0", fontFamily: "roboto"}}><b>{props.creator.numOfPosts}</b> posts</p>
          </div>
        </div>
        {props.user._id === props.creatorId && <div style={{top: "0", right: "15px", position: "absolute"}}>
            <Button
              onClick={props.displayUserInfoForm}
              style={{backgroundColor: "black", color: "white"}}
              variant="contained"
              className={classes.button}>Edit Profile</Button>
        </div>}
      </div>
  </div>
}
