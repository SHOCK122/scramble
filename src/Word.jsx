import { useState, useEffect } from "react";
import Tile from "./Tile";

const Word = ( { word, tileset}) => {
  const [score, setScore] = useState(0)
  const tiles = []
  let wordScore = 0
    word.split("").map((letter) => {
    letter = letter.toUpperCase()
    const letterScore = tileset[letter].pts
    tiles.push(<Tile letter={letter} value={letterScore}/>)
    wordScore += letterScore
  })
  useEffect( () => {
    setScore(wordScore)
  })
  return (
    <p className="Word">
      {
        tiles
      }
      <h3>
        {score} points.
      </h3>
    </p>
  )
}

export default Word;