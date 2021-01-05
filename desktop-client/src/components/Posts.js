import {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateBox from './create/CreateBox';
import Container from './create/Container';
import DisplayDiaryBox from './display/DiaryBox';
import DisplayGeneralBox from './display/GeneralBox';
import DisplayRecommendationBox from './display/RecommendationBox';
import DisplayAskForSuggestionsBox from './display/AskForSuggestionsBox';
import PostTypeContext from './PostTypeContext';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Avatar from '@material-ui/core/Avatar';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/RingLoader";
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 13em;
  border-color: red;
`;

const overridePaginate = css`
  display: block;
  margin: auto;
  margin-top: 2em;
  margin-bottom: 3em;
  border-color: red;
`;

export default function Posts(props) {
  const PostType = useContext(PostTypeContext);
  const PostsFetchType = useContext(PostsFetchTypeContext);

  const [isDisplayingLikers, setDisplayingLikers] = useState(false);
  const [likersData, setLikersData] = useState();
  const [loading, setLoading] = useState(false);
  const [paginateLoading, setPaginateLoading] = useState(false);
  const [numOfSkip, setNumOfSkip] = useState(-1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const [postData, setPostData] = useState({
    posts: [],
    urls: [],
    liked: [],
    creatorProfileImageUrls: []
  });

  const classes = useStyles();

  useEffect(() => {
    console.log("useeffect");
    setLoading(true);
    const formData = new FormData();
    if (props.postRoute === PostsFetchType.CREATOR) {
      formData.append('creatorId', props.creatorId);
    } else if (props.postRoute === PostsFetchType.MOVIE) {
      formData.append('movieId', props.movieId);
    }
    formData.append('numOfSkip', numOfSkip);
    fetch('/post/' + props.postRoute, {method: 'POST', body: formData})
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        setPostData({
          posts: [...res.posts],
          urls: [...res.urls],
          liked: [...res.liked],
          creatorProfileImageUrls: [...res.creatorProfileImageUrls]
        });
        setLoading(false);
        setNumOfSkip(res.nextNumOfSkip);
        if (res.posts.length === 0) {
          setHasMorePosts(false);
        }
      })
      .catch(err => console.log(err));
  }, [props.postRoute, PostsFetchType.CREATOR, PostsFetchType.MOVIE, props.creatorId, props.movieId]);

  function fetchMorePosts() {
    setPaginateLoading(true);
    const formData = new FormData();
    if (props.postRoute === PostsFetchType.CREATOR) {
      formData.append('creatorId', props.creatorId);
    } else if (props.postRoute === PostsFetchType.MOVIE) {
      formData.append('movieId', props.movieId);
    }
    formData.append('numOfSkip', numOfSkip);
    fetch('/post/' + props.postRoute, {method: 'POST', body: formData})
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        setPostData(prevData => {
          return {
            posts: [...prevData.posts, ...res.posts],
            urls: [...prevData.urls, ...res.urls],
            liked: [...prevData.liked, ...res.liked],
            creatorProfileImageUrls: [...prevData.creatorProfileImageUrls, ...res.creatorProfileImageUrls]
          }
        })
        setNumOfSkip(res.nextNumOfSkip);
        setPaginateLoading(false);
        if (res.posts.length === 0) {
          setHasMorePosts(false);
        }
      })
      .catch(err => console.log(err));
  }

  const [createState, setCreateState] = useState({
    isEditing: false,
    type: null,
    data: null
  });

  function handleAddPost(addedPostData) {
    document.body.style.overflow = "auto";
    setPostData(prevData => {
      return {
        posts: [addedPostData.post, ...prevData.posts],
        urls: [addedPostData.urls, ...prevData.urls],
        liked: [addedPostData.liked, ...prevData.liked],
        creatorProfileImageUrls: [addedPostData.creatorProfileImageUrl, ...prevData.creatorProfileImageUrls]
      }
    });
    setCreateState({isEditing: false, type: null, data: null});
    if (props.addOrDeletePost) {
      props.addOrDeletePost(true);
    }
  }

  function handleEditPost(editedPostData) {
    document.body.style.overflow = "auto";
    setPostData(prevData => {
      var previousPostDataFound = false;
      for (var i = 0; i < prevData.posts.length; i++) {
        if (prevData.posts[i]._id.trim() === editedPostData.post._id.trim()) {
          prevData.posts[i] = editedPostData.post;
          prevData.urls[i] = editedPostData.urls;
          prevData.liked[i] = editedPostData.liked;
          prevData.creatorProfileImageUrls[i] = editedPostData.creatorProfileImageUrl;
          previousPostDataFound = true;
          break;
        }
      }
      if (!previousPostDataFound) {
        return {
          posts: [editedPostData.post, ...prevData.posts],
          urls: [editedPostData.urls, ...prevData.urls],
          liked: [editedPostData.liked, ...prevData.liked],
          creatorProfileImageUrls: [editedPostData.creatorProfileImageUrl, ...prevData.creatorProfileImageUrls]
        }
      } else {
        return prevData;
      }
    });
    setCreateState({isEditing: false, type: null, data: null});
  }

  function handleDeletePost(postId) {
    document.body.style.overflow = "auto";
    setPostData(prevData => {
      const temp = {...prevData};
      for (var i = 0; i < temp.posts.length; i++) {
        if (temp.posts[i]._id.trim() === postId.trim()) {
          temp.posts.splice(i, 1);
          temp.urls.splice(i, 1);
          temp.liked.splice(i, 1);
          temp.creatorProfileImageUrls.splice(i, 1);
          return temp;
        }
      }
      return temp;
    })
    setCreateState({isEditing: false, type: null, data: null});
    if (props.addOrDeletePost) {
      props.addOrDeletePost(false);
    }
  }

  const handlePostAction = {
    handleAddPost: handleAddPost,
    handleEditPost: handleEditPost,
    handleDeletePost: handleDeletePost,
    setLoading: setLoading
  }

  function handleEditClick(data) {
    if (data.post.type === PostType.DIARY) {
      document.body.style.overflow = "hidden";
      setCreateState({isEditing: true, type: PostType.DIARY, data: data});
    } else if (data.post.type === PostType.RECOMMENDATION) {
      document.body.style.overflow = "hidden";
      setCreateState({isEditing: true, type: PostType.RECOMMENDATION, data: data});
    } else if (data.post.type === PostType.GENERAL) {
      document.body.style.overflow = "hidden";
      setCreateState({isEditing: true, type: PostType.GENERAL, data: data});
    } else if (data.post.type === PostType.ASK_SUGGESTION) {
      document.body.style.overflow = "hidden";
      setCreateState({isEditing: true, type: PostType.ASK_SUGGESTION, data: data});
    }
  }

  function handleExitClick() {
    document.body.style.overflow = "auto";
    setCreateState({isEditing: false, type: null, data: null});
  }

  function handleCreatePostClick(event) {
    var name;
    if (event.target.name) {
      name = event.target.name;
    } else if (event.target.id) {
      name = event.target.id;
    }
    if (name === PostType.GENERAL) {
      if (isBrowser) {
        document.body.style.overflow = "hidden";
      }
      setCreateState(prevData => {
        return {...prevData, type: PostType.GENERAL};
      })
    } else if (name === PostType.RECOMMENDATION) {
      if (isBrowser) {
        document.body.style.overflow = "hidden";
      }
      setCreateState(prevData => {
        return {...prevData, type: PostType.RECOMMENDATION};
      })
    } else if (name === PostType.DIARY) {
      if (isBrowser) {
        document.body.style.overflow = "hidden";
      }
      setCreateState(prevData => {
        return {...prevData, type: PostType.DIARY};
      })
    } else if (name === PostType.ASK_SUGGESTION){
      if (isBrowser) {
        document.body.style.overflow = "hidden";
      }
      setCreateState(prevData => {
        return {...prevData, type: PostType.ASK_SUGGESTION};
      })
    }
  }

  function displayLikers(postId) {
    const formData = new FormData();
    formData.append('postId', postId);
    fetch('/post/getLikers', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(postLikes => {
          setLikersData(postLikes.likers.map((liker, index) => {
            return {
              liker: liker,
              likerUrl: postLikes.likerUrls[index]
            }
          }))
          if (isBrowser) {
            document.body.style.overflow = "hidden";
          }
          setDisplayingLikers(true);
        })
  }

  return (
    <div id="scrollableDiv">
      {loading ? <div className="sweet-loading">
        <ClipLoader color={"#4287f5"} loading={loading} css={override} size={200} />
      </div> : <div>
      <div
        style={{
          opacity: (isDisplayingLikers || createState.type) ? "0.1" : "1",
          pointerEvents: (isDisplayingLikers || createState.type) ? "none": "auto",
        }}>
        {props.notCreateBox === undefined && <CreateBox handleClick={handleCreatePostClick}/>}
        <InfiniteScroll
          dataLength={postData.posts.length}
          next={fetchMorePosts}
          hasMore={hasMorePosts}
          loader={<ClipLoader color={"#4287f5"} loading={paginateLoading} css={overridePaginate} size={100} />}
        >
        {postData.posts.map((post, index) => {
          if (post.type === PostType.DIARY) {
            return <DisplayDiaryBox
              key={post._id}
              post={post}
              creatorProfileImageUrl={postData.creatorProfileImageUrls[index]}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick}
              userId={props.user._id}
              userProfileImageUrl={props.user.profileImageUrlCropped}
              displayLikers={displayLikers}/>
          } else if (post.type === PostType.RECOMMENDATION) {
            return <DisplayRecommendationBox
              key={post._id}
              post={post}
              creatorProfileImageUrl={postData.creatorProfileImageUrls[index]}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick}
              userId={props.user._id}
              userProfileImageUrl={props.user.profileImageUrlCropped}
              displayLikers={displayLikers}/>
          } else if (post.type === PostType.ASK_SUGGESTION) {
            return <DisplayAskForSuggestionsBox
              key={post._id}
              post={post}
              creatorProfileImageUrl={postData.creatorProfileImageUrls[index]}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick}
              userId={props.user._id}
              userProfileImageUrl={props.user.profileImageUrlCropped}
              displayLikers={displayLikers}/>
          } else {
            return <DisplayGeneralBox
              key={post._id}
              post={post}
              creatorProfileImageUrl={postData.creatorProfileImageUrls[index]}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick}
              userId={props.user._id}
              userProfileImageUrl={props.user.profileImageUrlCropped}
              displayLikers={displayLikers}/>
          }
        })}
        </InfiniteScroll>
      </div>
      <div style={{textAlign: "center"}}>
        {createState.type && <Container
          setLoading={setLoading}
          createState={createState}
          handleExitClick={handleExitClick}
          handlePostAction={handlePostAction}/>}
      </div>
      {isDisplayingLikers && <TableContainer
          component={Paper}
          style={{
            width: "500px",
            height: "300px",
            overflow: "auto",
            position: "absolute",
            top: window.pageYOffset + (window.innerHeight / 4),
            left: "33.5%",
            zIndex: "999999999999999999999999999999999999"}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <ThumbUpAltIcon />
              </TableCell>
              <TableCell align="right"><IconButton onClick={() => {setDisplayingLikers(false); document.body.style.overflow = "auto";}}>
          <Clear/>
        </IconButton></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {likersData && likersData.map((likerData) => (
              <TableRow key={likerData.liker._id}>
                <TableCell component="th" scope="row">
                <div style={{display: "flex"}}>
                  <div>
                  <Avatar alt="liker image" src={likerData.likerUrl ? likerData.likerUrl : process.env.PUBLIC_URL + '/images/loginImage.png'} />
                  </div>
                  <div style={{marginTop: "9px", marginLeft: "5px"}}>
                  {likerData.liker.nickname}
                  </div>
                </div>
                </TableCell>
                <TableCell align="right"><Button variant="contained" color="primary" onClick={() => {window.open("/profile/" + likerData.liker._id, "_self")}}>
                  Visit Profile
                </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>}
    </div>
  );
}
