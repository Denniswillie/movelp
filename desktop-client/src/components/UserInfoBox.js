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

export default function UserInfoBox() {
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
      <div style={{width: "100%", margin: "auto", textAlign: "left", padding: "5px", display: "flex"}}>
        <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/clapperboard.jpg'} className={classes.large} />
        <div style={{marginLeft: "2em", marginTop: "1em"}}>
          <h1 style={{fontFamily: "roboto", fontWeight: "normal", marginBottom: "0.2em"}}>{"Dennis Ganteng".toUpperCase()}</h1>
          <div style={{marginTop: "0", textAlign: "left", padding: "5px", display: "flex"}}>
            <p style={{marginTop: "0", fontFamily: "roboto"}}><b>6</b> posts</p>
            <p style={{marginTop: "0", fontFamily: "roboto", marginLeft: "1em"}}><b>6</b> Followers</p>
            <p style={{marginTop: "0", fontFamily: "roboto", marginLeft: "1em"}}><b>6</b> Following</p>
          </div>
        </div>
        <div style={{marginTop: "1em", marginLeft: "30em", position: "absolute"}}>
          <div style={{display: "flex"}}>
            <Button
              style={{backgroundColor: "black", color: "white"}}
              variant="contained"
              className={classes.button}>Edit Profile</Button>
            <IconButton style={{marginLeft: "1em"}}>
              <SettingsIcon />
            </IconButton>
          </div>
        </div>
      </div>
  </div>
}
