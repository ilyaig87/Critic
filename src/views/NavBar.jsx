import React from 'react'
import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { movieService } from '../services/movie-service'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState([])
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const searchResults = await movieService.searchMovies(searchQuery)
    navigate(`movies/searched-movies`, {
      state: { searchResults, searchQuery },
    })
    setSearchQuery('')
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit} value={searchQuery}>
        <input
          className=' '
          type='text'
          value={searchQuery}
          placeholder='Search your movie...'
          onChange={handleChange}
        />

        <button>
          <IoIosSearch className='svg' />
        </button>
      </form>
    </div>
  )
}

export default NavBar
