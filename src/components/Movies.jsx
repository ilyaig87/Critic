import React, { useState, useEffect } from 'react'
import { Link, navigate, useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import MovieFilter from '../views/MovieFilter.jsx'
import MediaDetails from './MediaDetails.jsx'
import Loader from '../views/Loader.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const Movies = () => {
  const navigate = useNavigate()
  let [movies, setMovies] = useState()
  useEffect(() => {
    loadMovies()
  }, [])

  const handleReadMore = (result) => {
    navigate(`/show/${result.id}`, {
      state: {
        media: result,
        fromSearch: false,
      },
    })
  }

  async function loadMovies() {
    movies = await movieService.getMovies()
    setMovies(movies)
  }
  return (
    <section id='movies'>
      {/* <MovieFilter /> */}

      {movies ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our New Movies</h1>
          <div className='movie-container grid'>
            {movies.map((movie) => (
              <div className='movie-card flex center' key={movie.id}>
                <img src={API_IMG + movie.poster_path} alt={movie.title} />
                <small>Rate:{movie.vote_average.toFixed(1)}</small>
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
    </section>
  )
}

export default Movies
