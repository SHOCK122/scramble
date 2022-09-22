import React from "react";
import Tile from "./Tile";

const Word = ({word}) => {
  return (
    <p className="Word">
      {
        word.split("").map((letter) => (
          <Tile letter={letter.toUpperCase()}/>
        ))
      }
    </p>
  )
}

export default Word;