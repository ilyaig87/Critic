import { storageService } from './storage.service'

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=41b26313fe5f84c44912ea80529a9fd6'

async function getMovies() {
  let movies = storageService.loadFromStorage('moviesDB')
  if (!movies || movies.length === 0) {
    movies = await fetch(API_URL).then((res) => res.json())
    movies = movies.results
    storageService.saveToStorage('moviesDB', movies)
  } else {
  }
  return movies
}
async function getById(movieId) {
  const movies = await storageService.loadFromStorage('moviesDB')
  const idx = movies.findIndex((movie) => movie.id === +movieId)
  const movie = movies[idx]
  return movie
}

export const movieService = {
  getMovies,
  getById,
}
