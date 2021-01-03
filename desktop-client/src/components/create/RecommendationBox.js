import {useRef, useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Gallery from 'react-photo-gallery';
import SelectedImage from "../SelectedImage";
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ratings = [
  {
    value: '1',
    label: '1 (Very Bad)',
  },
  {
    value: '2',
    label: '2 (Bad)',
  },
  {
    value: '3',
    label: '3 (Average)',
  },
  {
    value: '4',
    label: '4 (Good)',
  },
  {
    value: '5',
    label: '5 (Very Good)',
  },
];

export default function RecommendationBox(props) {
  const classes = useStyles();
  const form = useRef(null);
  const [selectAll] = useState(false);
  const RECOMMENDATION = 'recommendation';

  const {
    createInput,
    deletedExistingFiles,
    handlePostAction,
    post,
    isEditing,
    handleInputChange,
    photoGalleryStylings
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

  function deletePost() {
    const formData = new FormData();
    formData.set('postId', post._id);
    formData.set('fileIds', post.fileIds);
    fetch('/post/delete', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          if (res) {
            handlePostAction.handleDeletePost(post._id);
          }
        })
  }

  function handleSubmit(event) {
    if (isEditing) {
      event.preventDefault();
      handlePostAction.setLoading(true);
      const formData = new FormData(form.current);
      formData.set('postId', post._id);
      formData.set('postType', RECOMMENDATION);
      for (var i = 0; i < deletedExistingFiles.length; i++) {
        formData.append('deletedFileIds[]', deletedExistingFiles[i]);
      }
      for (var j = 0; j < createInput.uploadedFiles.length; j++) {
        if (createInput.uploadedFiles[j].file) {
          formData.append('fileInput[]', createInput.uploadedFiles[j].file);
        } else {
          formData.append('fileInput[]', createInput.uploadedFiles[j].fileId);
        }
      }
      fetch('/post/edit', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          handlePostAction.handleEditPost(res);
          handlePostAction.setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      event.preventDefault();
      handlePostAction.setLoading(true);
      const formData = new FormData(form.current);
      for (var k = 0; k < createInput.uploadedFiles.length; k++) {
        formData.append('fileInput[]', createInput.uploadedFiles[k].file);
      }
      fetch('/post/create/recommendation', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(res => {
            handlePostAction.handleAddPost(res);
            handlePostAction.setLoading(false);
          })
          .catch(err => console.log(err));
    }
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} ref={form}>
        {createInput.chosenMovies.length > 0 && <p style={{fontFamily: "roboto", marginLeft: "auto", marginRight: "auto", marginTop: "8px"}}>Movie titles</p>}
        {createInput.chosenMovies.length > 0 && <div
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
        {createInput.chosenMovies.map(chosenMovie => {
          return <Chip
            key={chosenMovie.id}
            label={chosenMovie.title}
            onDelete={() => {handleInputChange.handleDeleteChosenMovie(chosenMovie.id)}}
          />
        })}
        </div>}
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Rate</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={createInput.rating}
            onChange={handleInputChange.handleRatingChange}
            label="Rating"
            style={{zIndex: "1000000000000000000000000000000"}}
            name="rating"
          >
            {ratings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          multiline
          label="Review for the movie"
          rows={3}
          variant="outlined"
          style={{width: "90%"}}
          name="text"
          value={createInput.text}
          onChange={handleInputChange.handleTextChange}/>
          {createInput.chosenMovies.map(chosenMovie => {
            return <input type="hidden" name="chosenMoviesIds[]" value={chosenMovie.id} key={chosenMovie.id}/>
          })}
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
  );
}
