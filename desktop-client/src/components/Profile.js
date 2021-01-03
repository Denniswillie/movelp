import React, { useState, useEffect, useContext } from 'react';
import UserInfoBox from './UserInfoBox';
import Posts from './Posts';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import UserInfoForm from './UserInfoForm';

export default function Profile(props) {
  const USER_NOT_SET = "userNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const PostsFetchType = useContext(PostsFetchTypeContext);
  const {handleChangeDisplayNavbar} = props;
  const [userInfoFormDisplayed, setUserInfoFormDisplayed] = useState(false);
  const [unableDeleteAccount, setUnableDeleteAccount] = useState(false);

  function setEditedUserProfile(editedUser) {
    setUser(editedUser);
  }

  function displayUserInfoForm() {
    setUserInfoFormDisplayed(true);
  }

  function undisplayUserInfoForm() {
    setUserInfoFormDisplayed(false);
  }

  function addOrDeletePost(addedPost) {
    var adder;
    if (addedPost) {
      adder = 1;
    } else {
      adder = -1;
    }
    setUser(prevData => {
      return {...prevData, numOfPosts: prevData.numOfPosts + adder};
    })
  }

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
        setUser({...res.user, profileImageUrlOriginal: res.profileImageUrlOriginal, profileImageUrlCropped: res.profileImageUrlCropped});

      }
    })
    .catch(err => console.log(err));

    return () => ac.abort();
  }, [handleChangeDisplayNavbar]);

  return <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      {user !== USER_NOT_SET && <div>
        <UserInfoBox
          user={user}
          creatorId={props.match.params.creatorId}
          displayUserInfoForm={displayUserInfoForm}/>
        <Posts user={user} addOrDeletePost={addOrDeletePost} postRoute={PostsFetchType.CREATOR} creatorId={props.match.params.creatorId}/>
        {userInfoFormDisplayed && <UserInfoForm
          user={user}
          userInfoFormDisplayed={userInfoFormDisplayed}
          style={{position: "absolute"}}
          undisplayUserInfoForm={undisplayUserInfoForm}/>}
      </div>}
    </div>
}
