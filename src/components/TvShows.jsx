import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import Loader from '../views/Loader.jsx'
import MovieFilter from '../views/MovieFilter.jsx'
import MovieCard from '../views/MovieCard.jsx'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tvShows) {
      setFilteredTvShows(tvShows.filter(filterTvShow))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const { movieTitle, rating } = filterBy
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
          <div className='section-head'>
            <span className='eyebrow'>Binge-worthy</span>
            <h1>Popular TV Shows</h1>
            <p className='sub'>
              The series everyone is talking about, right now.
            </p>
          </div>

          <MovieFilter onSetFilter={handleSetFilter} />

          <div className='movie-grid grid'>
            {filteredTvShows
              .filter((tv) => tv.poster_path)
              .slice(0, displayCount)
              .map((tVShow) => (
                <MovieCard
                  key={tVShow.id}
                  media={tVShow}
                  onReadMore={handleReadMore}
                />
              ))}
          </div>

          {displayCount < filteredTvShows.length && (
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
  )
}

export default TvShows
