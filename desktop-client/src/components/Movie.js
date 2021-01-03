import React, { useState, useEffect, useContext } from 'react';
import Posts from './Posts';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import MovieInfoBox from './MovieInfoBox';

export default function Movie(props) {
  const USER_NOT_SET = "userNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const PostsFetchType = useContext(PostsFetchTypeContext);
  const {handleChangeDisplayNavbar} = props;

  useEffect(() => {
    const ac = new AbortController();
    const signal = ac.signal;
    fetch('/auth/isLoggedIn', {
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(res => {
      if (res === undefined) {
        window.open("/auth/google", "_self");
      } else {
        if (res.user.nickname === undefined) {
          window.open("/", "_self");
        }
        handleChangeDisplayNavbar(true);
        setUser(res.user);
      }
    })
    .catch(err => console.log(err));

    return () => ac.abort();
  }, [handleChangeDisplayNavbar]);

  return <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <MovieInfoBox movieId={props.match.params.movieId}/>
      {user !== USER_NOT_SET && <div>
        <Posts user={user} postRoute={PostsFetchType.MOVIE} movieId={props.match.params.movieId}/>
      </div>}
    </div>
}
