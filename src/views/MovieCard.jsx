import { IoIosStar } from 'react-icons/io'
import { FiPlay } from 'react-icons/fi'

const API_IMG = 'https://image.tmdb.org/t/p/w500'
const FALLBACK = require('../assets/images/no-photo.png')

const MovieCard = ({ media, onReadMore }) => {
  const title = media.title || media.name || 'Untitled'
  const date = media.release_date || media.first_air_date
  const year = date ? date.substring(0, 4) : '—'
  const rating =
    typeof media.vote_average === 'number' ? media.vote_average.toFixed(1) : null
  const poster = media.poster_path ? API_IMG + media.poster_path : FALLBACK

  const ratingClass =
    rating >= 7.5 ? 'high' : rating >= 6 ? 'mid' : 'low'

  return (
    <article className='movie-card' onClick={() => onReadMore(media)}>
      <div className='poster'>
        <img src={poster} alt={title} loading='lazy' />

        {rating && (
          <span className={`rating-badge ${ratingClass}`}>
            <IoIosStar /> {rating}
          </span>
        )}

        <div className='overlay'>
          <button
            className='btn btn-primary play-btn'
            onClick={(e) => {
              e.stopPropagation()
              onReadMore(media)
            }}
          >
            <FiPlay /> Details
          </button>
        </div>
      </div>

      <div className='card-body'>
        <h3 className='movie-name' title={title}>
          {title}
        </h3>
        <span className='year'>{year}</span>
      </div>
    </article>
  )
}

export default MovieCard
