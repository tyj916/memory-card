import { useState, useEffect } from "react";
import getRandomChampion from "../championData";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
export default function Game({addScore, getCurrentScore}) {
  const [champions, setChampions] = useState([]);
  const INIT_NUM = 5;

  useEffect(() => {
    let ignore = false;
    (async () => {
      const randomChamps = await getRandomChampion(INIT_NUM);
      if (!ignore) {
        setChampions(randomChamps);
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

  function addCards() {
    (async () => {
      const randomChamps = await getRandomChampion(5);
      setChampions(champions.concat(randomChamps));
    })();
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
              getCurrentScore={getCurrentScore}
              addCards={addCards}
            />
          )
        }) : 'Loading...'
      }
    </div>
  );
}