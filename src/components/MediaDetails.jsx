import React, { useState, useEffect } from 'react'
import { movieService } from '../services/movie-service'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoIosStar, IoIosArrowBack } from 'react-icons/io'
import { FiCalendar, FiFilm, FiClock } from 'react-icons/fi'
import moment from 'moment-timezone'
import Loader from '../views/Loader.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'
const API_IMG_LG = 'https://image.tmdb.org/t/p/original'
const FALLBACK = require('../assets/images/no-photo.png')

const MediaDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const [media, setMedia] = useState(null) // null = loading, false = error
  const [showFullText, setShowFullText] = useState(false)

  useEffect(() => {
    let active = true
    window.scrollTo(0, 0)
    setMedia(null)
    movieService
      .getMediaById(+id, location.state?.media)
      .then((data) => active && setMedia(data || false))
      .catch(() => active && setMedia(false))
    return () => {
      active = false
    }
  }, [id, location.state])

  const convertDate = (date) => {
    if (!date) return 'Unknown'
    return moment(date).format('MMM D, YYYY')
  }

  const formatRuntime = (min) => {
    if (!min) return null
    const h = Math.floor(min / 60)
    const m = min % 60
    return h ? `${h}h ${m}m` : `${m}m`
  }

  if (media === null) return <Loader />

  if (media === false) {
    return (
      <div className='container detail-error fade-up'>
        <h2>We couldn&apos;t load this title.</h2>
        <p>It may have been removed, or the connection failed.</p>
        <Link to='/' className='btn btn-primary'>
          <IoIosArrowBack /> Back to browse
        </Link>
      </div>
    )
  }

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
  const runtime = formatRuntime(
    media.runtime || (media.episode_run_time && media.episode_run_time[0])
  )
  const genres = media.genres || []

  return (
    <div className='media-details fade-up'>
      <div className='backdrop' style={{ backgroundImage: `url(${backdrop})` }}>
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
            {runtime && (
              <span className='tag'>
                <FiClock /> {runtime}
              </span>
            )}
          </div>

          <h1 className='movie-title'>{title}</h1>

          {media.tagline && <p className='tagline'>“{media.tagline}”</p>}

          {genres.length > 0 && (
            <div className='genres'>
              {genres.map((g) => (
                <span className='genre-chip' key={g.id}>
                  {g.name}
                </span>
              ))}
            </div>
          )}

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
