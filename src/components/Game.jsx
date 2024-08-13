/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchChampionData } from "../championData";
import Card from "./Card";
import './Game.css';

export default function Game({
  addScore, 
  currentScore,
  resetCurrentScore,
  bestScore
}) {
  const [championData, setChampionData] = useState(null);
  const [champions, setChampions] = useState(null);
  const INIT_NUM = 10;

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!ignore) {
        const data = await fetchChampionData();
        data.map(value => ({...value, isShown: false})) ;

        const randomChamps = [];
        let count = 0;

        while (count < INIT_NUM) {
          const randomInt = Math.floor(Math.random() * data.length);
          if (!data[randomInt].isShown) {
            randomChamps.push(data[randomInt]);
            data[randomInt].isShown = true;
            count++;
          }
        }

        setChampionData(data);
        setChampions(randomChamps);
      }
    })();

    return () => {
      ignore = true;
    }
  }, []);

  function shuffleArray(array) {
    // given each array item a random value key 
    // by setting them as an object
    // then sort according to the random value key
    // finally return the value
    return (array
      .map(value => ({value, key: Math.random()}))
      .sort((a, b) => a.key - b.key)
      .map(({value}) => value));
  }

  // Decouple function to avoid useState setChampions collision
  function shuffleCards() {
    const shuffled = shuffleArray(champions);
      
    setChampions(shuffled);
  }

  function getRandomChampion(num, newChampionData) {
    const data = newChampionData || championData;
    const randomChamps = [];
    let count = 0;
  
    while (count < num) {
      const randomInt = Math.floor(Math.random() * championData.length);
      if (!data[randomInt].isShown) {
        randomChamps.push(data[randomInt]);
        data[randomInt].isShown = true;
        count++;
      }
    }

    setChampionData(data);
  
    return randomChamps;
  }

  function addCards() {
    const number = championData.length - champions.length < 5
      ? (championData.length - champions.length)
      : 5;
    const randomChamps = getRandomChampion(number);
    const concatenatedChampions = champions.concat(randomChamps);
    const shuffledChampions = shuffleArray(concatenatedChampions);
    setChampions(shuffledChampions);
  }

  function resetGame() {
    resetCurrentScore();

    const resetData = championData;
    resetData.forEach(element => {
      element.isShown = false;
    });

    setChampionData(resetData);

    const newRandomChampions = getRandomChampion(INIT_NUM, resetData);
    setChampions(newRandomChampions);
  }

  const dialog = document.querySelector('dialog');

  function showGameoverDialog() {
    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
    resetGame();
  }

  return (
    <>
      <div className="cards-container">
        {
          champions ? champions.map(champ => {
            return (
              <Card 
                key={champ.id}
                name={champ.name}
                imageUrl={champ.imageUrl}
                shuffleCards={shuffleCards}
                addScore={addScore}
                currentScore={currentScore}
                addCards={addCards}
                showGameoverDialog={showGameoverDialog}
              />
            )
          }) : 'Loading...'
        }
      </div>
      <dialog id="game-over-dialog">
        <h2>Game Over!</h2>
        <p>Score: {currentScore}</p>
        <p>Personal best: {bestScore}</p>
        <button type='button' onClick={closeDialog}>Close</button>
      </dialog>
    </>
  );
}