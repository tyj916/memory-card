import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';
const INIT_NUM = 5;

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
  const championList = [];
  let count = 0;

  while (count < number) {
    const randomInt = Math.floor(Math.random() * championsData.length);
    if (!championList.includes(championsData[randomInt])) {
      championList.push(championsData[randomInt]);
      count++;
    }
  }

  return championList;
}

function App() {
  const [champions, setChampions] = useState();

  useEffect(() => {
    async function updateChampions() {
      setChampions(await generateRandomChampions(INIT_NUM));
    }

    updateChampions();
  }, []);

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
