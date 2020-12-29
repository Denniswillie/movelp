import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import Button from '@material-ui/core/Button';

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

export default function UserInfoForm() {
  const classes = useStyles();
  const [nickname, setNickname] = useState("");
  const [regexAlert, setRegexAlert] = useState(false);
  const [nicknameExistsAlert, setNicknameExistsAlert] = useState(false);

  function handleNicknameChange(event) {
    setNickname(prevData => {
      if (event.target.value.length > 30) {
        return event.target.value.slice(0,30);
      }
      return event.target.value;
    });
  }

  function submit() {
    document.getElementById('submit').click();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNicknameExistsAlert(false);
    if (nickname.length == 0) {
      return;
    }
    var re = /^\w+$/;
    if (!re.test(nickname)) {
      setRegexAlert(true);
    } else {
      const formData = new FormData();
      formData.append('nickname', nickname);
      fetch('/user/nickname', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(nicknameExists => {
            console.log(nicknameExists);
            if (nicknameExists) {
              setNicknameExistsAlert(true);
            } else {
              window.location.href = "/";
            }
          });
    }
  }

  return <div style={{margin: "auto", textAlign: "center", marginTop: "12em"}}>
    <div style={{
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        borderRadius: "5px",
        boxShadow: "0 0 20px #999",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "2em",
        overflow: "auto"}}>
        <h1 style={{userSelect: "none"}}>Movelp</h1>
        <p style={{fontFamily: 'roboto'}}>CREATE A NICKNAME</p>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            style={{width: "90%"}}/>
          {regexAlert && <p style={{color: 'red', margin: 'auto', fontFamily: 'roboto'}}>Nicknames can only use letters, numbers, and underscores.</p>}
          {nicknameExistsAlert && <p style={{color: 'red', margin: 'auto', fontFamily: 'roboto'}}>This nickname isn't available. Please try another.</p>}
          <Button
            style={{backgroundColor: "black", color: "white", marginTop: "3em"}}
            variant="contained"
            className={classes.button}
            onClick={submit}>submit</Button>
          <input style={{display: "none"}} type="submit" id="submit"/>
        </form>
    </div>
  </div>
}
