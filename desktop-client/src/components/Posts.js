import {useState, useEffect, useContext} from 'react';
import Navbar from './Navbar';
import CreateBox from './create/CreateBox';
import Container from './create/Container';
import DisplayDiaryBox from './display/DiaryBox';
import DisplayGeneralBox from './display/GeneralBox';
import DisplayRecommendationBox from './display/RecommendationBox';
import DisplayAskForSuggestionsBox from './display/AskForSuggestionsBox';
import PostTypeContext from './PostTypeContext';

export default function Posts() {
  const PostType = useContext(PostTypeContext);
  const [postData, setPostData] = useState({
    posts: [],
    urls: [],
    liked: []
  });

  useEffect(() => {
    fetch('/post/get', {method: 'GET', headers: {
      'Content-Type': 'application/json'
    }})
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        setPostData(res);
      })
      .catch(err => console.log(err));
  }, []);

  const [createState, setCreateState] = useState({
    isEditing: false,
    type: null,
    data: null
  });

  function handleAddPost(addedPostData) {
    setPostData(prevData => {
      return {
        posts: [addedPostData.post, ...prevData.posts],
        urls: [addedPostData.urls, ...prevData.urls],
        liked: [addedPostData.liked, ...prevData.liked]
      }
    });
    setCreateState({isEditing: false, type: null, data: null});
  }

  function handleEditPost(editedPostData) {
    setPostData(prevData => {
      var previousPostDataFound = false;
      for (var i = 0; i < prevData.posts.length; i++) {
        if (prevData.posts[i]._id.trim() === editedPostData.post._id.trim()) {
          prevData.posts[i] = editedPostData.post;
          prevData.urls[i] = editedPostData.urls;
          prevData.liked[i] = editedPostData.liked;
          previousPostDataFound = true;
          break;
        }
      }
      if (!previousPostDataFound) {
        return {
          posts: [editedPostData.post, ...prevData.posts],
          urls: [editedPostData.urls, ...prevData.urls],
          liked: [editedPostData.liked, ...prevData.liked]
        }
      } else {
        return prevData;
      }
    });
    setCreateState({isEditing: false, type: null, data: null});
  }

  function handleDeletePost(postId) {
    setPostData(prevData => {
      const temp = {...prevData};
      for (var i = 0; i < temp.posts.length; i++) {
        if (temp.posts[i]._id.trim() === postId.trim()) {
          temp.posts.splice(i, 1);
          temp.urls.splice(i, 1);
          temp.liked.splice(i, 1);
          return temp;
        }
      }
      return temp;
    })
    setCreateState({isEditing: false, type: null, data: null});
  }

  const handlePostAction = {
    handleAddPost: handleAddPost,
    handleEditPost: handleEditPost,
    handleDeletePost: handleDeletePost
  }

  function handleEditClick(data) {
    if (data.post.type === PostType.DIARY) {
      setCreateState({isEditing: true, type: PostType.DIARY, data: data});
    } else if (data.post.type === PostType.RECOMMENDATION) {
      setCreateState({isEditing: true, type: PostType.RECOMMENDATION, data: data});
    } else if (data.post.type === PostType.GENERAL) {
      setCreateState({isEditing: true, type: PostType.GENERAL, data: data});
    } else if (data.post.type === PostType.ASK_SUGGESTION) {
      setCreateState({isEditing: true, type: PostType.ASK_SUGGESTION, data: data});
    }
  }

  function handleExitClick() {
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
      setCreateState(prevData => {
        return {...prevData, type: PostType.GENERAL};
      })
    } else if (name === PostType.RECOMMENDATION) {
      setCreateState(prevData => {
        return {...prevData, type: PostType.RECOMMENDATION};
      })
    } else if (name === PostType.DIARY) {
      setCreateState(prevData => {
        return {...prevData, type: PostType.DIARY};
      })
    } else if (name === PostType.ASK_SUGGESTION){
      setCreateState(prevData => {
        return {...prevData, type: PostType.ASK_SUGGESTION};
      })
    }
  }

  return (
    <div>
      <Navbar />
      <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
        <CreateBox handleClick={handleCreatePostClick}/>
        {postData.posts.map((post, index) => {
          if (post.type === PostType.DIARY) {
            return <DisplayDiaryBox
              key={post._id}
              post={post}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick} />
          } else if (post.type === PostType.RECOMMENDATION) {
            return <DisplayRecommendationBox
              key={post._id}
              post={post}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick} />
          } else if (post.type === PostType.ASK_SUGGESTION) {
            return <DisplayAskForSuggestionsBox
              key={post._id}
              post={post}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick} />
          } else {
            return <DisplayGeneralBox
              key={post._id}
              post={post}
              urls={postData.urls[index]}
              liked={postData.liked[index]}
              handleEditClick={handleEditClick} />
          }
        })}
      </div>
      <div style={{textAlign: "center"}}>
        {createState.type && <Container
          createState={createState}
          handleExitClick={handleExitClick}
          handlePostAction={handlePostAction}/>}
      </div>
    </div>
  );
}
