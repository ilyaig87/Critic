import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { movieService } from '../services/movie-service.js'
import MovieFilter from '../views/MovieFilter.jsx'

const API_IMG = 'https://image.tmdb.org/t/p/w500'

// export class Movies extends React.Component {
//   state = {
//     movies: [],
//     filterBy: null,
//   }
//   componentDidMount() {
//     this.loadMovies()
//   }

//   loadMovies = () => {
//     movieService
//       .query(this.state.filterBy)
//       .then((movies) => this.setState({ movies }))
//   }

//   onSetFilter = (filterBy) => {
//     console.log(filterBy)
//     this.setState({ filterBy }, this.loadMovies)
//   }

//   render() {
//     const { movies } = this.state
//     const { onSetFilter } = this

//     return (
//       <section id='movies'>
//         <MovieFilter onSetFilter={onSetFilter} />

//         {movies ? (
//           <div className='container movies-container'>
//             <h1 className='title flex center'>Our New Movies</h1>
//             <div className='movie-container grid'>
//               {movies.map((movie) => (
//                 <div className='movie-card flex center' key={movie.id}>
//                   <img src={API_IMG + movie.poster_path} alt={movie.title} />
//                   <Link to={`/movie/${movie.id}`} className='btn '>
//                     Read More
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </section>
//     )
//   }
// }
const Movies = () => {
  let [movies, setMovies] = useState()
  useEffect(() => {
    loadMovies()
  }, [])

  async function loadMovies() {
    movies = await movieService.getMovies()
    setMovies(movies)
  }

  return (
    <section id='movies'>
      {/* <MovieFilter /> */}

      {movies ? (
        <div className='container movies-container'>
          <h1 className='title flex center'>Our New Movies</h1>
          <div className='movie-container grid'>
            {movies.map((movie) => (
              <div className='movie-card flex center' key={movie.id}>
                <img src={API_IMG + movie.poster_path} alt={movie.title} />
                <Link to={`/movie/${movie.id}`} className='btn '>
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

export default Movies
