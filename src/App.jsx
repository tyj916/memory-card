import { useState } from 'react'
import 'normalize.css'
import './App.css'
import Game from './components/Game';

function App() {
  const [currentScore, setCurrentScore] = useState(0);

  function addScore() {
    setCurrentScore(currentScore + 1);
  }

  return (
    <>
      <div>
        <h1>Title</h1>
        <div>
          <h2>Scoreboard</h2>
          <p>Current Score: {currentScore}</p>
        </div>
        <div>
          <h2>Champions:</h2>
          <Game 
            addScore={addScore}
            currentScore={currentScore}
          />
        </div>
      </div>
    </>
  )
}

export default App
