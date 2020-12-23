import React from 'react';
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

  const images = [];
  useEffect(() => {
    props.urls.map(url => {
      images.push({
        original: url,
        thumbnail: url,
      })
    })
  })

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
        <p style={{bottom: "0", fontFamily: "roboto", fontWeight: "700"}}>Dennis Willie</p>
      </div>
    </div>
    <div style={{padding: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      {props.text}
    </div>
    {images.length > 0 && <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: "wrap",
      padding: "10px"
    }}>
      <ThumbUpAltIcon />
      <span style={{fontFamily: "roboto", marginLeft: "6px"}}>{props.noOfLikes}</span>
      <CommentIcon style={{marginLeft: "20px"}}/>
      <span style={{fontFamily: "roboto", marginLeft: "6px"}}>{props.noOfComments}</span>
    </div>
    <div style={{padding: "5px"}}>
    <div style={{borderTop: "1px solid #9ba89e", paddingTop: "5px"}}>
      <Button style={{width: "30%"}} name="createDiaryButton" onClick={props.handleClick}>
        <ThumbUpAltOutlinedIcon />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}} id="createDiaryButton">Like</p>
      </Button>
      <Button style={{width: "30%"}} name="createRecommendationButton" onClick={props.handleClick}>
        <ChatBubbleOutlineOutlinedIcon />
        <p style={{fontFamily: 'Roboto', marginLeft: "6px"}} id="createRecommendationButton">Comment</p>
      </Button>
    </div>
    </div>
  </div>
}
