function getChampionImageUrl(name) {
  const urlPrefix = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/'
  const urlSuffix = '.png'
  const imageUrl = urlPrefix + name + urlSuffix;

  return imageUrl;
}

async function fetchChampionData() {
  const url = 'https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json';
  const response = await fetch(url, {mode:'cors'});
  const json = await response.json();
  const data = json.data;

  const array = [];

  for (let key in data) {
    const id = data[key].id;
    const name = data[key].name;
    const imageUrl = getChampionImageUrl(id);
    array.push({id, name, imageUrl});
  }

  return array;
}

export { fetchChampionData };
