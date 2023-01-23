import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
// import MovieFilter from '../views/MovieFilter.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const TvShows = () => {
  let [tvShows, setTvShows] = useState()
  console.log(tvShows)

  useEffect(() => {
    loadTvShows()
  }, [])

  async function loadTvShows() {
    tvShows = await movieService.getTvShows()
    setTvShows(tvShows)
  }

  return (
    <section id='movies'>
      {/* <MovieFilter /> */}

      {tvShows ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our New Movies</h1>
          <div className='movie-container grid'>
            {tvShows.map((tVShow) => (
              <div className='movie-card flex center' key={tVShow.id}>
                <img src={API_IMG + tVShow.poster_path} alt={tVShow.title} />
                <Link to={`/tv-show/${tVShow.id}`} className='btn '>
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

export default TvShows
