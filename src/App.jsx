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
        <header>
          <div className='intro'>
            <h1>Project: Memory Card Game</h1>
            <p className="description">Get points by clicking a card that isn&apos;t selected before. Try getting as high score as possible.</p>
          </div>
          <div className='scoreboard'>
            <h2>Scoreboard</h2>
            <p>Current Score: {currentScore}</p>
            <p>Best Score: {bestScore}</p>
          </div>
        </header>
        
        <div className='game-container'>
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
