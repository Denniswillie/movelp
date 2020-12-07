import { useState } from 'react';
const formData = new FormData();

export default function Posts(props) {
  const [postedData, setPostedData] = useState({
    text: "",
    fileArray: []
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setPostedData(prevData => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  return <div>
    <h1>Posts</h1>

    <form action="/createPost" method="POST" encType="multipart/form-data">
      <input type="file" name="fileInput" value={postedData.fileInput} onChange={handleChange} multiple/>
      <input type="text" name="textInput" value={postedData.textInput} onChange={handleChange}/>
      <input type="submit" />
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
