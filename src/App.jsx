import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';
const INIT_NUM = 5;

function GetChampionsData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
      let ignore = false;

      (async () => {
        const response = await fetch(url, {mode: 'cors'});
        const json = await response.json();
        const champions = json.data;
        
        if (!ignore) {
          const array = []

          for (let key in champions) {
            array.push(champions[key]);
          }

          setData(array);
        }
      })();

      return () => {
        ignore = true;
      }
    }, [url]);

    return data;
}

function App() {
  // const [champions, setChampions] = useState();

  const champions = GetChampionsData(dataDragonUrl);

  return (
    <>
      <div>
        <h1>Hello! World!</h1>
        <div>
          <h2>Champions:</h2>
          <ul>
            {
              champions ? champions.map(champ => {
                return (
                  <li key={champ.id}>
                    {champ.name}
                  </li>
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
