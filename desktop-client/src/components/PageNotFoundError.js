import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/RingLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 13em;
  border-color: red;
`;

export default function PageNotFoundError() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      />

      <ClipLoader color={color} loading={loading} css={override} size={200} />
    </div>
  );
}
