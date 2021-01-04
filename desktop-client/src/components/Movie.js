import React, { useState, useEffect, useContext } from 'react';
import Posts from './Posts';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import MovieInfoBox from './MovieInfoBox';
import Navbar from './Navbar';

export default function Movie(props) {
  const USER_NOT_SET = "userNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const PostsFetchType = useContext(PostsFetchTypeContext);
  const {movieId} = props;

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
        setUser({...res.user, profileImageUrlCropped: res.profileImageUrlCropped, profileImageUrlOriginal: res.profileImageUrlOriginal});
      }
    })
    .catch(err => console.log(err));

    return () => ac.abort();
  }, []);

  return <div>
  {(user !== USER_NOT_SET && user !== undefined && user.nickname !== undefined) && <Navbar userId={user._id}/>}
  <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <MovieInfoBox movieId={movieId}/>
      {user !== USER_NOT_SET && <div>
        <Posts user={user} postRoute={PostsFetchType.MOVIE} movieId={movieId}/>
      </div>}
    </div>
  </div>
}
