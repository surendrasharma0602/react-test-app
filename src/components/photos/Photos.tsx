import { useState } from "react";

import { useAPI } from "../../common/hooks";
import { RequestState } from "../../common/enums";
import { Photo } from "../../common/types";

import "./Photos.css";
const Photos = (): JSX.Element => {
  
  const {
    result,
    fetchingState,
    refresh,
  } = useAPI<Array<Photo>>(
    `https://jsonplaceholder.typicode.com/photos`
  );
  const handleRefreshClick = () => {
    refresh();
  };
  const hanldeNextPageClick = () => {
  //  setPage((prev) => prev + 1);
  };

  const renderPhotos = (): JSX.Element => {
    if (!result) return <div></div>;
    return (
      <div>
        {result.map((p) => (
          <div className="photo-item" >
            <div>{p.id}</div>
            <div>{p.title}</div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      {fetchingState === RequestState.IN_PROGRESS ? "laoding..." : ""}
      {fetchingState === RequestState.ERROR ? "Error loading data!!!" : ""}
      {fetchingState === RequestState.SUCCESS ? renderPhotos() : ""}
      <button onClick={hanldeNextPageClick}> Next Page</button>
      <button onClick={handleRefreshClick}> Refresh</button>
    </>
  );
};

export default Photos;
