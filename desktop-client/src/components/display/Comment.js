import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  const VISIBLE = "visible";
  const HIDDEN = "hidden";
  const [buttonsVisibility, setButtonsVisibility] = useState(HIDDEN);
  const [text, setText] = useState(props.text);
  const [editedText, setEditedText] = useState(text);
  const editForm = useRef(null);

  function displayButtons() {
    if (props.isCreatedByUser) {
      setButtonsVisibility(VISIBLE);
    }
  }

  function hideButtons() {
    setButtonsVisibility(HIDDEN);
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    if (editedText.trim().length > 0) {
      props.handleEditCommentUnclick();
      setText(editedText);
      const formData = new FormData(editForm.current);
      formData.append("commentId", props._id);
      fetch('/comment/edit', {method: "POST", body: formData});
    }
  }

  function handleEditedTextChange(event) {
    setEditedText(event.target.value);
  }

  function renderTime() {
    const today = new Date(parseInt(Date.parse(props.timeOfCreation), 10));
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  return <div style={{marginBottom: "1em", textAlign: "left", display: "flex"}} onMouseOver={displayButtons} onMouseOut={hideButtons}>
    <div className={classes.root}>
      <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
    </div>
    <div style={{backgroundColor: "#F0F2F5", paddingLeft: "10px", paddingRight: "10px", borderRadius: "15px",  wordWrap: "break-word", maxWidth: "70%"}}>
      <p style={{bottom: "0", fontFamily: "roboto", fontSize: "0.9em", fontWeight: "700", marginBottom: "0", width: "100%"}}>{props.creatorName}</p>
      <p style={{marginTop: "0", fontFamily: "roboto", fontSize: "0.7em"}}>{renderTime()}</p>
      {props.editedCommentId === props._id ? <form onSubmit={handleEditSubmit} ref={editForm}>
        <TextField
          style={{marginBottom: "1em", width: "100%"}}
          value={editedText}
          onChange={handleEditedTextChange}
          name="text"/>
        <input type="file" style={{display: "none"}}/>
      </form> : <p style={{bottom: "0", fontFamily: "roboto", fontSize: "0.9em", marginTop: "0",  wordWrap: "break-word"}}>{text}</p>}
    </div>
    <div style={{visibility: buttonsVisibility}}>
      {props.editedCommentId === props._id && <IconButton onClick={props.handleEditCommentUnclick}>
        <CancelIcon />
      </IconButton>}
      <IconButton onClick={() => {
        props.handleEditCommentClick(props._id);
      }}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => {
        props.handleDeleteComment(props._id);
      }}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  </div>
}
