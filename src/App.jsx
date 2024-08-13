import { useState } from 'react'
import 'normalize.css'
import './App.css'
import Game from './components/Game';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function addScore() {
    setCurrentScore(currentScore + 1);

    if (currentScore + 1 >= bestScore ) {
      setBestScore(currentScore + 1);
    }
  }

  function resetCurrentScore() {
    setCurrentScore(0);
  }

  return (
    <>
      <div>
        <h1>Title</h1>
        <div className='scoreboard'>
          <h2>Scoreboard</h2>
          <p>Best Score: {bestScore}</p>
          <p>Current Score: {currentScore}</p>
        </div>
        <div className='game'>
          <h2>Champions:</h2>
          <Game 
            addScore={addScore}
            currentScore={currentScore}
            resetCurrentScore={resetCurrentScore}
            bestScore={bestScore}
          />
        </div>
      </div>
    </>
  )
}

export default App
