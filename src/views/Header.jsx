import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import '../../src/assets/styles/header.scss'
import SearchBar from '../views/SearchBar.jsx'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className='container header-container flex space-between'>
        <Link className='logo' to='/' onClick={closeMenu}>
          <span className='logo-mark'>C</span>
          <h1>
            Critic<span className='dot-logo'>.</span>
          </h1>
        </Link>

        <div className='header-search'>
          <SearchBar />
        </div>

        <nav className={`nav-link ${menuOpen ? 'open' : ''}`}>
          <NavLink to='/' end onClick={closeMenu}>
            Movies
          </NavLink>
          <NavLink to='/tv-shows' onClick={closeMenu}>
            TV Shows
          </NavLink>
          <NavLink to='/about' onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to='/contact' onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <button
          className='menu-toggle'
          aria-label='Toggle menu'
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </header>
  )
}

export default Header
