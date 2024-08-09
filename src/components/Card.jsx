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
    currentScore,
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

    if ((currentScore + 1) % 5 === 0) {
      addCards();
    }
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