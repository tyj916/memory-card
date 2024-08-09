import { useState, useEffect } from "react";
import { fetchChampionData } from "../championData";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
export default function Game({addScore, currentScore}) {
  const [championData, setChampionData] = useState(null);
  const [champions, setChampions] = useState(null);
  const INIT_NUM = 5;

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

  function getRandomChampion(num) {
    const data = championData;
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

  return (
    <div className="game-container">
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
            />
          )
        }) : 'Loading...'
      }
    </div>
  );
}