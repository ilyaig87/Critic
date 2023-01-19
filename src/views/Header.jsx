import { Link } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'
import '../../src/assets/styles/header.scss'

const Header = () => {
  return (
    <header>
      <div className='container header-container'>
        <div className='logo-container flex space-between'>
          <Link
            className='logo-container'
            to={{
              pathname: `/`,
            }}
          >
            <h1>Critic</h1>
          </Link>

          <div className='search-bar flex'>
            <input type='text' placeholder='Search your movie...' />
            <button className='search-bar-btn'>
              <IoIosSearch className='svg' />
            </button>
          </div>

          <div className='nav-link flex'>
            <Link
              to={{
                pathname: `/about`,
              }}
            >
              About
            </Link>
            <Link
              to={{
                pathname: `/contact`,
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
