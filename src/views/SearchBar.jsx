import React, { useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { movieService } from '../services/movie-service'
import Loader from './Loader'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = async (searchQuery) => {
    const results = await movieService.searchAll(searchQuery)
    setSearchResults(results)
    navigate('/searched-movies', {
      state: { searchResults, searchQuery },
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
    <div className='search-bar-container flex row space-between'>
      <form className='flex' onSubmit={() => handleSearch(searchQuery)}>
        <input
          className=''
          type='text'
          value={searchQuery}
          placeholder='Search your movie...'
          onChange={handleChange}
        />
        <button className='button'>
          <IoIosSearch className='svg' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
