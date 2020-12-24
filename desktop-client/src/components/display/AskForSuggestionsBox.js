import React, {useState, useEffect} from 'react';
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

export default function AskForSuggestionsBox(props) {
  const classes = useStyles();

  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    const newUrls = [];
    props.urls.map(url => {
      newUrls.push({
        original: url
      })
    })
    setUrls(newUrls);
    return () => ac.abort();
  }, []);

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
        <div className={classes.root}>
          <Avatar src={process.env.PUBLIC_URL + '/images/loginImage.png'} />
        </div>
        <p style={{bottom: "0", fontFamily: "roboto", fontWeight: "700"}}>Dennis Willie</p>
      </div>
    </div>
    <div style={{padding: "1em", textAlign: "justify", fontFamily: "roboto"}}>
      {props.text}
    </div>
    {urls.length > 0 && <ImageGallery items={urls} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: "wrap",
      padding: "10px",
    }}>
      <IconButton>
      <ThumbUpAltIcon />
      </IconButton>
      <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{props.noOfLikes}</span>
      <IconButton style={{marginLeft: "20px"}}>
      <CommentIcon/>
      </IconButton>
      <span style={{fontFamily: "roboto", marginLeft: "4px"}}>{props.noOfComments}</span>
    </div>
    <div style={{padding: "5px"}}>
    <div style={{borderTop: "1px solid #9ba89e", paddingTop: "5px"}}>
    <Button style={{width: "30%"}}>
      <ThumbUpAltOutlinedIcon />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Like</p>
    </Button>
    <Button style={{width: "30%"}}>
      <ChatBubbleOutlineOutlinedIcon />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Comment</p>
    </Button>
    <Button style={{width: "30%"}}>
      <EditOutlinedIcon />
      <p style={{fontFamily: 'Roboto', marginLeft: "6px"}}>Edit</p>
    </Button>
    </div>
    </div>
  </div>
}
