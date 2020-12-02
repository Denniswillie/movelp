// import { useState } from 'react';

export default function Posts(props) {
  return <div>
    <h1>Posts</h1>

    <button
      variant="contained"
      color="primary"
      onClick={() => {
        window.open("/logout", "_self");
      }}
    >
      Logout
    </button>
</div>
}
