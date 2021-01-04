import DiaryBox from './DiaryBox';
import AskForSuggestionsBox from './AskForSuggestionsBox';
import GeneralBox from './GeneralBox';
import RecommendationBox from './RecommendationBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Backspace from '@material-ui/icons/Backspace'
import MovieSearch from './MovieSearch';
import {useState, useContext, useEffect, useRef} from 'react';
import PostTypeContext from '../PostTypeContext';

export default function Container(props) {
  const [isSearchingMovie, setSearchingMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [willBeDeletedFiles, setWillBeDeletedFiles] = useState([]);
  const [deletedExistingFiles, setDeletedExistingFiles] = useState([]);
  const form = useRef();

  const [createInput, setCreateInput] = useState({
    diaryTitle: "",
    text: "",
    rating: 5,
    uploadedFiles: [],
    chosenMovies: [],
    movieTitleInputValue: ""
  })

  const photoGalleryStylings = [{
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    {
    }]

  const PostType = useContext(PostTypeContext);

  useEffect(() => {
    const ac = new AbortController();
    async function fetchData() {
      if (props.createState.isEditing) {
        const movieIds = props.createState.data.post.movieIds;
        const promises = [];
        for (var i = 0; i < movieIds.length; i++) {
          var movieDataRaw;
          try {
            movieDataRaw =
                await fetch("https://api.themoviedb.org/3/movie/" + props.createState.data.post.movieIds[i] + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
          } catch (err) {
            movieDataRaw = await fetch("https://api.themoviedb.org/3/tv/" + props.createState.data.post.movieIds[i] + "?api_key=ee1e60bc7d68306eef94c3adc2fdd763&language=en-US");
          }
          const movieData = await movieDataRaw.json();
          const title = movieData.title ? movieData.title : movieData.name;
          promises.push({id: movieIds[i], title: title});
        }
        const resolved = await Promise.all(promises);
        setCreateInput(prevData => {
          return {
            ...prevData,
            diaryTitle: props.createState.data.post.title,
            rating: props.createState.data.post.rating,
            text: props.createState.data.post.text,
            uploadedFiles: props.createState.data.post.fileIds.map((fileId, index) => {
              return {src: props.createState.data.urls[index], width: 1, height: 1, fileId: fileId};
            }),
            chosenMovies: resolved
          }
        })
      }
    }
    fetchData();
    return () => ac.abort();
  }, []);

  const handleInputChange = {
    handleDiaryTitleChange: (event) => {
      setCreateInput(prevData => {
        return {...prevData, diaryTitle: event.target.value};
      })
    },
    handleTextChange: (event) => {
      setCreateInput(prevData => {
        return {...prevData, text: event.target.value};
      })
    },
    handleRatingChange: (event) => {
      setCreateInput(prevData => {
        return {...prevData, rating: event.target.value};
      })
    },
    handleUploadedFilesChange: (event) => {
      const file = event.target.files[0];
      if (file) {
        const re = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
        if (re.test(file.name)) {
          setCreateInput(prevData => {
            return {
              ...prevData,
              uploadedFiles: [...prevData.uploadedFiles, {src: URL.createObjectURL(file), file: file, width: 1, height: 1}]
            };
          })
        } else {
          alert('only upload image files.')
        }
      }
    },
    handleMovieClick: (movieId, movieTitle) => {
      setCreateInput(prevData => {
        return {
          ...prevData,
          chosenMovies: [...prevData.chosenMovies, {id: movieId, title: movieTitle}]
        }
      })
    },
    handleDeleteChosenMovie: (movieId) => {
      setCreateInput(prevData => {
        return {
          ...prevData,
          chosenMovies: prevData.chosenMovies.filter(data => data.id !== movieId)
        }
      })
    },
    handleMovieTitleInput: (event) => {
      const value = event.target.value;
      setCreateInput(prevData => {
        return {...prevData, movieTitleInputValue: value};
      })
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
    },
    handleChooseToDeleteFile: (index) => {
      setWillBeDeletedFiles(prevData => {
        return [...prevData, index];
      })
    },
    handleChooseNotToDeleteFile: (index) => {
      setWillBeDeletedFiles(prevData => {
        return prevData.filter(val => {
          return val !== index;
        })
      });
    },
    handleDeleteChosenFiles: async () => {
      const tempDeletedFiles = [...willBeDeletedFiles].sort();
      const tempUploadedFiles = [...createInput.uploadedFiles];
      for (var i = tempDeletedFiles.length - 1; i >= 0; i--) {
        if (tempUploadedFiles[tempDeletedFiles[i]].fileId) {
          await setDeletedExistingFiles(prevData => {
            return [...prevData, tempUploadedFiles[tempDeletedFiles[i]].fileId];
          })
        }
        tempUploadedFiles.splice(tempDeletedFiles[i], 1);
      }
      setCreateInput(prevData => {
        return {...prevData, uploadedFiles: tempUploadedFiles};
      })
      setWillBeDeletedFiles([]);
    }
  }

  function handleSearchFieldClick() {
    setSearchingMovie(true);
  }

  function handleSearchFieldUnclick() {
    if (isSearchingMovie) {
      setSearchingMovie(false);
    }
  }

  function getPostHeader(type) {
    if (type === PostType.GENERAL) {
      return "General Post"
    } else if (type === PostType.RECOMMENDATION) {
      return "Recommendation Post"
    } else if (type === PostType.DIARY) {
      return "Diary Post"
    } else if (type === PostType.ASK_SUGGESTION) {
      return "Ask for Movie Recommendations"
    }
  }

  const renderProps = (param) => {
    return {
      createInput: createInput,
      deletedExistingFiles: deletedExistingFiles,
      handlePostAction: props.handlePostAction,
      post: param.data ? param.data.post : null,
      isEditing: param.isEditing,
      handleInputChange: handleInputChange,
      photoGalleryStylings: photoGalleryStylings,
      handleSubmit: handleSubmit,
      deletePost: deletePost,
      formRef: form
    }
  }

  function renderBox(param) {
    if (param.type === PostType.GENERAL) {
      return <GeneralBox renderProps={renderProps(param)} />
    } else if (param.type === PostType.DIARY) {
      return <DiaryBox renderProps={renderProps(param)} />
    } else if (param.type === PostType.RECOMMENDATION) {
      return <RecommendationBox renderProps={renderProps(param)} />
    } else if (param.type === PostType.ASK_SUGGESTION) {
      if (props.createState.isEditing) {
        console.log("edit ask suggestion");
      }
      return <AskForSuggestionsBox renderProps={renderProps(param)} />
    }
  }

  function handleSubmit(event) {
    if (props.createState.isEditing) {
      event.preventDefault();
      props.handlePostAction.setLoading(true);
      const formData = new FormData(form.current);
      formData.set('postId', props.createState.data.post._id);
      formData.set('postType', props.createState.type);
      for (var i = 0; i < deletedExistingFiles.length; i++) {
        formData.append('deletedFileIds[]', deletedExistingFiles[i]);
      }
      for (var j = 0; j < createInput.uploadedFiles.length; j++) {
        if (createInput.uploadedFiles[j].file) {
          formData.append('fileInput[]', createInput.uploadedFiles[j].file);
        } else {
          formData.append('fileInput[]', createInput.uploadedFiles[j].fileId);
        }
      }
      fetch('/post/edit', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          props.handlePostAction.handleEditPost(res);
          props.handlePostAction.setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      event.preventDefault();
      props.handlePostAction.setLoading(true);
      const formData = new FormData(form.current);
      for (var k = 0; k < createInput.uploadedFiles.length; k++) {
        formData.append('fileInput[]', createInput.uploadedFiles[k].file);
      }
      fetch('/post/create/' + props.createState.type, {method: 'POST', body: formData})
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(res => {
            props.handlePostAction.handleAddPost(res);
            props.handlePostAction.setLoading(false);
          })
          .catch(err => console.log(err));
    }
  }

  function deletePost() {
    const formData = new FormData();
    formData.set('postId', props.createState.data.post._id);
    formData.set('fileIds', props.createState.data.post.fileIds);
    fetch('/post/delete', {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => {
          if (res) {
            props.handlePostAction.handleDeletePost(props.createState.data.post._id);
          }
        })
  }

  return (
    <div className="createContainer">
      <IconButton style={{position: "absolute", top: "10px", right: "10px"}} onClick={props.handleExitClick}>
        <Clear/>
      </IconButton>
      <p style={{fontFamily: "Pacifico", fontSize: "1.5em"}}>{getPostHeader(props.createState.type)}</p>
      {isSearchingMovie && <Button
        style={{
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          top: "30px",
          left: "30px",
        }}
        variant="contained"
        startIcon={<Backspace />}
        onClick={handleSearchFieldUnclick}>Back</Button>}
      {props.createState.type !== PostType.ASK_SUGGESTION && <TextField
        label="Movie title"
        variant="outlined"
        style={{width: "90%"}}
        onClick={handleSearchFieldClick}
        onChange={handleInputChange.handleMovieTitleInput}
        value={!isSearchingMovie ? "" : createInput.movieTitleInputValue}/>}
      {isSearchingMovie ? <MovieSearch
        postType={props.createState.type}
        createInput={createInput}
        moviesList={moviesList}
        handleMovieClick={handleInputChange.handleMovieClick}/> : renderBox(props.createState)}
    </div>
  );
}
