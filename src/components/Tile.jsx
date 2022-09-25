import { useState } from 'react'

const Tile = ({letter, value, hide, tileset}) => {
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div
      className="Tile"
      onClick={() => {
        setIsHidden(false)
        tileset[letter].revealed += 1
      }}
    >
      {(isHidden && hide) ?
        '' :
        <div className="Tile-content">
          <h2 className="Letter">{letter}</h2>
          <h4 className="Points">{value}</h4>
        </div>
      }
    </div>
  )
}

export default Tile