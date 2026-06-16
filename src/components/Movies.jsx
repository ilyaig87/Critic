import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import MovieFilter from '../views/MovieFilter.jsx'
import Loader from '../views/Loader.jsx'
import Hero from '../views/Hero.jsx'
import MovieCard from '../views/MovieCard.jsx'

const Movies = () => {
  const [filterBy, setFilterBy] = useState({
    movieTitle: '',
    rating: '',
    year: '',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const { movieTitle, rating, year } = filterBy
    if (
      movieTitle &&
      !movie.title.toLowerCase().includes(movieTitle.toLowerCase())
    ) {
      return false
    }
    if (rating && movie.vote_average < rating) {
      return false
    }
    if (year) {
      const date = movie.release_date || movie.first_air_date
      if (!date || date.substring(0, 4) !== year) {
        return false
      }
    }
    return true
  }

  return (
    <>
      <Hero />
      <section id='movies'>
        {filteredMovies ? (
          <div className='container movies-container'>
            <div className='section-head'>
              <span className='eyebrow'>Now Trending</span>
              <h1>Popular Movies</h1>
              <p className='sub'>
                {filteredMovies.length} hand-picked titles from around the world.
                Find your next watch.
              </p>
            </div>

            <MovieFilter onSetFilter={handleSetFilter} />

            <div className='movie-grid grid'>
              {filteredMovies.slice(0, displayCount).map((movie) => (
                <MovieCard
                  key={movie.id}
                  media={movie}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <p className='empty-state'>No titles match your filters.</p>
            )}

            {displayCount < filteredMovies.length && (
              <div className='load-more-btn flex center'>
                <button className='btn btn-primary' onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </section>
    </>
  )
}

export default Movies
