import { useEffect, useState, useContext } from 'react';
import Posts from './Posts';
import Login from './Login';
import UserInfoForm from './UserInfoForm';
import PostsFetchTypeContext from './PostsFetchTypeContext';
import Navbar from './Navbar';

export default function Home(props) {
  const USER_NOT_SET = "userNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const [paddingTop, setPaddingTop] = useState("0em");
  const PostsFetchType = useContext(PostsFetchTypeContext);
  useEffect(() => {
    fetch('/auth/isLoggedIn', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(res => {
      if (res !== undefined && res.user.nickname !== undefined) {
        setPaddingTop("5em");
        setUser({...res.user, profileImageUrlCropped: res.profileImageUrlCropped, profileImageUrlOriginal: res.profileImageUrlOriginal});
      } else if (res === undefined) {
        setUser(res);
      } else if (res.user.nickname === undefined) {
        setUser(res.user);
      }
    })
    .catch(err => console.log(err));
  }, []);

  function renderPage() {
    if (user !== USER_NOT_SET && user !== undefined) {
      if (user.nickname) {
        return <Posts user={user} postRoute={PostsFetchType.ALL}/>;
      }
      return <UserInfoForm user={user}/>
    } else {
      return <Login />;
    }
  }

  return <div>
    {(user !== USER_NOT_SET && user !== undefined && user.nickname !== undefined) && <Navbar userId={user._id}/>}
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: paddingTop}}>
      {user !== USER_NOT_SET && renderPage()}
    </div>
  </div>
}
