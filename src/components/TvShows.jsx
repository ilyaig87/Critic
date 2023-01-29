import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import Loader from '../views/Loader.jsx'
// import MovieFilter from '../views/MovieFilter.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const TvShows = () => {
  const navigate = useNavigate()
  let [tvShows, setTvShows] = useState()
  // console.log(tvShows)
  useEffect(() => {
    loadTvShows()
  }, [])

  const handleReadMore = (result) => {
    navigate(`/show/${result.id}`, {
      state: {
        media: result,
        fromSearch: false,
      },
    })
  }

  async function loadTvShows() {
    tvShows = await movieService.getTvShows()
    setTvShows(tvShows)
  }

  return (
    <section id='movies'>
      {/* <MovieFilter /> */}

      {tvShows ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our Popular TV Shows</h1>
          <div className='movie-container grid'>
            {tvShows.map((tVShow) => {
              if (tVShow.poster_path) {
                return (
                  <div className='movie-card flex center' key={tVShow.id}>
                    <img
                      src={API_IMG + tVShow.poster_path}
                      alt={tVShow.title}
                    />
                    <small>Rate:{tVShow.vote_average}</small>
                    <button
                      className='btn'
                      onClick={() => handleReadMore(tVShow)}
                    >
                      Read More
                    </button>
                  </div>
                )
              }
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  )
}

export default TvShows
