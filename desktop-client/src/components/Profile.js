import React, { useState, useEffect, useContext } from 'react';
import UserInfoBox from './UserInfoBox';
import Posts from './Posts';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import UserInfoForm from './UserInfoForm';
import Navbar from './Navbar';
import {
  BrowserView,
  MobileView
} from "react-device-detect";

export default function Profile(props) {
  const USER_NOT_SET = "userNotSet";
  const CREATOR_NOT_SET = "creatorNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const [creator, setCreator] = useState(CREATOR_NOT_SET);
  const PostsFetchType = useContext(PostsFetchTypeContext);
  const [userInfoFormDisplayed, setUserInfoFormDisplayed] = useState(false);
  const {creatorId} = props;

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
        setUser({...res.user, profileImageUrlOriginal: res.profileImageUrlOriginal, profileImageUrlCropped: res.profileImageUrlCropped});

      }
    })
    const formData = new FormData();
    formData.append('userId', creatorId);
    fetch('/user/getProfile', {method: 'POST', signal: signal, body: formData})
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(res => {
      setCreator({...res.user, profileImageUrl: res.profileImageUrl});
    })
    .catch(err => console.log(err));

    return () => ac.abort();
  }, [creatorId]);

  return <div>
  {(user !== USER_NOT_SET && user !== undefined && user.nickname !== undefined) && <Navbar userId={user._id}/>}
  <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <BrowserView>
      {(user !== USER_NOT_SET && creator !== CREATOR_NOT_SET && creator !== undefined) && <div>
        <UserInfoBox
          user={user}
          creator={creator}
          displayUserInfoForm={displayUserInfoForm}/>
        <Posts user={user} notCreateBox={user._id !== creator._id && true} addOrDeletePost={addOrDeletePost} postRoute={PostsFetchType.CREATOR} creatorId={creatorId}/>
        {(userInfoFormDisplayed && user._id === creatorId) && <UserInfoForm
          user={user}
          userInfoFormDisplayed={userInfoFormDisplayed}
          style={{position: "absolute"}}
          undisplayUserInfoForm={undisplayUserInfoForm}/>}
      </div>}
      </BrowserView>
      <MobileView>
      {(user !== USER_NOT_SET && creator !== CREATOR_NOT_SET && creator !== undefined) && <div>
        <UserInfoBox
          user={user}
          creator={creator}
          displayUserInfoForm={displayUserInfoForm}/>
        <Posts user={user} notCreateBox={user._id !== creator._id && true} addOrDeletePost={addOrDeletePost} postRoute={PostsFetchType.CREATOR} creatorId={creatorId}/>
        {(userInfoFormDisplayed && user._id === creatorId) && <UserInfoForm
          user={user}
          userInfoFormDisplayed={userInfoFormDisplayed}
          style={{position: "absolute"}}
          undisplayUserInfoForm={undisplayUserInfoForm}/>}
      </div>}
      </MobileView>
    </div>
  </div>
}
