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
  const [postData, setPostData] = useState([[], []]);

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

  function handleDeletePost(postId) {
    setPosts(prevData => {
      const temp = [...prevData];
      for (var i = 0; i < temp.length; i++) {
        if (temp[0][i]._id.trim() == postId.trim()) {
          temp[0].splice(i, 1);
          temp[1].splice(i, 1);
          temp[2].splice(i, 1);
          return temp;
        }
      }
      return temp;
    })
    setCreateData({isEditing: false, type: null, typeData: null});
  }

  function handleEditPost(post) {
    setPosts(prevData => {
      const temp = [...prevData];
      var previousPostDataFound = false;
      for (var i = 0; i < temp[0].length; i++) {
        if (temp[0][i]._id.trim() == post[0]._id.trim()) {
          temp[0][i] = post[0];
          temp[1][i] = post[1];
          temp[2][i] = post[2];
          previousPostDataFound = true;
          break;
        }
      }
      if (!previousPostDataFound) {
        return [
          [post[0], ...prevData[0]],
          [post[1], ...prevData[1]],
          [post[2], ...prevData[2]]
        ]
      } else {
        console.log(temp);
        return temp;
      }
    });
    setCreateData({isEditing: false, type: null, typeData: null});
  }

  function handleAddPost(post) {
    setPosts(prevData => {
      return [
        [post[0], ...prevData[0]],
        [post[1], ...prevData[1]],
        [post[2], ...prevData[2]]
      ]
    });
    setCreateData({isEditing: false, type: null, typeData: null});
  }

  function handleEditClick(post) {
    if (post.type === PostType.DIARY) {
      setCreateData({isEditing: true, type: PostType.DIARY, typeData: post});
    } else if (post.type === PostType.RECOMMENDATION) {
      setCreateData({isEditing: true, type: PostType.RECOMMENDATION, typeData: post});
    } else if (post.type === PostType.GENERAL) {
      setCreateData({isEditing: true, type: PostType.GENERAL, typeData: post});
    } else if (post.type === PostType.ASK_SUGGESTION) {
      setCreateData({isEditing: true, type: PostType.ASK_SUGGESTION, typeData: post});
    }
  }

  function handleExitClick(event) {
    setCreateData({isEditing: false, type: null, typeData: null});
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
          switch (post.type) {
            case PostType.DIARY:
              return <DisplayDiaryBox
                key={post._id}
                post={post}
                urls={postData.urls[index]}
                liked={postData.liked[index]}
                handleEditClick={handleEditClick} />
            case PostType.RECOMMENDATION:
              return <DisplayRecommendationBox
                key={post._id}
                post={post}
                urls={postData.urls[index]}
                liked={postData.liked[index]}
                handleEditClick={handleEditClick} />
            case PostType.GENERAL:
              return <DisplayGeneralBox
                key={post._id}
                post={post}
                urls={postData.urls[index]}
                liked={postData.liked[index]}
                handleEditClick={handleEditClick} />
            case PostType.ASK_SUGGESTION:
              return <DisplayAskForSuggestionsBox
                key={post._id}
                post={post}
                urls={postData.urls[index]}
                liked={postData.liked[index]}
                handleEditClick={handleEditClick} />
          }
        })}
      </div>
      <div style={{textAlign: "center"}}>
        {createData.type && <Container
          createData={createData}
          handleExitClick={handleExitClick}
          handleAddPost={handleAddPost}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}/>}
      </div>
    </div>
  );
}
