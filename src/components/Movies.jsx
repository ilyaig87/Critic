import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import MovieFilter from '../views/MovieFilter.jsx'
import Loader from '../views/Loader.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const Movies = () => {
  const [filterBy, setFilterBy] = useState({
    movieTitle: '',
    rating: '',
    releaseDate: '',
  })

  const navigate = useNavigate()
  const [displayCount, setDisplayCount] = useState(16)
  let [movies, setMovies] = useState()
  let [filteredMovies, setFilteredMovies] = useState()

  useEffect(() => {
    loadMovies()
  }, [])

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies.filter(filterMovie))
    }
  }, [movies, filterBy])

  const handleReadMore = (result) => {
    navigate(`/show/${result.id}`, {
      state: {
        media: result,
        fromSearch: false,
      },
    })
  }

  async function loadMovies() {
    const movieList = await movieService.getMovies()
    setMovies(movieList)
  }

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 16)
  }

  const handleSetFilter = (newFilterBy) => {
    setFilterBy(newFilterBy)
  }

  const filterMovie = (movie) => {
    const { movieTitle, rating, releaseDate } = filterBy
    if (
      movieTitle &&
      !movie.title.toLowerCase().includes(movieTitle.toLowerCase())
    ) {
      return false
    }
    if (rating && movie.vote_average < rating) {
      return false
    }
    // if (releaseDate && movie.release_date.substring(0, 4) !== releaseDate) {
    //   return false
    // }
    return true
  }

  return (
    <section id='movies'>
      {filteredMovies ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our New Movies</h1>
          <MovieFilter onSetFilter={handleSetFilter} />

          <div className='movie-container grid'>
            {filteredMovies.slice(0, displayCount).map((movie) => (
              <div className='movie-card flex center' key={movie.id}>
                <img src={API_IMG + movie.poster_path} alt={movie.title} />
                <small>Rate: {movie.vote_average.toFixed(1)}</small>
                <button className='btn' onClick={() => handleReadMore(movie)}>
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className='load-more-btn flex center'>
        <button className='btn' onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </section>
  )
}

export default Movies
