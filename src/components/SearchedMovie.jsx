import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MovieFilter from '../views/MovieFilter'

const SearchResults = () => {
  // use the location hook to access the searchResults
  const location = useLocation()
  const searchResults = location.state.searchResults
  console.log(searchResults)
  const searchQuery = location.state.searchQuery

  return (
    <section id='searched-movies'>
      {/* <MovieFilter /> */}
      {searchResults ? (
        <div className='container searched-movies-container'>
          <h1 className='title flex center'>
            Your Search For : {searchQuery.toUpperCase()}
          </h1>
          <div className='searched-movie-container grid'>
            {searchResults.map((result) => (
              <div key={result.id} className='searched-movie-card flex center'>
                <h5>{result.name}</h5>
                {result.poster_path ? (
                  <img
                    alt={result.title}
                    src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  />
                ) : (
                  <p>{result.originalTitle}</p>
                )}

                <Link to={`/movie/${result.id}`} className='btn '>
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}
export default SearchResults
