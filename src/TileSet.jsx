import { useEffect, useState } from 'react';
import Tile from './Tile'
import setDefautValues from './tiles'

const TileSet = (props) => {
  let tileset = {
    'blank': { 'pts': 0, 'qty': 2 }
  };

  tileset = setDefautValues(tileset)
  const tilesArray = []
  for (const tile in tileset) {
    for (let i = 0; i < tileset[tile].qty; i++) {
      tilesArray.push(
        <Tile
          letter={tile}
          value={tileset[tile].pts}
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