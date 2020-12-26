import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import {useRef} from 'react';
import PhotoGallery from 'react-photo-gallery';

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
  movieTags: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function DiaryBox(props) {
  const classes = useStyles();

  const imageGallery = useRef(null);
  const form = useRef(null);

  function uploadPhoto() {
    document.getElementById("imageUpload").click();
  }

  function submit() {
    document.getElementById("submit").click();
  }

  function deletePost() {
    const formData = new FormData();
    formData.set('postId', props.data._id);
    fetch('/post/delete', {method: 'POST', body: formData});
  }

  function handleSubmit(event) {
    if (props.isEditing) {
      event.preventDefault();
      const formData = new FormData(form.current);
      formData.set('postId', props.data._id);
      formData.set('postType', 'diary')
      fetch('/post/edit', {method: 'POST', body: formData});
    } else {
      event.preventDefault();
      const formData = new FormData(form.current);
      for (var i = 0; i < props.uploadedFiles.length; i++) {
        formData.append('fileInput[]', props.uploadedFiles[i].file);
      }
      fetch('/post/create/diary', {method: 'POST', body: formData});
    }
  }

  function getCurrentIndex() {
    console.log(imageGallery.current.getCurrentIndex());
  }

  return <div>
    <div id = "createDiaryForm">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} ref={form}>
        {props.chosenMovies.length > 0 && <p style={{fontFamily: "roboto", marginLeft: "auto", marginRight: "auto", marginTop: "8px"}}>Movie titles</p>}
        {props.chosenMovies.length > 0 && <div
          className={classes.movieTags}
          style={{boxShadow: "1px",
            borderRadius: "4px",
            borderStyle: "solid",
            borderColor:"#b5b5b5" ,
            borderWidth: "1px",
            width: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "9px"}}>
        {props.chosenMovies.map(chosenMovie => {
          return <Chip
            label={chosenMovie.title}
            onDelete={() => {props.handleDeleteChosenMovie(chosenMovie.id)}}
          />
        })}
        </div>}
        <TextField
          label="Diary Title"
          variant="outlined"
          name="title"
          style={{width: "90%"}}
          value={props.diaryTitle}
          onChange={props.handleDiaryTitleChange}
          required={true}/>
        <TextField
          multiline
          label="Share your story"
          rows={4}
          name="text"
          variant="outlined"
          style={{width: "90%"}}
          value={props.text}
          onChange={props.handleTextChange}/>
        {props.chosenMovies.map(chosenMovie => {
          return <input type="hidden" name="chosenMoviesIds[]" value={chosenMovie.id}/>
        })}
        <input
          type="file"
          id="imageUpload"
          style={{display: "none"}}
          multiple
          onChange={props.handleUploadedFilesChange}/>
        <input type="submit" id="submit" style={{display: "none"}}/>
      </form>
      <div>

      {props.uploadedFiles.length > 0 && <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: "wrap",
        padding: "10px",
      }}>
      <div style={{width: "50%", margin: "auto"}}>
        <ImageGallery
          items={props.uploadedFiles}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          showNav={false}
          autoPlay={false}
          infinite={false}
          showBullets={true}
          ref={imageGallery}/>
      </div>
      <IconButton onClick={getCurrentIndex}>
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
  </div>
}
