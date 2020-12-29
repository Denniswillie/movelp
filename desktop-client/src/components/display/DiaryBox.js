import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    marginLeft: "421px"
  },
}));

export default function DiaryBox(props) {
  const classes = useStyles();
  const commentField = useRef(null);
  const form = useRef(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const ac = new AbortController();

    const formData = new FormData();
    formData.append('postId', props._id);
    fetch('/comment/get', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => setComments(res))
        .catch(err => console.log(err));

    return () => ac.abort();
  }, []);

  function constructGalleryUrls(urls) {
    return urls.map(url => {
      return {original: url};
    })
  }

  function focusCommentField() {
    commentField.current.focus();
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if (commentInput.length !== 0) {
      const formData = new FormData(form.current);
      formData.append('postId', props._id);
      await setCommentInput("");
      fetch('/comment/create', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(createdComment => {
            setComments(prevData => {
              return [...prevData, createdComment];
            })
          })
          .catch(err => console.log(err));
    }
  }

  function handleCommentInputChange(event) {
    setCommentInput(event.target.value);
  }

  function handleToggleLike() {
    console.log('toggleLike');
    const formData = new FormData();
    formData.append('postId', props._id);
    fetch('/post/toggleLike', {method: 'POST', body: formData});
  }

  function handleEditComment(event) {
    event.preventDefault();
    console.log(event);
  }

  return <div style={{
      width: "610px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1em",
      marginBottom: "1em",
      borderRadius: "5px",
      boxShadow: "0 0 2px #999"}}>
    <div>
      <div style={{width: "100%", margin: "auto", textAlign: "left", padding: "5px", display: "flex"}}>
        <Button
          style={{backgroundColor: "black", color: "white"}}
          variant="contained"
          className={classes.button}
          startIcon={<MovieIcon />}>Related movies</Button>
        <div className={classes.root}>
          <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
        </div>
        <p style={{bottom: "0", fontFamily: "roboto", fontWeight: "700"}}>{props.creatorName}</p>
      </div>
    </div>
    <div style={{paddingLeft: "1em", paddingRight: "1em", textAlign: "justify", fontFamily: "roboto", fontWeight: "700"}}>
      {props.title}
    </div>
    <div style={{padding: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      {props.text}
    </div>
    {props.urls.length > 0 && <ImageGallery items={constructGalleryUrls(props.urls)} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: "wrap",
      padding: "10px",
    }}>
      <IconButton>
        {props.liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
      </IconButton>
      <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{props.noOfLikes}</span>
      <IconButton style={{marginLeft: "20px"}}>
      <CommentIcon />
      </IconButton>
      <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{props.noOfComments}</span>
    </div>
    <div style={{padding: "5px"}}>
    <div style={{borderTop: "1px solid #9ba89e", paddingTop: "5px", paddingBottom: "5px"}}>
      <Button style={{width: "30%"}} onClick={handleToggleLike}>
        <ThumbUpAltOutlinedIcon />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Like</p>
      </Button>
      <Button style={{width: "30%"}} onClick={focusCommentField}>
        <ChatBubbleOutlineOutlinedIcon />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Comment</p>
      </Button>
      <Button style={{width: "30%"}} onClick={() => {
        props.handleEditClick({
          _id: props._id,
          type: props.type,
          text: props.text,
          title: props.title,
          urls: props.urls,
          movieIds: props.movieIds,
          fileIds: props.fileIds
        })
      }}>
        <EditOutlinedIcon />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Edit</p>
      </Button>
    </div>
    <div style={{borderTop: "1px solid #9ba89e", padding: "10px"}}>
      {comments.map(comment => {
        return <div style={{width: "100%", marginBottom: "1em", textAlign: "left", display: "flex"}}>
          <div className={classes.root}>
            <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
          </div>
          <div style={{backgroundColor: "#F0F2F5", paddingLeft: "10px", paddingRight: "10px", borderRadius: "15px"}}>
            <p style={{bottom: "0", fontFamily: "roboto", fontSize: "0.9em", fontWeight: "700", marginBottom: "0", width: "100%"}}>{comment.creatorName}</p>
            <p style={{marginTop: "0", fontFamily: "roboto", fontSize: "0.7em"}}>41m</p>
            <p style={{bottom: "0", fontFamily: "roboto", fontSize: "0.9em", marginTop: "0"}}>{comment.text}</p>
          </div>
        </div>
      })}
    <form ref={form} className={classes.root} noValidate autoComplete="off" style={{width: "100%"}} onSubmit={handleCommentSubmit}>
      <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
      <TextField
        inputRef={commentField}
        label="Write a comment..."
        variant="outlined"
        name="text"
        value={commentInput}
        onChange={handleCommentInputChange}
        style={{margin: "auto", width: "90%"}}/>
    </form>
    </div>
    </div>
  </div>
}
