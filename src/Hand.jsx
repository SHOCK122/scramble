import React from "react";
import Word from "./Word"

const Hand = (props) => {
  const words = [
    'these',
    'are',
    'sample',
    'words'
  ];
  return (
    <div className="Hand">
      <h1>{props.playerName}</h1>
      <div className="Words">
        {
          words.map((word) => (
            <Word word={word} />
          ))
        }
      </div>
    </div>
  )
}

export default Hand;