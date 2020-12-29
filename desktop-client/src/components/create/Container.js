import DiaryBox from './DiaryBox';
import AskForSuggestionBox from './AskForSuggestionsBox';
import GeneralBox from './GeneralBox';
import RecommendationBox from './RecommendationBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Backspace from '@material-ui/icons/Backspace'
import MovieSearch from './MovieSearch';
import {useState, useContext, useEffect} from 'react';
import PostTypeContext from '../PostTypeContext';

export default function Container(props) {
  const [isSearchingMovie, setSearchingMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [chosenMovies, setChosenMovies] = useState([]);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [text, setText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [willBeDeletedFiles, setWillBeDeletedFiles] = useState([]);
  const [deletedExistingFiles, setDeletedExistingFiles] = useState([]);
  const [initialUploadedFilesLength, setInitialUploadedFilesLength] = useState(0);
  const [rating, setRating] = useState(5);
  const [movieTitleInputValue, setMovieTitleInputValue] = useState("");
  const PostType = useContext(PostTypeContext);

  useEffect(async () => {
    const ac = new AbortController();
    if (props.createData.isEditing) {
      // set setDiaryTitle
      if (props.createData.type === PostType.DIARY) {
        setDiaryTitle(props.createData.typeData.title);
      }

      if (props.createData.type === PostType.RECOMMENDATION) {
        setRating(props.createData.typeData.rating)
      }

      setText(props.createData.typeData.text);

      const existingFiles = props.createData.typeData.fileIds.map((fileId, index) => {
        return {src: props.createData.typeData.urls[index], width: 1, height: 1, fileId: fileId};
      })

      setUploadedFiles(existingFiles);
      setInitialUploadedFilesLength(existingFiles.length);

      // set chosen movies
      const movieIds = props.createData.typeData.movieIds;
      const promises = [];
      for (var i = 0; i < movieIds.length; i++) {
        const movieDataRaw = await fetch("https://api.themoviedb.org/3/movie/" + movieIds[i] + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
        const movieData = await movieDataRaw.json();
        const title = movieData.title ? movieData.title : movieData.name;
        promises.push({id: movieIds[i], title: title});
      }
      const resolved = await Promise.all(promises);
      setChosenMovies(prevData => {
        return [...prevData, resolved].flat(1);
      })
    }
    return () => ac.abort();
  }, []);

  function renderBox(param) {
    if (param.type === PostType.GENERAL) {
      return <GeneralBox
        chosenMovies={chosenMovies}
        data={param.typeData}
        uploadedFiles={uploadedFiles}
        handleTextChange={handleTextChange}
        handleUploadedFilesChange={handleUploadedFilesChange}
        handleDeleteChosenMovie={handleDeleteChosenMovie}
        isEditing={param.isEditing}/>
    } else if (param.type === PostType.DIARY) {
      return <DiaryBox
        handleEditPost={props.handleEditPost}
        handleAddPost={props.handleAddPost}
        deletedExistingFiles={deletedExistingFiles}
        handleDeleteChosenFiles={handleDeleteChosenFiles}
        handleChooseNotToDeleteFile={handleChooseNotToDeleteFile}
        handleChooseToDeleteFile={handleChooseToDeleteFile}
        willBeDeletedFiles={willBeDeletedFiles}
        chosenMovies={chosenMovies}
        data={param.typeData}
        uploadedFiles={uploadedFiles}
        handleTextChange={handleTextChange}
        handleDiaryTitleChange={handleDiaryTitleChange}
        handleUploadedFilesChange={handleUploadedFilesChange}
        handleDeleteChosenMovie={handleDeleteChosenMovie}
        isEditing={param.isEditing}
        text={text}
        diaryTitle={diaryTitle}/>
    } else if (param.type === PostType.RECOMMENDATION) {
      return <RecommendationBox
        chosenMovies={chosenMovies}
        data={param.typeData}
        uploadedFiles={uploadedFiles}
        handleTextChange={handleTextChange}
        handleRatingChange={handleRatingChange}
        handleUploadedFilesChange={handleUploadedFilesChange}
        handleDeleteChosenMovie={handleDeleteChosenMovie}
        isEditing={param.isEditing}/>
    } else if (param.type === PostType.ASK_SUGGESTION) {
      return <AskForSuggestionBox
        data={param.typeData}
        uploadedFiles={uploadedFiles}
        handleTextChange={handleTextChange}
        handleUploadedFilesChange={handleUploadedFilesChange}
        isEditing={param.isEditing}/>
    }
  }

  function handleDeleteChosenMovie(movieId) {
    setChosenMovies(prevData => {
      return prevData.filter(data => data.id !== movieId);
    })
  }

  function handleDiaryTitleChange(event) {
    setDiaryTitle(event.target.value);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleUploadedFilesChange(event) {
    console.log("uploaded a file");
    const file = event.target.files[0];
    setUploadedFiles(prevData => {
      return [...prevData, {src: URL.createObjectURL(file), file: file, width: 1, height: 1}];
    })
  }

  function handleChooseToDeleteFile(index) {
    setWillBeDeletedFiles(prevData => {
      return [...prevData, index];
    })
  }

  function handleChooseNotToDeleteFile(index) {
    const temp = [...willBeDeletedFiles].filter(val => {
      return val !== index;
    });
    setWillBeDeletedFiles(temp);
  }

  async function handleDeleteChosenFiles() {
    const tempDeletedFiles = [...willBeDeletedFiles].sort();
    const tempUploadedFiles = [...uploadedFiles];
    for (var i = tempDeletedFiles.length - 1; i >= 0; i--) {
      if (tempUploadedFiles[tempDeletedFiles[i]].fileId) {
        await setDeletedExistingFiles(prevData => {
          return [...prevData, tempUploadedFiles[tempDeletedFiles[i]].fileId];
        })
      }
      tempUploadedFiles.splice(tempDeletedFiles[i], 1);
    }
    setUploadedFiles(tempUploadedFiles);
    setWillBeDeletedFiles([]);
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  function handleSearchFieldClick() {
    setSearchingMovie(true);
  }

  function handleSearchFieldUnclick() {
    if (isSearchingMovie) {
      setSearchingMovie(false);
    }
  }

  function handleMovieClick(movieId, movieTitle) {
    setChosenMovies(prevData => {
      return [...prevData, {id: movieId, title: movieTitle}];
    })
  }

  function handleMovieTitleInput(event) {
    const value = event.target.value;
    setMovieTitleInputValue(value);
    if (value.trim()) {
      fetch("https://api.themoviedb.org/3/search/multi?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US&query=" + value)
        .then(res => res.json())
        .catch(console.log)
        .then(res => {
          setMoviesList(res.results);
        })
        .catch(err => console.log(err));
    } else {
      setMoviesList([]);
    }
  }

  function getPostHeader(type) {
    if (type === PostType.GENERAL) {
      return <p>General Post</p>
    } else if (type === PostType.RECOMMENDATION) {
      return <p>Recommendation Post</p>
    } else if (type === PostType.DIARY) {
      return <p>Diary Post</p>
    } else if (type === PostType.ASK_SUGGESTION) {
      return <p>Ask for movie suggestion</p>
    }
  }

  return (
    <div style={{
        width: "500px",
        height: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5em",
        backgroundColor: "white",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        borderRadius: "5px",
        boxShadow: "0 0 20px #999",
        zIndex: "100",
        position: "absolute",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "3px",
        overflow: "auto"}}>
      <IconButton style={{position: "absolute", top: "10px", right: "10px"}} onClick={props.handleExitClick}>
        <Clear/>
      </IconButton>
      <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>{getPostHeader(props.createData.type)}</p>
      {isSearchingMovie && <Button style={{backgroundColor: "black", color: "white", position: "absolute", top: "30px", left: "30px"}} variant="contained" startIcon={<Backspace />} onClick={handleSearchFieldUnclick}>Back</Button>}
      {props.createData.type !== PostType.ASK_SUGGESTION && <TextField label="Movie title" variant="outlined" style={{width: "90%"}} onClick={handleSearchFieldClick} onChange={handleMovieTitleInput} value={!isSearchingMovie ? "" : movieTitleInputValue}/>}
      {isSearchingMovie ? <MovieSearch moviesList={moviesList} handleMovieClick={handleMovieClick}/> : renderBox(props.createData)}
    </div>
  );
}
