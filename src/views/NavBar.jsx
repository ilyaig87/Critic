import React, { useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service'

const NavBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMediaType, setSelectedMediaType] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = async (searchQuery) => {
    const results = await movieService.searchAll(searchQuery)
    results.forEach((result) => (result.media_type = result.media_type))
    setSearchResults(results)
    navigate('/searched-movies', {
      state: { searchResults: results, searchQuery },
    })
  }

  useEffect(() => {
    if (searchQuery) {
      movieService
        .searchAll(searchQuery)
        .then((results) => setSearchResults(results))
    }
  }, [searchQuery])

  return (
    <div className='search-bar flex'>
      <form onSubmit={() => handleSearch(searchQuery)}>
        <input
          className=' '
          type='text'
          value={searchQuery}
          placeholder='Search your movie...'
          onChange={handleChange}
        />
        <button className='btn'>
          <IoIosSearch className='svg' />
        </button>
      </form>
    </div>
  )
}

export default NavBar
