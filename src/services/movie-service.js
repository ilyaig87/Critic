import { storageService } from './storage.service'
const API_URL1 = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_TV_SHOW_VIDEO = `https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const API_MOVIE_VIDEO = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`

export const movieService = {
  getMovies,
  query,
  getTvShows,
  searchAll,
  getMediaById,
}

async function getMovies() {
  let movies = storageService.loadFromStorage('moviesDB')
  if (!movies || movies.length === 0) {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      movies = data.results
      storageService.saveToStorage('moviesDB', movies)
    } catch (error) {
      console.error(error)
      return []
    }
  }
  return movies
}

async function getTvShows() {
  let tvShows = storageService.loadFromStorage('tvShowsDB')
  if (!tvShows || tvShows.length === 0) {
    try {
      const res = await fetch(API_URL1)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      tvShows = data.results
      storageService.saveToStorage('tvShowsDB', tvShows)
    } catch (error) {
      console.error(error)
      return []
    }
  }
  return tvShows
}

async function getMediaById(mediaId, show, fromSearch) {
  let url, data, genre
  if (fromSearch) {
    data = await storageService.loadFromStorage('searchedDB')
    if (show.media_type === 'tv') {
      url = API_TV_SHOW_VIDEO.replace('{tv_id}', mediaId)
      genre = 'tv'
    } else {
      url = API_MOVIE_VIDEO.replace('{movie_id}', mediaId)
      genre = 'movie'
    }
  } else if (show.first_air_date) {
    data = await storageService.loadFromStorage('tvShowsDB')
    url = API_TV_SHOW_VIDEO.replace('{tv_id}', mediaId)
    genre = 'tv'
  } else {
    data = await storageService.loadFromStorage('moviesDB')
    url = API_MOVIE_VIDEO.replace('{movie_id}', mediaId)
    genre = 'movie'
  }

  const videoKey = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        return data.results[0].key
      } else {
        console.log('err')
        return null
      }
    })
  const idx = data.findIndex((media) => media.id === mediaId)
  if (idx === -1) {
    return null
  }
  const media = data[idx]
  media.videoKey = videoKey
  media.genre = genre
  return media
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

async function searchAll(searchQuery) {
  let url

  url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    if (!data.results || data.results.length === 0) {
      throw new Error('No Data Found')
    }
    storageService.saveToStorage('searchedDB', data.results)
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}
