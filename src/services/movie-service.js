import { storageService } from './storage.service'
// import { movieCreate } from './movies.data.js'
const API_URL1 = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_TV_SHOW_VIDEO = `https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const API_MOVIE_VIDEO = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`

export const movieService = {
  getMovies,
  getByShowId,
  getByMovieId,
  query,
  getTvShows,
  searchAll,
  // searchMovies,
  // searchTvShows,
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

// async function searchTvShows(searchQuery) {
//   const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`
//   try {
//     const res = await fetch(url)
//     if (!res.ok) {
//       throw new Error(res.statusText)
//     }
//     const data = await res.json()
//     storageService.saveToStorage('searchedTvShowsDB', data.results)
//     return data.results
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }

// async function searchMovies(searchQuery) {
//   const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`
//   try {
//     const res = await fetch(url)
//     if (!res.ok) {
//       throw new Error(res.statusText)
//     }
//     const data = await res.json()
//     storageService.saveToStorage('searchedMoviesDB', data.results)
//     return data.results
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }

// async function getMovies() {
//   return movieCreate.createMovies()
// }

// async function getById(movieId) {
//   const videoKey = await fetch(API_MOVIE_VIDEO.replace('{movie_id}', movieId))
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.results.length > 0) {
//         return data.results[0].key
//       } else {
//         console.log('err')
//         return null
//       }
//     })
//   const movies = await storageService.loadFromStorage(
//     localStorage.getItem('searchedMoviesDB') !== null
//       ? 'searchedMoviesDB'
//       : 'moviesDB'
//   )
//   const idx = movies.findIndex((movie) => movie.id === +movieId)
//   const movie = movies[idx]
//   movie.videoKey = videoKey
//   return movie
// }

async function getByShowId(tvShowId) {
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
    localStorage.getItem('searchedTvShowDB') !== null
      ? 'searchedTvShowDB'
      : 'tvShowsDB'
  )
  const idx = tvShows.findIndex((tvShow) => tvShow.id === +tvShowId)
  const tvShow = tvShows[idx]
  tvShow.videoKey = videoKey
  return tvShow
}

async function getByMovieId(movieId) {
  const url = API_MOVIE_VIDEO.replace('{movie_id}', movieId)
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    if (data.results.length === 0) {
      return null
    }
    if (null) {
    }
    const videoKey = data.results[0].key
    let movies = storageService.loadFromStorage(
      localStorage.getItem('searchedMoviesDB') !== null
        ? 'searchedMoviesDB'
        : 'moviesDB'
    )
    const idx = movies.findIndex((movie) => movie.id === +movieId)
    if (idx === -1) {
      return null
    }
    const movie = movies[idx]
    movie.videoKey = videoKey
    return movie
  } catch (error) {
    console.error(error)
    return null
  }
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
    storageService.saveToStorage('searchedMoviesDB', data.results)
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}
