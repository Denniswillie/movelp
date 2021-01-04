import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import {useRef, useCallback, useState} from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from "../SelectedImage";

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

export default function AskForSuggestionsBox(props) {
  const classes = useStyles();
  const form = useRef(null);
  const [selectAll] = useState(false);
  const ASK_SUGGESTION = 'asksuggestion';

  const {
    createInput,
    deletedExistingFiles,
    handlePostAction,
    post,
    isEditing,
    handleInputChange,
    photoGalleryStylings,
    handleSubmit,
    deletePost,
    formRef
  } = props.renderProps;

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        handleChooseToDeleteFile={handleInputChange.handleChooseToDeleteFile}
        handleChooseNotToDeleteFile={handleInputChange.handleChooseNotToDeleteFile}
      />
    ),
    [selectAll, handleInputChange.handleChooseToDeleteFile, handleInputChange.handleChooseNotToDeleteFile]
  );

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  return <div>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
      <TextField
        multiline
        label="Ask for movie recommendations"
        rows={12}
        variant="outlined"
        style={{width: "90%"}}
        name="text"
        value={createInput.text}
        onChange={handleInputChange.handleTextChange}/>
        <input
          type="file"
          id="imageUpload"
          style={{display: "none"}}
          onChange={handleInputChange.handleUploadedFilesChange}/>
        <input type="submit" id="submit" style={{display: "none"}}/>
    </form>
    <div>
      {createInput.uploadedFiles.length > 0 && <div style={{
        padding: "10px",
      }}>
      <div style={createInput.uploadedFiles.length <= 1 ? photoGalleryStylings[0] : photoGalleryStylings[1]}>
        <Gallery photos={createInput.uploadedFiles} renderImage={imageRenderer} />
      </div>
      <IconButton onClick={handleInputChange.handleDeleteChosenFiles}>
      <DeleteOutlinedIcon />
      </IconButton>
      </div>}
      {createInput.uploadedFiles.length < 4 ? <Button style={{width: "40%"}} onClick={uploadPhoto}>
        <InsertPhoto />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
      </Button> : <p style={{fontFamily: "roboto"}}>You can only choose up to 4 files.</p>}
    </div>
    <Button
      style={{backgroundColor: "black", color: "white"}}
      variant="contained"
      className={classes.button}
      startIcon={<AddCircleOutline />}
      onClick={submit}>{isEditing ? "edit" : "create"}</Button>
    {isEditing && <Button
      style={{backgroundColor: "black", color: "white"}}
      variant="contained"
      className={classes.button}
      startIcon={<DeleteOutlinedIcon />}
      onClick={deletePost}>Delete post</Button>}
  </div>
}
