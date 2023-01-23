import React from 'react'
import { movieService } from '../services/movie-service.js'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'

const TvShowsDetails = () => {
  let [tvShow, setTvShow] = useState(null)
  const API_IMG = 'https://image.tmdb.org/t/p/w500'

  const [showFullText, setShowFullText] = useState(false)
  const handleReadMore = () => {
    setShowFullText(!showFullText)
  }

  const params = useParams()

  useEffect(() => {
    getTvShow()
  }, [])

  async function getTvShow() {
    const { tvShowId } = params
    tvShow = await movieService.getById1(+tvShowId)
    setTvShow(tvShow)
  }

  const convertDate = (date) => {
    const americaTime = moment.tz(date, 'America/New_York')
    const israelTime = americaTime.clone().tz('Asia/Jerusalem')
    return israelTime.format('DD-MM-YYYY')
  }

  return (
    <div className='container movie-details-container flex center'>
      {tvShow ? (
        <div className='card-container flex column center'>
          <h1 className='movie-title'>{tvShow.name.substring(0, 25)}</h1>
          {tvShow.backdrop_path ? (
            <img
              className='card-img'
              src={API_IMG + tvShow.backdrop_path}
              alt=''
            />
          ) : (
            <img
              className='card-img'
              src={API_IMG + tvShow.poster_path}
              alt=''
            />
          )}
          <span>{tvShow.vote_average}</span>
          {}
          <div className='movie-video'>
            <h3>Watch the trailer</h3>
            <iframe
              src={`https://www.youtube.com/embed/${tvShow.videoKey}`}
            ></iframe>
          </div>
          <div className='movie-text'>
            <p className={`${!showFullText ? 'limited-lines' : ''}`}>
              {tvShow.overview}
            </p>
            <button className='btn read-more-btn' onClick={handleReadMore}>
              {showFullText ? 'Read Less' : 'Read More'}
            </button>
            <h5>Movie Release Date: {convertDate(tvShow.release_date)}</h5>
            <Link to={`/`} className='btn btn-primary'>
              Go Back
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default TvShowsDetails
