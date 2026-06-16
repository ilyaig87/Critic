import React, { useState } from 'react'
import { IoIosSearch, IoIosStar } from 'react-icons/io'

const RATINGS = [
  { label: 'All', value: '' },
  { label: '6+', value: '6' },
  { label: '7+', value: '7' },
  { label: '8+', value: '8' },
  { label: '9+', value: '9' },
]

const MovieFilter = ({ onSetFilter }) => {
  const [filterBy, setFilterBy] = useState({
    movieTitle: '',
    rating: '',
    releaseDate: '',
  })

  const update = (next) => {
    setFilterBy(next)
    onSetFilter(next)
  }

  const handleTitle = ({ target }) =>
    update({ ...filterBy, movieTitle: target.value })

  const handleRating = (value) => update({ ...filterBy, rating: value })

  return (
    <section className='movie-filter-container'>
      <div className='filter-bar'>
        <div className='filter-search'>
          <IoIosSearch className='icon' />
          <input
            type='text'
            placeholder='Filter by title…'
            value={filterBy.movieTitle}
            onChange={handleTitle}
            aria-label='Filter by title'
          />
          {filterBy.movieTitle && (
            <button
              className='clear'
              onClick={() => update({ ...filterBy, movieTitle: '' })}
              aria-label='Clear title filter'
            >
              ×
            </button>
          )}
        </div>

        <div className='filter-ratings'>
          <span className='label'>
            <IoIosStar /> Rating
          </span>
          <div className='rating-pills'>
            {RATINGS.map((r) => (
              <button
                key={r.label}
                type='button'
                className={`pill ${filterBy.rating === r.value ? 'active' : ''}`}
                onClick={() => handleRating(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieFilter
