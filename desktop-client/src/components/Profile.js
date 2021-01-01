import React, { useRef, useEffect } from 'react';
import Navbar from './Navbar';
import UserInfoBox from './UserInfoBox';

export default function Profile() {
  useEffect(() => {
    function authenticateUser() {
      fetch('/auth/isLoggedIn', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(user => {
        if (user === undefined) {
          window.open("/auth/google", "_self");
        }
      })
      .catch(err => console.log(err));
    }

    function getPosts() {
      
    }

    async function execute() {
      await authenticateUser();
      await getPosts();
    }

    execute();
  }, []);

  return <div>
    <Navbar />
    <div id="feed" style={{position: "relative", padding: "1em", textAlign: "center", paddingTop: "5em"}}>
      <UserInfoBox />
    </div>
  </div>
}
