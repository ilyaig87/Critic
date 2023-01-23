import React from 'react'
import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Navigate } from 'react-router-dom'
import { movieService } from '../services/movie-service'

const NavBar = () => {
  const [selectedMediaType, setSelectedMediaType] = useState('')

  const [searchResults, setSearchResults] = useState([])

  const handleMediaTypeSelection = (e) => {
    setSelectedMediaType(e.target.value)
  }

  const handleSearch = async (searchQuery, selectedMediaType) => {
    const results = await movieService.searchAll(searchQuery, selectedMediaType)
    setSearchResults(results)
    Navigate('/search-results', {
      state: { searchResults: results, searchQuery },
    })
  }

  const [searchQuery, setSearchQuery] = useState([])
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='search-bar flex'>
      <form onSubmit={(e) => handleSearch(e, searchQuery, selectedMediaType)}>
        <input
          className=' '
          type='text'
          value={searchQuery}
          placeholder='Search your movie...'
          onChange={handleChange}
        />
        <select onChange={handleMediaTypeSelection}>
          <option value=''>Select Media Type</option>
          <option value='movie'>Movie</option>
          <option value='tv'>TV Show</option>
        </select>

        <button>
          <IoIosSearch className='svg' />
        </button>
      </form>
    </div>
  )
}

export default NavBar
