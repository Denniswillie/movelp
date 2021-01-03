import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    marginLeft: "400px"
  },
}));

export default function RecommendationBox(props) {
  const classes = useStyles();
  const commentField = useRef(null);
  const form = useRef(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [movieTitle, setMovieTitle] = useState("MOVIE TITLE");
  const [data, setData] = useState({
    isLiked: props.liked,
    editedCommentId: null,
    noOfLikes: props.post.noOfLikes,
    noOfComments: props.post.noOfComments
  })

  useEffect(() => {
    const ac = new AbortController();

    async function fetchData() {
      const formData = new FormData();
      formData.append('postId', props.post._id);
      const movieDataRaw = await fetch("https://api.themoviedb.org/3/movie/" + props.post.movieIds[0] + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
      if (movieDataRaw !== false) {
        const movieData = await movieDataRaw.json();
        const title = movieData.title ? movieData.title : movieData.name;
        await setMovieTitle(title);
      }

      fetch('/comment/get', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(res => setComments(res))
          .catch(err => console.log(err));
    }
    fetchData();

    return () => ac.abort();
  }, [props.post._id, props.post.movieIds]);

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
      formData.append('postId', props.post._id);
      await setCommentInput("");
      fetch('/comment/create', {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(createdComment => {
            setComments(prevData => {
              return [...prevData, createdComment];
            });
            setData(prevData => {
              return {...prevData, noOfComments: prevData.noOfComments + 1};
            })
          })
          .catch(err => console.log(err));
    }
  }

  function handleCommentInputChange(event) {
    setCommentInput(event.target.value);
  }

  function handleToggleLike() {
    setData(prevData => {
      return {
        ...prevData,
        isLiked: !prevData.isLiked,
        noOfLikes: prevData.isLiked ? prevData.noOfLikes - 1 : prevData.noOfLikes + 1
      };
    });
    const formData = new FormData();
    formData.append('postId', props.post._id);
    fetch('/post/toggleLike', {method: 'POST', body: formData});
  }

  function handleEditCommentClick(commentId) {
    setData(prevData => {
      return {...prevData, editedCommentId: commentId};
    })
  }

  function handleEditCommentUnclick() {
    setData(prevData => {
      return {...prevData, editedCommentId: null};
    })
  }

  function handleDeleteComment(commentId) {
    setComments(prevData => {
      return prevData.filter(data => {
        return data._id !== commentId;
      });
    });
    setData(prevData => {
      return {...prevData, noOfComments: prevData.noOfComments - 1};
    })
    const formData = new FormData();
    formData.append('commentId', commentId);
    fetch('/comment/delete', {method: 'POST', body: formData});
  }

  function navigateToMovie() {
    if (props.post.movieIds > 0) {
      window.open("/movie/" + props.post.movieIds[0], "_self");
    }
  }

  function navigateToCreator() {
    window.open("/profile/" + props.post.creatorId, "_self");
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
          onClick={navigateToMovie}
          style={{backgroundColor: "black", color: "white"}}
          variant="contained"
          className={classes.button}
          startIcon={<NavigateNextOutlinedIcon />}>Navigate to movie</Button>
          <div className={classes.root}>
            <Avatar
              src={props.creatorProfileImageUrl ? props.creatorProfileImageUrl : process.env.PUBLIC_URL + '/images/loginImage.png'}
              style={{cursor: "pointer"}}
              onClick={navigateToCreator}/>
          </div>
        <p style={{bottom: "0", fontFamily: "roboto", fontWeight: "700"}}>{props.post.creatorName}</p>
      </div>
    </div>
    <div style={{paddingLeft: "1em", paddingRight: "1em", textAlign: "justify", fontFamily: "roboto", fontWeight: "700", wordWrap: "break-word"}}>
      {movieTitle}
    </div>
    <div style={{paddingTop: "1em", paddingLeft: "1em", paddingRight: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      {[...Array(props.post.rating).keys()].map(count => {
        return <StarOutlinedIcon key={count}/>
      })}
    </div>
    <div style={{padding: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      {props.post.text}
    </div>
    {props.urls.length > 0 && <ImageGallery items={constructGalleryUrls(props.urls)} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: "wrap",
      padding: "10px",
    }}>
    <IconButton>
      {data.isLiked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
    </IconButton>
    <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{data.noOfLikes}</span>
    <IconButton style={{marginLeft: "20px"}}>
    <CommentIcon />
    </IconButton>
    <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{data.noOfComments}</span>
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
    {props.post.creatorId === props.userId && <Button style={{width: "30%"}} onClick={() => {
      props.handleEditClick({
        post: props.post,
        urls: props.urls
      })
    }}>
      <EditOutlinedIcon />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Edit</p>
    </Button>}
  </div>
  <div style={{borderTop: "1px solid #9ba89e", padding: "10px"}}>
    {comments.map(comment => {
      return <Comment
        key={comment._id}
        text={comment.text}
        creatorName={comment.creatorName}
        _id={comment._id}
        isCreatedByUser={props.userId === comment.creatorId}
        editedCommentId={data.editedCommentId}
        handleEditCommentClick={handleEditCommentClick}
        handleEditCommentUnclick={handleEditCommentUnclick}
        handleDeleteComment={handleDeleteComment}/>
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
