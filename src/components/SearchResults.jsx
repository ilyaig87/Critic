import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MovieFilter from '../views/MovieFilter'
import { useNavigate } from 'react-router-dom'

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
              <small>{result.title}</small>
              {result.poster_path ? (
                <img
                  alt={result.title}
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                />
              ) : (
                <div>
                  <small>{result.name}</small>
                  <p>Can't Load The Video</p>
                </div>
              )}

              <button className='btn' onClick={() => handleReadMore(result)}>
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchResults
