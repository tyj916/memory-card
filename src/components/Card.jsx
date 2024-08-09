/* eslint-disable react/prop-types */
import { useState } from "react";

function gameover() {
  console.log('Game over');
}

export default function Card({
    name, 
    imageUrl, 
    shuffleCards, 
    addScore, 
    getCurrentScore,
    addCards
  }) {
  const [isClicked, setIsClicked] = useState(false);

  function clickHandler() {
    if (isClicked) {
      gameover();
      return;
    }

    setIsClicked(true);

    shuffleCards();
    addScore();
    
    const currentScore = getCurrentScore() + 1;
    console.log(currentScore);
    addCards();
  }

  return (
    <button 
      type="button" 
      className="card"
      onClick={clickHandler}>
      <img src={imageUrl} alt='' />
      <h2>{name}</h2>
    </button>
  );
}