import React from "react";
import Radio from "./Radio";

function Result({ result, openPopup, canRate, onRatingChange,onDeleteMovie }) {
  return (
    <div
      className={canRate ? "rateResult" : "result"}
      onClick={() => {
        openPopup(result.imdbID);
      }}
    >
      <img src={result.Poster} />
      <h3>{result.Title}</h3>
      {canRate ? (
        <div className="rateContainer">
          <button className="btn" onClick={() => onDeleteMovie(result.imdbID)}>delete</button>
        <Radio 
          name={`rate-${result.imdbID}`} 
          currentRating={result.rating || 0}
          onRatingChange={(rating) => onRatingChange(result.imdbID, rating)}
        />
        </div>
      ) : false}
    </div>
  );
}
export default Result;
