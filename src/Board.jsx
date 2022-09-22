import React from "react";
import TileSet from "./TileSet"
import Hand from "./Hand"

const Board = (props) => {
  return (
    <div className="Board">
      <TileSet />
      <Hand
        playerName='Player Name'
        playerWords='should be list of word components that display words that belong to player'
      />
    </div>
  )

}

export default Board;