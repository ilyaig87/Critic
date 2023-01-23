import { storageService } from './storage.service'
// import { movieCreate } from './movies.data.js'

const API_URL1 = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_TV_SHOW_VIDEO = `https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const API_MOVIE_VIDEO = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}`

// console.log(API_URL)
export const movieService = {
  getMovies,
  getById,
  searchAll,
  query,
  getTvShows,
  getById1,
}
async function getMovies() {
  localStorage.removeItem('searchedAllDB')

  let movies = storageService.loadFromStorage('moviesDB')
  if (!movies || movies.length === 0) {
    movies = await fetch(API_URL).then((res) => res.json())
    movies = movies.results
    storageService.saveToStorage('moviesDB', movies)
  }
  return movies
}

async function getTvShows() {
  localStorage.removeItem('searchedAllDB')

  let tvShows = storageService.loadFromStorage('tvShowsDB')
  if (!tvShows || tvShows.length === 0) {
    tvShows = await fetch(API_URL1).then((res) => res.json())
    tvShows = tvShows.results
    storageService.saveToStorage('tvShowsDB', tvShows)
  }
  return tvShows
}

async function searchAll(searchQuery, selectedMediaType) {
  let url = ''
  if (selectedMediaType === 'movie') {
    console.log(selectedMediaType)
    url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`
  } else if (selectedMediaType === 'tv') {
    console.log(selectedMediaType)
    url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`
  }
  const res = await fetch(url)
  const data = await res.json()
  return data.results
}

async function getById(movieId) {
  const videoKey = await fetch(API_MOVIE_VIDEO.replace('{movie_id}', movieId))
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
    localStorage.getItem('searchedAllDB') !== null
      ? 'searchedAllDB'
      : 'moviesDB'
  )
  const idx = movies.findIndex((movie) => movie.id === +movieId)
  const movie = movies[idx]
  movie.videoKey = videoKey
  return movie
}

async function getById1(tvShowId) {
  const videoKey = await fetch(API_TV_SHOW_VIDEO.replace('{tv_id}', tvShowId))
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        return data.results[0].key
      } else {
        console.log('err')
        return null
      }
    })
  const tvShows = await storageService.loadFromStorage(
    localStorage.getItem('searchedAllDB') !== null
      ? 'searchedAllDB'
      : 'tvShowsDB'
  )
  const idx = tvShows.findIndex((tvShow) => tvShow.id === +tvShowId)
  const tvShow = tvShows[idx]
  tvShow.videoKey = videoKey
  return tvShow
}

async function query(filterBy) {
  // console.log(filterBy)
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

// async function searchMovies(searchQuery) {
//   const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`
//   const res = await fetch(url)
//   const data = await res.json()
//   storageService.saveToStorage('searchedMoviesDB', data.results)

//   return data.results
// }

// async function getMovies() {
//   return movieCreate.createMovies()
// }
