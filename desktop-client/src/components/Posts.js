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
      if (name === "fileInput") {
        return {
          ...prevData,
          fileArray: [...prevData.fileArray, value]
        }
      }
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    formData.append(postedData);
    fetch('/createPost', {method: 'POST', body: JSON.stringify(formData)});
    event.preventDefault();
  }

  return <div>
    <h1>Posts</h1>

    <form onSubmit={handleSubmit}>
      <input type="file" name="fileInput" value={postedData.fileData} onChange={handleChange} multiple/>
      <input type="text" name="text" value={postedData.text} onChange={handleChange}/>
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
