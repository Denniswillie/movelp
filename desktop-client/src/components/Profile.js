import { useRef, useEffect } from 'react';

export default function Profile() {
  const user = useRef(null);
  useEffect(() => {
    fetch("/auth/isLoggedIn", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        window.open("/auth/login", "_self");
      }
    })
    .catch(err => console.log)
    .then(res => {
      user.current = res.user;
    })
    .catch(err => console.log);
  }, []);
  return <div>
    <h1>This is profile page.</h1>
  </div>
}
