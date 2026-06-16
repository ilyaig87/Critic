import { storageService } from './storage.service'

// TMDB v3 key. Prefer an env var; fall back to the public demo key
// (this is a browser/read-only key, already exposed in every request).
const API_KEY = process.env.REACT_APP_API_KEY || '41b26313fe5f84c44912ea80529a9fd6'
const BASE = 'https://api.themoviedb.org/3'

const API_URL1 = `${BASE}/tv/popular?api_key=${API_KEY}&language=en-US&`
const API_URL = `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&`

export const movieService = {
  getMovies,
  query,
  getTvShows,
  searchAll,
  getMediaById,
}

// The TMDB "popular" list is dynamic, so the same title can show up on
// multiple pages while we paginate. Remove duplicates by id.
function uniqueById(items = []) {
  const seen = new Set()
  return items.filter((item) => {
    if (!item || item.id == null || seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

async function getMovies() {
  let movies = storageService.loadFromStorage('moviesDB')
  if (!movies || movies.length === 0) {
    movies = []
    for (let i = 1; i <= 10; i++) {
      const res = await fetch(API_URL + `page=${i}`)
      try {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()
        movies = [...movies, ...data.results]
      } catch (error) {
        console.error(error)
      }
    }
  }
  movies = uniqueById(movies)
  storageService.saveToStorage('moviesDB', movies)
  return movies
}

async function getTvShows() {
  let tvShows = storageService.loadFromStorage('tvShowsDB')
  if (!tvShows || tvShows.length === 0) {
    tvShows = []
    for (let i = 1; i <= 10; i++) {
      const res = await fetch(API_URL1 + `page=${i}`)
      try {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()
        tvShows = [...tvShows, ...data.results]
      } catch (error) {
        console.error(error)
      }
    }
  }
  tvShows = uniqueById(tvShows)
  storageService.saveToStorage('tvShowsDB', tvShows)
  return tvShows
}

// Fetch full media details straight from TMDB by id, including its trailer.
// Works from a card click, a direct link, or a page refresh (no reliance on
// router state), and never hangs: returns null on failure.
async function getMediaById(mediaId, hint) {
  const looksTv =
    hint &&
    (hint.media_type === 'tv' ||
      !!hint.first_air_date ||
      (!!hint.name && !hint.title))
  const order = looksTv ? ['tv', 'movie'] : ['movie', 'tv']

  for (const type of order) {
    try {
      const url = `${BASE}/${type}/${mediaId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      const res = await fetch(url)
      if (!res.ok) continue

      const data = await res.json()
      const videos = (data.videos && data.videos.results) || []
      const trailer =
        videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
        videos.find((v) => v.site === 'YouTube') ||
        videos[0]

      data.videoKey = trailer ? trailer.key : null
      data.genre = type
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return null
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
  // localStorage.removeItem('searchedDB')
  let url

  url = `${BASE}/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    if (!data.results || data.results.length === 0) {
      throw new Error('No Data Found')
    }
    const results = uniqueById(data.results)
    storageService.saveToStorage('searchedDB', results)
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}
