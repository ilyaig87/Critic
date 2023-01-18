import React from 'react'
import { movieService } from '../services/movie-service.js'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
const API_IMG = 'https://image.tmdb.org/t/p/w500'

const MovieDetails = () => {
  let [movie, setMovie] = useState()

  const params = useParams()
  useEffect(() => {
    getMovie()
  }, [])

  async function getMovie() {
    const { movieId } = params
    movie = await movieService.getById(+movieId)
    setMovie(movie)
  }
  console.log(movie)

  const convertDate = (date) => {
    const americaTime = moment.tz(date, 'America/New_York')
    const israelTime = americaTime.clone().tz('Asia/Jerusalem')
    return israelTime.format('DD-MM-YYYY')
  }

  return (
    <div className='container movie-container flex center'>
      {movie ? (
        <div className='card-container flex column center'>
          <h2>{movie.title}</h2>

          <img
            className='card-img'
            src={API_IMG + movie.backdrop_path}
            alt=''
          />
          <div className='movie-text'>
            <h3>Rating: {movie.vote_average}</h3>
            <p>{movie.overview}</p>
            <h3>Movie Release Date: {convertDate(movie.release_date)}</h3>
            <Link to={`/`} className='btn btn-primary'>
              Go Back
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default MovieDetails
