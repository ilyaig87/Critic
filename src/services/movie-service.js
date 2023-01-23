import { storageService } from './storage.service'
// import { movieCreate } from './movies.data.js'

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=41b26313fe5f84c44912ea80529a9fd6'

const API_VIDEO =
  'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=41b26313fe5f84c44912ea80529a9fd6&language=en-US'

const SEARCH_MOVIE =
  'https://api.themoviedb.org/3/search/movie?api_key=41b26313fe5f84c44912ea80529a9fd6&language=en-US&page=10&include_adult=false'

async function getMovies() {
  localStorage.removeItem('searchedMoviesDB')

  let movies = storageService.loadFromStorage('moviesDB')
  if (!movies || movies.length === 0) {
    movies = await fetch(API_URL).then((res) => res.json())
    movies = movies.results
    storageService.saveToStorage('moviesDB', movies)
  }
  return movies
}

async function searchMovies(searchQuery) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=41b26313fe5f84c44912ea80529a9fd6&query=${searchQuery}`
  const res = await fetch(url)
  const data = await res.json()
  storageService.saveToStorage('searchedMoviesDB', data.results)

  return data.results
}

// async function getMovies() {
//   return movieCreate.createMovies()
// }

async function getById(movieId) {
  const videoKey = await fetch(API_VIDEO.replace('{movie_id}', movieId))
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        return data.results[0].key
      } else {
        console.log('err')
        return null
      }
    })
  const movies = await storageService.loadFromStorage(
    localStorage.getItem('searchedMoviesDB') !== null
      ? 'searchedMoviesDB'
      : 'moviesDB'
  )
  const idx = movies.findIndex((movie) => movie.id === +movieId)
  const movie = movies[idx]
  movie.videoKey = videoKey
  return movie
}

async function query(filterBy) {
  console.log(filterBy)
  let movies = await storageService.loadFromStorage('moviesDB')

  if (filterBy) {
    // filter by genre
    if (filterBy.genre) {
      movies = movies.filter((movie) =>
        movie.genre_ids.includes(filterBy.genre)
      )
    }

    // filter by release year
    if (filterBy.year) {
      movies = movies.filter(
        (movie) => new Date(movie.release_date).getFullYear() === filterBy.year
      )
    }
  }

  return movies
}

// saveToArray('myArray')
// function saveToArray(key) {
//   let movieArr = storageService.loadFromStorage(key)
//   let myArrayJson = JSON.stringify(movieArr)
//   localStorage.setItem('myArray', myArrayJson)
//   // let myArray = JSON.parse(myArrayJson)
//   // console.log(myArray)
//   return myArray
// }

export const movieService = {
  getMovies,
  getById,
  searchMovies,
  query,
}
