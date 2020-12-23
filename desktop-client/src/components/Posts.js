import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import CreateBox from './create/CreateBox';
import Container from './create/Container';
import DisplayDiaryBox from './display/DiaryBox';
// import DisplayGeneralBox from './display/GeneralBox';
// import DisplayRecommendationBox from './display/RecommendationBox';
// import DisplayAskForSuggestionsBox from './display/AskForSuggestionsBox';

export default function Posts() {
  const [posts, setPosts] = useState([[], []]);

  useEffect(() => {
    fetch('/post/get', {method: 'GET', headers: {
      'Content-Type': 'application/json'
    }})
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => setPosts(res))
      .catch(err => console.log(err));
  }, []);

  const [createType, setCreateType] = useState({
    container: false,
    generalBox: false,
    recommendationBox: false,
    diaryBox: false,
    askSuggestionBox: false
  });

  function handleExitClick(event) {
    setCreateType({
      container: false,
      generalBox: false,
      recommendationBox: false,
      diaryBox: false,
      askSuggestionBox: false
    })
  }

  function handleCreatePostClick(event) {
    var name;
    if (event.target.name) {
      name = event.target.name;
    } else if (event.target.id) {
      name = event.target.id;
    }
    if (name === "createGeneralButton") {
      setCreateType({
        container: true,
        generalBox: true,
        recommendationBox: false,
        diaryBox: false,
        askSuggestionBox: false,
        titleText: "General Post"
      })
    } else if (name === "createRecommendationButton") {
      setCreateType({
        container: true,
        generalBox: false,
        recommendationBox: true,
        diaryBox: false,
        askSuggestionBox: false,
        titleText: "Recommendation Post"
      })
    } else if (name === "createDiaryButton") {
      setCreateType({
        container: true,
        generalBox: false,
        recommendationBox: false,
        diaryBox: true,
        askSuggestionBox: false,
        titleText: "Diary Post"
      })
    } else if (name === "createAskSuggestionButton"){
      setCreateType({
        container: true,
        generalBox: false,
        recommendationBox: false,
        diaryBox: false,
        askSuggestionBox: true,
        titleText: "Ask for Recommendation"
      })
    }
  }

  function handlePostClick(event) {
    console.log(event);
  }

  return (
    <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <CreateBox handleClick={handleCreatePostClick}/>
      <DisplayDiaryBox />
      {posts[0].map((post, index) => {
        return <div key={index} id={index} value={post.type} onClick={handlePostClick}>
          <p>{post._id}</p>
          <p>{post.type}</p>
          {posts[1][index].map((url, index) => {
            return <img key={index} src={url} />
          })}
        </div>
      })}
    </div>
    <div style={{textAlign: "center"}}>
      {createType.container && <Container createType={createType} handleExitClick={handleExitClick} />}
    </div>
    </div>
  );
}
