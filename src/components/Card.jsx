import { useState } from "react";

function gameover() {
  console.log('Game over');
}

// eslint-disable-next-line react/prop-types
export default function Card({name, imageUrl, shuffleCard}) {
  const [isClicked, setIsClicked] = useState(false);

  function clickHandler(e) {
    if (isClicked) {
      gameover();
      return;
    }

    setIsClicked(true);

    shuffleCard();
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