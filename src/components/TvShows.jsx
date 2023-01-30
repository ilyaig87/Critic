import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import Loader from '../views/Loader.jsx'
import MovieFilter from '../views/MovieFilter.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const TvShows = () => {
  const [filterBy, setFilterBy] = useState({
    tvShowTitle: '',
    rating: '',
    releaseDate: '',
  })

  let [filteredTvShows, setFilteredTvShows] = useState()
  let [tvShows, setTvShows] = useState()
  const navigate = useNavigate()
  const [displayCount, setDisplayCount] = useState(16)

  useEffect(() => {
    loadTvShows()
  }, [])

  useEffect(() => {
    if (tvShows) {
      setFilteredTvShows(tvShows.filter(filterTvShow))
    }
  }, [tvShows, filterBy])

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

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 16)
  }

  const handleSetFilter = (newFilterBy) => {
    setFilterBy(newFilterBy)
  }

  const filterTvShow = (tvShow) => {
    const { movieTitle, rating, releaseDate } = filterBy
    if (
      movieTitle &&
      !tvShow.name.toLowerCase().includes(movieTitle.toLowerCase())
    ) {
      return false
    }
    if (rating && tvShow.vote_average < rating) {
      return false
    }
    // if (releaseDate && tvShow.release_date.substring(0, 4) !== releaseDate) {
    //   return false
    // }
    return true
  }

  return (
    <section id='movies'>
      {filteredTvShows ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our Popular TV Shows</h1>
          <MovieFilter onSetFilter={handleSetFilter} />

          <div className='movie-container grid'>
            {filteredTvShows.slice(0, displayCount).map((tVShow) => {
              if (tVShow.poster_path) {
                return (
                  <div className='movie-card flex center' key={tVShow.id}>
                    <img src={API_IMG + tVShow.poster_path} alt={tVShow.name} />
                    <small>Rate:{tVShow.vote_average.toFixed(1)}</small>
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
      <div className='load-more-btn flex center'>
        <button className='btn' onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </section>
  )
}

export default TvShows
