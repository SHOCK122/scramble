import { useState } from 'react'

const Tile = ({letter, value}) => {
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div
      className="Tile"
      onClick={() => setIsHidden((prevIsHidden) => false)}
    >
      {isHidden ?
        '' :
        <div className="Tile-content">
          <h1 className="Letter">{letter}</h1>
          <h3 className="Points">{value}</h3>
        </div>
      }
    </div>
  )
}

export default Tile