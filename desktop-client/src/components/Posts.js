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
  const [posts, setPosts] = useState([[], []]);

  useEffect(() => {
    fetch('/post/get', {method: 'GET', headers: {
      'Content-Type': 'application/json'
    }})
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        setPosts(res);
      })
      .catch(err => console.log(err));
  }, []);

  const [createData, setCreateData] = useState({
    isEditing: false,
    type: null,
    typeData: null
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
    console.log(event);
    var name;
    if (event.target.name) {
      name = event.target.name;
    } else if (event.target.id) {
      name = event.target.id;
    }
    if (name === PostType.GENERAL) {
      setCreateData(prevData => {
        return {...prevData, type: PostType.GENERAL};
      })
    } else if (name === PostType.RECOMMENDATION) {
      setCreateData(prevData => {
        return {...prevData, type: PostType.RECOMMENDATION};
      })
    } else if (name === PostType.DIARY) {
      setCreateData(prevData => {
        return {...prevData, type: PostType.DIARY};
      })
    } else if (name === PostType.ASK_SUGGESTION){
      setCreateData(prevData => {
        return {...prevData, type: PostType.ASK_SUGGESTION};
      })
    }
  }

  return (
    <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <CreateBox handleClick={handleCreatePostClick}/>
      {posts[0].map((post, index) => {
        switch (post.type) {
          case PostType.DIARY:
            return <DisplayDiaryBox
              _id={post._id}
              key={post._id}
              type={post.type}
              text={post.text}
              title={post.title}
              fileIds={post.fileIds}
              urls={posts[1][index]}
              liked={posts[2][index]}
              noOfLikes={post.noOfLikes}
              noOfComments={post.noOfComments}
              handleEditClick={handleEditClick}
              movieIds={post.movieIds}/>
          case PostType.RECOMMENDATION:
            return <DisplayRecommendationBox
              _id={post._id}
              key={post._id}
              type={post.type}
              text={post.text}
              urls={posts[1][index]}
              rating={post.rating}
              noOfLikes={post.noOfLikes}
              noOfComments={post.noOfComments}
              handleEditClick={handleEditClick}
              movieIds={post.movieIds}/>
          case PostType.GENERAL:
            return <DisplayGeneralBox
              _id={post._id}
              key={post._id}
              type={post.type}
              text={post.text}
              urls={posts[1][index]}
              noOfLikes={post.noOfLikes}
              noOfComments={post.noOfComments}
              handleEditClick={handleEditClick}
              movieIds={post.movieIds}/>
          case PostType.ASK_SUGGESTION:
            return <DisplayAskForSuggestionsBox
              _id={post._id}
              key={post._id}
              type={post.type}
              text={post.text}
              urls={posts[1][index]}
              noOfLikes={post.noOfLikes}
              noOfComments={post.noOfComments}
              handleEditClick={handleEditClick}
              movieIds={post.movieIds}/>
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
