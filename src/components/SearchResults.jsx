import React from 'react'
import { useLocation } from 'react-router-dom'
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

              <small>{result.name}</small>
              {result.poster_path ? (
                <img
                  alt={result.title}
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                />
              ) : (
                <div>
                  <img src='../assets/images/no-photo.png' alt='' />
                  <p>Can't Load The Video</p>
                </div>
              )}
              {result.vote_average ? (
                <small>Rate:{result.vote_average}</small>
              ) : (
                ''
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
