const baseUrl = `https://api.punkapi.com/v2`

const app = function () {
  makeRequest(`${baseUrl}/beers`, function () {
    if (this.status !== 200) {
      return
    }

    const beers = JSON.parse(this.responseText)
    populateBeersList(beers)
  })
}

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  request.addEventListener('load', callback)
}

const populateBeersList = function (beers) {
  beers.forEach(function (beer) {
    const div = renderBeer(beer)
    document.querySelector('.beers-list').appendChild(div)
  })
}

const renderBeer = function (beer) {
  const div = document.createElement('div')
  div.classList.add('beer')

  const image = document.createElement('img')
  image.src = beer.image_url

  const title = document.createElement('h1')
  title.innerText = beer.name

  const tagline = document.createElement('h2')
  tagline.innerText = beer.tagline

  div.appendChild(image)
  div.appendChild(title)
  div.appendChild(tagline)

  const ingredientsTitle = document.createElement('h3')
  ingredientsTitle.innerText = 'Ingredients'
  div.appendChild(ingredientsTitle)

  const ingredients = getIngredients(beer)

  renderIngredients(div, ingredients)

  return div
}

const renderIngredients = function (container, ingredients) {
  ingredients.forEach(function (ingredient) {
    const p = document.createElement('p')
    p.innerText = ingredient
    container.appendChild(p)
  })
}

const getIngredients = function (beer) {
  const malt = beer.ingredients.malt
  const hops = beer.ingredients.hops
  const yeast = beer.ingredients.yeast

  const ingredients = []

  malt.forEach(function (malt) {
    ingredients.push(malt.name)
  })

  hops.forEach(function (malt) {
    ingredients.push(malt.name)
  })

  ingredients.push(yeast)

  return ingredients
}

document.addEventListener('DOMContentLoaded', app)
