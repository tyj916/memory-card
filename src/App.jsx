import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'
import Game from './components/Game';

function App() {

  return (
    <>
      <div>
        <h1>Title</h1>
        <div>
          <h2>Champions:</h2>
          <Game />
        </div>
      </div>
    </>
  )
}

export default App
