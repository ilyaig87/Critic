import React, { useState, useEffect } from 'react'
import { movieService } from '../services/movie-service'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoIosStar, IoIosArrowBack } from 'react-icons/io'
import { FiCalendar, FiFilm } from 'react-icons/fi'
import moment from 'moment-timezone'
import Loader from '../views/Loader.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'
const API_IMG_LG = 'https://image.tmdb.org/t/p/original'
const FALLBACK = require('../assets/images/no-photo.png')

const MediaDetails = () => {
  const location = useLocation()
  const [media, setMedia] = useState(null)
  const [showFullText, setShowFullText] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    movieService
      .getMediaById(+id, location.state.media, location.state.fromSearch)
      .then((data) => setMedia(data))
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const convertDate = (date) => {
    if (!date) return 'Unknown'
    const americaTime = moment.tz(date, 'America/New_York')
    const israelTime = americaTime.clone().tz('Asia/Jerusalem')
    return israelTime.format('MMM D, YYYY')
  }

  if (!media) return <Loader />

  const title = media.name || media.title || 'Untitled'
  const date = media.release_date || media.first_air_date
  const rating = media.vote_average ? media.vote_average.toFixed(1) : 'N/A'
  const backdrop = media.backdrop_path
    ? API_IMG_LG + media.backdrop_path
    : media.poster_path
    ? API_IMG_LG + media.poster_path
    : FALLBACK
  const poster = media.poster_path ? API_IMG + media.poster_path : FALLBACK
  const isTv = media.genre === 'tv' || !!media.first_air_date

  return (
    <div className='media-details fade-up'>
      <div
        className='backdrop'
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className='backdrop-veil' />
      </div>

      <div className='container detail-card'>
        <div className='poster-col'>
          <img src={poster} alt={title} className='poster' />
        </div>

        <div className='info-col'>
          <div className='tags'>
            <span className='tag type'>
              <FiFilm /> {isTv ? 'TV Series' : 'Movie'}
            </span>
            <span className='tag rating'>
              <IoIosStar /> {rating}
            </span>
            <span className='tag date'>
              <FiCalendar /> {convertDate(date)}
            </span>
          </div>

          <h1 className='movie-title'>{title}</h1>

          <p className={`overview ${!showFullText ? 'limited-lines' : ''}`}>
            {media.overview || 'No overview available for this title.'}
          </p>

          {media.overview && media.overview.length > 220 && (
            <button
              className='read-more-link'
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          )}

          <div className='trailer'>
            <h3>Trailer</h3>
            {media.videoKey ? (
              <div className='video-frame'>
                <iframe
                  src={`https://www.youtube.com/embed/${media.videoKey}`}
                  title='trailer'
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className='no-video'>No trailer available for this title.</p>
            )}
          </div>

          <Link to='/' className='btn back-btn'>
            <IoIosArrowBack /> Back to browse
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MediaDetails
