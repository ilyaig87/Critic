import { Link } from 'react-router-dom'
import '../../src/assets/styles/header.scss'
import SearchBar from '../views/SearchBar.jsx'

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
            <h1>
              Critic<span className='dot-logo'>.</span>
            </h1>
          </Link>

          <SearchBar />

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
                pathname: `/tv-shows`,
              }}
            >
              Tv
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
