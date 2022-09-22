import React from 'react';
import Tile from './Tile'

const TileSet = ({ tileset }) => {
  const tilesArray = []
  for (const tile in tileset) {
    for (let i = 0; i < tileset[tile].qty; i++) {
      tilesArray.push(
        <Tile
          letter={tile}
          value={tileset[tile].pts}
          hide={true}
        />
      )
    }
  }

  return (
    <div className="TileSet">
      {tilesArray.sort(() => Math.random() - 0.5)}
    </div>
  )
}

export default TileSet;