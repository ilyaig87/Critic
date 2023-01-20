import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
const API_IMG = 'https://image.tmdb.org/t/p/w500'

const Movies = () => {
  let [movies, setMovies] = useState()
  // console.log(movies)
  useEffect(() => {
    loadMovies()
  }, [])

  async function loadMovies() {
    movies = await movieService.getMovies()
    setMovies(movies)
  }
  return (
    <section id='movies'>
      {movies ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>All Our Movies</h1>
          <div className='movie-container grid'>
            {movies.map((movie) => (
              <div className='movie-card flex center' key={movie.id}>
                <img src={API_IMG + movie.poster_path} alt={movie.title} />
                <Link
                  to={`/movie/${movie.id}`}
                  // to={{ pathname: '/movie/1', state: { id: 1 } }}
                  // onClick={handleShow}
                  className='btn '
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}

export default Movies
