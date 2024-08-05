const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';

function getChampionImageUrl(name) {
  const urlPrefix = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'
  const urlSuffix = '_0.jpg'
  const imageUrl = urlPrefix + name + urlSuffix;

  return imageUrl;
}

async function fetchChampionData() {
  const url = dataDragonUrl;
  const response = await fetch(url, {mode:'cors'});
  const json = await response.json();
  const data = json.data;

  console.log(data);

  const array = [];

  for (let key in data) {
    const id = data[key].id;
    const name = data[key].name;
    const imageUrl = getChampionImageUrl(id);
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

export default getRandomChampion;
