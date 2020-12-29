import { useEffect, useState } from 'react';
import Posts from './Posts';
import Login from './Login';
import UserInfoForm from './UserInfoForm';

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/auth/isLoggedIn', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(res => setUser(res))
    .catch(err => console.log(err));
  }, []);

  function renderPage() {
    if (user) {
      if (user.nickname) {
        return <Posts user={user} />;
      }
      return <UserInfoForm user={user}/>
    } else {
      return <Login />;
    }
  }

  return <div>
    {renderPage()}
  </div>
}
