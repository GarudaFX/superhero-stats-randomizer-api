//SuperHero APP  ------------------------------------------------------------
//SuperHero API url = https://superheroapi.com/api/602893128119582

const newHero = document.getElementById('newHero');
const heroImg = document.getElementById('heroImg');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search');
const heroName = document.getElementById('heroName');
const heroStrength = document.getElementById('heroStrength');

const SUPERHERO_TOKEN = 602893128119582;
const BASE_ID = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const randomHero = () => {
    const numberOfHeroes = 731
    const randomHeroId = Math.ceil(Math.random() * numberOfHeroes);

    return randomHeroId;
}

const getRandomSuperHero = (id,name) => {
    fetch(`${BASE_ID}/${id}`)
    .then(response => response.json())
    .then(json => {
        const stats = getStatsHTML(json)
        const heroName = `<h1>Name: ${json.name}</h1>`;
        heroImg.innerHTML = `<img src= "${json.image.url}" width=200 height=200/>${heroName}${stats}`;
    })
}

const getSearchSuperHero = (name) => {
    fetch(`${BASE_ID}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const superHero = json.results[1]
        if(superHero == undefined) {
            heroImg.innerHTML = `<h1>${json.response.error}</h1>`
        }
        const stats = getStatsHTML(json.results[1])
        const heroName = `<h1>Name: ${superHero.name}</h1>`;
        heroImg.innerHTML = `<img src= "${superHero.image.url}" width=200 height=200>${heroName}${stats}`;
    })
}

const getStatsHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat => {
      return `<p><b>${stat}:</b> ${character.powerstats[stat]}</p>`
    })
    return stats.join('')
}

newHero.addEventListener("click", () => {
    getRandomSuperHero(randomHero());
})

searchBtn.addEventListener("click", () => getSearchSuperHero(searchBar.value));