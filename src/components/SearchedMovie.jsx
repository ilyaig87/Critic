import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MovieFilter from '../views/MovieFilter'

const SearchResults = () => {
  const location = useLocation()
  const searchResults = location.state?.searchResults || []
  const searchQuery = location.state?.searchQuery || ''

  return (
    <section id='searched-movies'>
      {/* <MovieFilter /> */}
      <div className='container searched-movies-container'>
        <h1 className='title flex center'>
          Your Search For : {searchQuery.toUpperCase()}
        </h1>
        <div className='searched-movie-container grid'>
          {searchResults.map((result) => (
            <div key={result.id} className='searched-movie-card flex center'>
              {/* <h5>{result.title}</h5> */}
              {result.poster_path ? (
                <img
                  alt={result.title}
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                />
              ) : (
                <p>{result.originalTitle}</p>
              )}

              <Link
                to={{
                  pathname: `/show/${result.id}`,
                  state: { mediaType: 'show', media: result },
                }}
                className='btn '
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchResults
