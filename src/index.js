import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Scramble from './game/Scramble';

const root = ReactDOM.createRoot(document.getElementById('root'));
const game = new Scramble();
console.log(game.PLAYERS)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
