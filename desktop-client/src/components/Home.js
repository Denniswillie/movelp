import { useEffect, useState, useContext } from 'react';
import Posts from './Posts';
import Login from './Login';
import UserInfoForm from './UserInfoForm';
import PostsFetchTypeContext from './PostsFetchTypeContext';

export default function Home(props) {
  const USER_NOT_SET = "userNotSet";
  const [user, setUser] = useState(USER_NOT_SET);
  const [paddingTop, setPaddingTop] = useState("0em");
  const PostsFetchType = useContext(PostsFetchTypeContext);
  const {handleChangeUserId, handleChangeDisplayNavbar} = props;
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
        handleChangeDisplayNavbar(true);
        handleChangeUserId(res.user._id);
        setPaddingTop("5em");
        setUser(res.user);
      } else if (res === undefined) {
        handleChangeDisplayNavbar(false);
        setUser(res);
      } else if (res.user.nickname === undefined) {
        handleChangeDisplayNavbar(false);
        setUser(res.user);
      }
    })
    .catch(err => console.log(err));
  }, [handleChangeUserId]);

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

  return <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: paddingTop}}>
      {user !== USER_NOT_SET && renderPage()}
    </div>
}
