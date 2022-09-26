import { useState, useEffect } from 'react';
import Tile from './Tile'
import calcRevealed from '../game/calculations'

const TileSet = ({ tileset }) => {
  let totalRevealed = calcRevealed(tileset)
  const tilesArray = []
  for (const tile in tileset) {
    for (let i = 0; i < tileset[tile].qty; i++) {
      tilesArray.push(
        <Tile
          letter={tile}
          value={tileset[tile].pts}
          hide={true}
          tileset={tileset}
          key = {`TilesetTile${tile}${i}`}
        />
      )
    }
  }
  // useEffect(() => {
  //   totalRevealed = calcRevealed(tileset)
  // },[totalRevealed])
  return (
    <div className="TileSet">
      {tilesArray.sort(() => Math.random() - 0.5)}
    </div>
  )
}

export default TileSet;