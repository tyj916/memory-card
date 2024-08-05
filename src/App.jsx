import { useEffect, useState } from 'react'
import 'normalize.css'
import './App.css'
import Card from './components/Card';

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';
const INIT_NUM = 5;

async function fetchChampionData() {
  const url = dataDragonUrl;
  const response = await fetch(url, {mode:'cors'});
  const json = await response.json();
  const data = json.data;

  const array = [];

  for (let key in data) {
    const id = data[key].id;
    const name = data[key].name;
    const imageUrl = getChampionImageUrl(name);
    array.push({id, name, imageUrl});
  }

  return array;
}

async function getRandomChampion(num) {
  const championData = await fetchChampionData();
  const randomChamps = [];
  let count = 0;

  while (count < num) {
    const randomInt = Math.floor(Math.random() * championData.length);
    if (!randomChamps.includes(championData[randomInt])) {
      randomChamps.push(championData[randomInt]);
      count++;
    }
  }

  return randomChamps;
}

function getChampionImageUrl(name) {
  const urlPrefix = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'
  const urlSuffix = '_0.jpg'
  const imageUrl = urlPrefix + name + urlSuffix;

  return imageUrl;
}

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
