import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'
import Game from './components/Game';

function App() {
  const [score, setScore] = useState(0);

  function addScore() {
    setScore(score + 1);
  }

  return (
    <>
      <div>
        <h1>Title</h1>
        <div>
          <h2>Scoreboard</h2>
          <p>Current Score: {score}</p>
        </div>
        <div>
          <h2>Champions:</h2>
          <Game 
            addScore={addScore}
          />
        </div>
      </div>
    </>
  )
}

export default App
