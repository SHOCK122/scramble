import React from "react";
import Word from "./Word"

const Hand = (props) => {
  return (
    <div className="Hand">
      <h1>{props.playerName}</h1>
      <h2>{props.playerWords}</h2>
    </div>
  )
}

export default Hand;