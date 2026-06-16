import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieCard from '../views/MovieCard.jsx'

const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchResults = location.state?.searchResults || []
  const searchQuery = location.state?.searchQuery || ''

  const handleReadMore = (result) => {
    navigate(`/show/${result.id}`, {
      state: {
        media: result,
        fromSearch: true,
      },
    })
  }

  const validResults = searchResults.filter(
    (r) => r.media_type !== 'person' && (r.title || r.name)
  )

  return (
    <section id='searched-movies'>
      <div className='container movies-container'>
        <div className='section-head'>
          <span className='eyebrow'>Search Results</span>
          <h1>
            Results for <span className='text-gradient'>“{searchQuery}”</span>
          </h1>
          <p className='sub'>
            {validResults.length} matching title
            {validResults.length === 1 ? '' : 's'} found.
          </p>
        </div>

        {validResults.length > 0 ? (
          <div className='movie-grid grid'>
            {validResults.map((result) => (
              <MovieCard
                key={result.id}
                media={result}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        ) : (
          <p className='empty-state'>
            No results found. Try a different title.
          </p>
        )}
      </div>
    </section>
  )
}

export default SearchResults
