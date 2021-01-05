import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Avatar from 'react-avatar-edit';
import ReactAvatar from '@material-ui/core/Avatar';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
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
  button: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export default function UserInfoForm(props) {
  const classes = useStyles();
  const [nickname, setNickname] = useState(props.user.nickname ? props.user.nickname : "");
  const [regexAlert, setRegexAlert] = useState(false);
  const [nicknameExistsAlert, setNicknameExistsAlert] = useState(false);
  const [imageUploadAlert, setImageUploadAlert] = useState(false);
  const [unableDeleteAccount, setUnableDeleteAccount] = useState(false);
  const [avatarData, setAvatarData] = useState({
    preview: null,
    src: null,
    file: null,
    currentExtension: null,
    originalFile: null
  });

  function onClose() {
    setAvatarData({preview: null, src: null, file: null, originalFile: null});
  }

  async function onCrop(preview) {
    setAvatarData(prevData => {
      return {...prevData, preview};
    })
    const currentExtension = avatarData.currentExtension;
    const file = await urltoFile(preview, 'userImage.' + currentExtension, 'image/' + currentExtension)
    setAvatarData(prevData => {
      return {...prevData, file: file};
    })
  }

  function onBeforeFileLoad(event) {
    const re = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    const file = event.target.files[0];
    if (file.size > 1000000000000000) {
      setImageUploadAlert(true);
      event.target.value = "";
    } else if (!re.test(file.name)) {
      setImageUploadAlert(true);
    } else {
      const separator = /(?:\.([^.]+))?$/;
      setAvatarData(prevData => {
        return {...prevData, currentExtension: separator.exec(file.name)[1], originalFile: file};
      })
    }
  }

  function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  function handleNicknameChange(event) {
    if (event.target.value.length > 30) {
      setNickname(event.target.value.slice(0, 30));
    } else {
      setNickname(event.target.value);
    }
  }

  function submit() {
    document.getElementById('submit').click();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (props.userInfoFormDisplayed && nickname === props.user.nickname) {
      props.undisplayUserInfoForm();
    }
    setNicknameExistsAlert(false);
    setImageUploadAlert(false);
    if (nickname.length === 0) {
      return;
    }
    var re = /^\w+$/;
    if (!re.test(nickname)) {
      setRegexAlert(true);
    } else {
      const formData = new FormData();
      formData.append('nickname', nickname);
      if (avatarData.file) {
        formData.append('userProfileImageCropped', avatarData.file);
        formData.append('userProfileImageOriginal', avatarData.originalFile);
      }
      if (props.userInfoFormDisplayed) {
        fetch('/user/editProfile', {method: 'POST', body: formData})
            .then(res => res.json())
            .catch(err => console.log(err))
            .then(nicknameExists => {
              if (nicknameExists === true) {
                setNicknameExistsAlert(true);
              } else {
                window.location.href = "/profile/" + props.user._id;
              }
            })
      } else {
        fetch('/user/createProfile', {method: 'POST', body: formData})
            .then(res => res.json())
            .catch(err => console.log(err))
            .then(nicknameExists => {
              if (nicknameExists) {
                setNicknameExistsAlert(true);
              } else {
                window.location.href = "/";
              }
            });
      }
    }
  }

  function deleteAccount() {
    fetch('/user/delete', {
      method: "POST"
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(isDeleted => {
      if (isDeleted) {
        window.open("/auth/logout", "_self");
      } else {
        setUnableDeleteAccount(true);
      }
    })
  }

  return <div style={{
        position: "absolute",
        zIndex: "9000000000000000000000000000000000000000",
        width: isBrowser ? "500px" : "90%",
        height: "590px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        top: "3em",
        bottom: "0",
        left: "0",
        right: "0",
        borderRadius: "5px",
        boxShadow: "0 0 20px #999",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "2em",
        overflow: "auto"}}>
        {props.userInfoFormDisplayed && <IconButton style={{top: "10px", right: "10px", position: "absolute", zIndex: "4000000000000000000000000"}} onClick={props.undisplayUserInfoForm}>
          <Clear/>
        </IconButton>}
        <h1 style={{userSelect: "none"}}>Movelp</h1>
        {(props.userInfoFormDisplayed && props.user.profileImageUrlCropped) && <ReactAvatar
            style={{borderStyle: "solid", borderColor: "#F0F2F5", borderWidth: "2px", margin: "auto"}}
            alt={props.user.nickname}
            src={props.user.profileImageUrlCropped ? props.user.profileImageUrlCropped : process.env.PUBLIC_URL + '/images/loginImage.png'}
            className={classes.large} />}
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

          <p style={{fontFamily: 'roboto', margin: "auto", marginTop: "2em"}}>UPLOAD A PROFILE PICTURE</p>
          {imageUploadAlert && <p style={{color: 'red', margin: 'auto', fontFamily: 'roboto'}}>Uploaded image doesn't match requirements.</p>}
          <div style={{marginLeft: "auto", marginRight: "auto", width: "60%"}}>
            <Avatar
              minCropRadius={80}
              width={300}
              height={250}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={avatarData.src}
            />
          </div>
          {avatarData.preview && <div style={{margin: "auto"}}><img src={avatarData.preview} alt="Preview" /></div>}
          {unableDeleteAccount && <p style={{color: 'red', margin: 'auto', fontFamily: 'roboto'}}>Unable to delete account.</p>}
          {props.userInfoFormDisplayed && <Button
            style={{backgroundColor: "black", color: "white", marginTop: "1em"}}
            variant="contained"
            className={classes.button}
            onClick={deleteAccount}>delete account</Button>}
          <Button
            style={{backgroundColor: "black", color: "white", marginTop: "1em"}}
            variant="contained"
            className={classes.button}
            onClick={submit}>{props.userInfoFormDisplayed ? "edit" : "submit"}</Button>
          <input style={{display: "none"}} type="submit" id="submit"/>
        </form>
    </div>
}
