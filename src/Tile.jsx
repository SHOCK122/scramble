import { useState } from 'react'

const Tile = ({letter, value, hide}) => {
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div
      className="Tile"
      onClick={() => setIsHidden((prevIsHidden) => false)}
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