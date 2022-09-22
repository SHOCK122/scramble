import { useState } from 'react';
import './App.css';

const Tile = (props) => {
  // const [counter, setCounter] = useState(0)
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div className="Tile">
      <h1>{props.letter}</h1>
      {/* <h2>{props.value}</h2> */}
      <p>{props.value}</p>
      <button
        onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? 'Hidden' : 'Revealed'}
      </button>
    </div>
  )
}

const Word = (props) => {
  return (
    <p>
      {props.word}
    </p>
  )
}

const Hand = (props) => {
  return (
    <div className="Hand">
      <h1>{props.playerName}</h1>
      <h2>{props.playerWords}</h2>
    </div>
  )
}

const TileSet = (props) => {
  return (
    <>
      should return all tiles and display them randomly
      <Tile
        letter = 'X'
        value = {8}
      />
    </>
  )
}

const Board = (props) => {
  return (
    <div className="Board">
      <TileSet />
      <Hand
        playerName='SHOCK'
        playerWords='should be list of word components that display words that belong to player'
      />
    </div>
  )
  
}

const App = () => {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
