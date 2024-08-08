import { useState, useEffect } from "react";
import getRandomChampion from "../championData";
import Card from "./Card";

export default function Game() {
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

  return (
    <div className="game-container">
      {
        champions ? champions.map(champ => {
          return (
            <Card 
              key={champ.id}
              name={champ.name}
              imageUrl={champ.imageUrl}
            />
          )
        }) : 'Loading...'
      }
    </div>
  );
}