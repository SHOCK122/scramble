import React from "react";
import TileSet from "./TileSet"
import Hand from "./Hand"
import setDefautValues from '../game/defaultValues'

const Board = (props) => {
  let tileset = {
    'blank': { 'pts': 0, 'qty': 2, revealed: 0}
  };

  tileset = setDefautValues(tileset)
  return (
    <div className="Board">
      <TileSet tileset={tileset} />
      <Hand
        tileset={tileset} 
        playerName='Player Name'
        playerWords = {[
          'sample',
          'words',
          'one',
          'two'
        ]}
      />
    </div>
  )

}

export default Board;