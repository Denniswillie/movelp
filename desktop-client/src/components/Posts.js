// import { useState } from 'react';

export default function Posts(props) {
  return <div>
    <h1>Posts</h1>

    <form action="/createPost" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
      <input type="text" name="content" />
    </form>
    <button
      variant="contained"
      color="primary"
      onClick={() => {
        window.open("/auth/logout", "_self");
      }}
    >
      Logout
    </button>
</div>
}
