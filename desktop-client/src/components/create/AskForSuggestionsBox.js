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
  const [selectAll, setSelectAll] = useState(false);
  const ASK_SUGGESTION = 'asksuggestion';

  const {
    createInput,
    deletedExistingFiles,
    handlePostAction,
    post,
    isEditing,
    handleInputChange
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
    [selectAll]
  );

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  function deletePost() {
    const formData = new FormData();
    formData.set('postId', post._id);
    formData.set('fileIds', post.fileIds);
    fetch('/post/delete', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          if (res) {
            handleInputChange.handleDeletePost(post._id);
          }
        })
  }

  function handleSubmit(event) {
    if (isEditing) {
      event.preventDefault();
      const formData = new FormData(form.current);
      formData.set('postId', post._id);
      formData.set('postType', ASK_SUGGESTION);
      for (var i = 0; i < deletedExistingFiles.length; i++) {
        formData.append('deletedFileIds[]', deletedExistingFiles[i]);
      }
      for (var i = 0; i < createInput.uploadedFiles.length; i++) {
        if (createInput.uploadedFiles[i].file) {
          formData.append('fileInput[]', createInput.uploadedFiles[i].file);
        } else {
          formData.append('fileInput[]', createInput.uploadedFiles[i].fileId);
        }
      }
      fetch('/post/edit', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          handlePostAction.handleEditPost(res);
        })
        .catch(err => console.log(err));
    } else {
      event.preventDefault();
      const formData = new FormData(form.current);
      for (var i = 0; i < createInput.uploadedFiles.length; i++) {
        formData.append('fileInput[]', createInput.uploadedFiles[i].file);
      }
      fetch('/post/create/asksuggestion', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(res => handlePostAction.handleAddPost(res))
          .catch(err => console.log(err));
    }
  }

  return <div>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} ref={form}>
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
      <Gallery photos={createInput.uploadedFiles} renderImage={imageRenderer} />
      <IconButton onClick={handleInputChange.handleDeleteChosenFiles}>
      <DeleteOutlinedIcon />
      </IconButton>
      </div>}
    <Button style={{width: "40%"}} onClick={uploadPhoto}>
      <InsertPhoto />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Upload Photo</p>
    </Button>
    </div>
    <Button
      style={{backgroundColor: "black", color: "white"}}
      variant="contained"
      className={classes.button}
      startIcon={<AddCircleOutline />}
      onClick={submit}>{props.isEditing ? "edit" : "create"}</Button>
    {props.isEditing && <Button
      style={{backgroundColor: "black", color: "white"}}
      variant="contained"
      className={classes.button}
      startIcon={<DeleteOutlinedIcon />}
      onClick={deletePost}>Delete post</Button>}
  </div>
}
