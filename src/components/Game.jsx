import { useState, useEffect } from "react";
import { fetchChampionData } from "../championData";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
export default function Game({addScore, getCurrentScore}) {
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

        console.log('effect')
      }
    })();

    return () => {
      ignore = true;
    }
  }, []);

  function shuffleCards() {
    const current = champions;

    // given each array item a random value key 
    // by setting them as an object
    // then sort according to the random value key
    // finally return the value
    const shuffled = current
      .map(value => ({value, key: Math.random()}))
      .sort((a, b) => a.key - b.key)
      .map(({value}) => value);
      
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

    console.log('random')
  
    return randomChamps;
  }

  function addCards() {
    const randomChamps = getRandomChampion(5);
    setChampions(champions.concat(randomChamps));
  }

  function clickHandler() {
    console.log(getRandomChampion(5));
  }

  return (
    <div className="game-container">
      <button onClick={clickHandler}>button</button>
      {
        champions ? champions.map(champ => {
          return (
            <Card 
              key={champ.id}
              name={champ.name}
              imageUrl={champ.imageUrl}
              shuffleCards={shuffleCards}
              addScore={addScore}
              getCurrentScore={getCurrentScore}
              addCards={addCards}
            />
          )
        }) : 'Loading...'
      }
    </div>
  );
}