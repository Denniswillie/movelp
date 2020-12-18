import {useState} from 'react';
import Navbar from './Navbar';
import CreateBox from './create/CreateBox';
import Container from './create/Container';

// const [postedData, setPostedData] = useState({
//   text: "",
//   fileArray: []
// });
//
// function handleChange(event) {
//   const {name, value} = event.target;
//   setPostedData(prevData => {
//     return {
//       ...prevData,
//       [name]: value
//     };
//   });
// }

export default function Posts() {
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
      console.log(name);
    } else if (event.target.id) {
      name = event.target.id;
      console.log(name);
    } else {
      console.log(event.target);
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

  return (
    <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center"}}>
      <CreateBox handleClick={handleCreatePostClick}/>
    </div>
    <div style={{textAlign: "center"}}>
      {createType.container && <Container createType={createType} handleExitClick={handleExitClick} />}
    </div>
    </div>
  );
}
