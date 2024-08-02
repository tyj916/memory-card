import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';

async function getChampionsData() {
  try {
    const response = await fetch(dataDragonUrl, {mode: 'cors'});
    const championsData = (await response.json()).data;
    const array = [];

    for (let key in championsData) {
      array.push(championsData[key]);
    }

    return array;
  } catch(err) {
    console.error(err);
  }
}

async function generateRandomChampions(number) {
  const championsData = await getChampionsData();
  return championsData.slice(0, number);
}

function App() {
  const [champions, setChampions] = useState();

  // initialize app
  (async () => setChampions(await generateRandomChampions(5)))();

  return (
    <>
      <div>
        <h1>Hello! World!</h1>
        <div>
          <h2>Champions:</h2>
          <ul>
            {
              champions.map(champ => {
                return (
                  <li key={champ.id}>
                    {champ.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
