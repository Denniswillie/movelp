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
        console.log(res[2]);
        setPosts(res);
      })
      .catch(err => console.log(err));
  }, []);

  const [createData, setCreateData] = useState({
    isEditing: false,
    type: null,
    typeData: null
  });

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
      {createData.type && <Container createData={createData} handleExitClick={handleExitClick} />}
    </div>
    </div>
  );
}
