import React, { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from "react-infinite-scroll-component";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function PageNotFoundError() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [items, setItems] = useState(Array.from({length: 20}))

  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

  async function fetchMoreData() {
    setLoading(false);
    await setTimeout(() => {
      setItems(prevData => {
        return prevData.concat(Array.from({length: 20}));
      })
    }, 3000);
    setLoading(true);
  }

  return (
    <div className="sweet-loading">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<ClipLoader color={color} loading={loading} css={override} size={150} />}
      >
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
