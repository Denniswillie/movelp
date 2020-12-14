import {useState} from 'react';
import Navbar from './Navbar';
import CreateBox from './box/createBox/CreateBox';
import CreateGeneralBox from './box/createBox/CreateGeneralBox';
import CreateDiaryBox from './box/createBox/CreateDiaryBox';
import CreateAskForSuggestionBox from './box/createBox/CreateAskForSuggestionBox';
import CreateRecommendationBox from './box/createBox/CreateRecommendationBox';

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
  const [feedOpacity, setFeedOpacity] = useState(1);

  function handleCreatePostClick(event) {
    const name = event.target.name;
    console.log(name);
    if (name === "createGeneralButton") {
      setFeedOpacity(0.3);
    } else if (name === "createRecommendationButton") {
      setFeedOpacity(0.3);
    } else if (name === "createDiaryButton") {
      setFeedOpacity(0.3);
    } else {
      setFeedOpacity(0.3);
    }
  }

  return (
    <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", opacity: {feedOpacity}}}>
      <CreateBox handleClick={handleCreatePostClick}/>
    </div>

    </div>
  );
}
