import { useState, useEffect } from "react"
import Word from "./Word"

const Hand = ({tileset, playerWords, playerName}) => {
  const [total, setTotal] = useState(0)
  let totalScore = 0
  playerWords.map((word) => {
    word.split("").map((letter) => {
      letter = letter.toUpperCase()
      const letterScore = tileset[letter].pts
      totalScore += letterScore
    })
  })
  useEffect(() => {
    setTotal(totalScore)
  })
  return (
    <div className="Hand">
      <h1>{playerName}</h1>
      <h2>Total: {total} points</h2>
      <div className="Words">
        {
          playerWords.map((word, idx) => (
            <Word
              word={word.toUpperCase()}
              tileset={tileset}
              key={`HandWord${playerName}${idx}`}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Hand