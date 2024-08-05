import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'
import getRandomChampion from './championData';
import Card from './components/Card';

const INIT_NUM = 5;

function App() {
  const [champions, setChampions] = useState([]);

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
    <>
      <div>
        <h1>Title</h1>
        <div>
          <h2>Champions:</h2>
          <ul>
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
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
