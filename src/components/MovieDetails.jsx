import React from 'react'
import { movieService } from '../services/movie-service.js'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
const API_IMG = 'https://image.tmdb.org/t/p/w500'

const MovieDetails = () => {
  let [movie, setMovie] = useState(null)

  const params = useParams()

  useEffect(() => {
    getMovie()
  }, [])

  async function getMovie() {
    const { movieId } = params
    movie = await movieService.getById(+movieId)
    setMovie(movie)
    console.log(movie)
  }

  const convertDate = (date) => {
    const americaTime = moment.tz(date, 'America/New_York')
    const israelTime = americaTime.clone().tz('Asia/Jerusalem')
    return israelTime.format('DD-MM-YYYY')
  }

  return (
    <div className='container movie-details-container flex center'>
      {movie ? (
        <div className='card-container flex column center'>
          <h1 className='movie-title'>{movie.title}</h1>
          <img
            className='card-img'
            src={API_IMG + movie.backdrop_path}
            alt=''
          />
          <span>{movie.vote_average}</span>
          <div className='movie-video'>
            <h3>Watch the trailer</h3>
            <iframe
              src={`https://www.youtube.com/embed/${movie.videoKey}`}
            ></iframe>
          </div>
          <div className='movie-text'>
            <p>{movie.overview}</p>
            <h5>Movie Release Date: {convertDate(movie.release_date)}</h5>
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
