import { useRef, useEffect } from 'react';
import Navbar from './Navbar';

export default function Profile() {
  useEffect(() => {
    const ac = new AbortController();
    fetch("/auth/isLoggedIn", {method: "GET"})
    .then(res => {
      console.log(res);
      res.json();
    })
    .catch(err => console.log)
    .then(user => {
      console.log(user);
    })
    .catch(err => console.log);
    return () => ac.abort();
  }, []);

  return <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>

    </div>
  </div>
}
