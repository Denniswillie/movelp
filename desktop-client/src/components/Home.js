import { useEffect, useState } from 'react';
import Posts from './Posts';
import Login from './Login';

export default function Home() {
  const [authStats, setAuthStats] = useState({
    authenticated: false,
    user: undefined
  });
  useEffect(() => {
    fetch('/isLoggedIn', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .catch(err => console.log)
    .then(res => {
      if (res.user) {
        setAuthStats({
          authenticated: true,
          user: res.user
        })
      }
    })
    .catch(err => console.log);
  }, []);

  return <div>
    {authStats.authenticated ? <Posts user={authStats.user} /> : <Login />}
  </div>
}
