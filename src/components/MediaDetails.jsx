import React, { useState, useEffect } from 'react'
import { movieService } from '../services/movie-service'
import { Link, useLocation, useParams } from 'react-router-dom'
import moment from 'moment-timezone'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

const MediaDetails = () => {
  const location = useLocation()
  const [media, setMedia] = useState(null)
  const [showFullText, setShowFullText] = useState(false)
  const handleReadMore = () => {
    setShowFullText(!showFullText)
  }

  useEffect(() => {
    movieService
      .getMediaById(+location.state.id, location.state)
      .then((data) => setMedia(data))
  }, [])

  const convertDate = (date) => {
    const americaTime = moment.tz(date, 'America/New_York')
    const israelTime = americaTime.clone().tz('Asia/Jerusalem')
    return israelTime.format('DD-MM-YYYY')
  }

  return (
    <div className='container movie-details-container flex center'>
      {media ? (
        <div className='card-container flex column center'>
          {media.name ? (
            <h1 className='movie-title'>{media.name.substring(0, 25)}</h1>
          ) : (
            <h1 className='movie-title'>{media.title.substring(0, 25)}</h1>
          )}
          {media.backdrop_path ? (
            <img
              className='card-img'
              src={API_IMG + media.backdrop_path}
              alt=''
            />
          ) : (
            <img
              className='card-img'
              src={API_IMG + media.poster_path}
              alt=''
            />
          )}
          <span>{media.vote_average}</span>
          <div className='movie-video'>
            <h3>Watch the trailer</h3>
            {media.videoKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${media.videoKey}`}
              ></iframe>
            ) : (
              <p className='no-video'>Can't Load The Video</p>
            )}
          </div>
          <div className='movie-text'>
            <p className={`${!showFullText ? 'limited-lines' : ''}`}>
              {media.overview}
            </p>
            <button className='btn read-more-btn' onClick={handleReadMore}>
              {showFullText ? 'Read Less' : 'Read More'}
            </button>
            <h5>Movie Release Date: {convertDate(media.release_date)}</h5>
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

export default MediaDetails
