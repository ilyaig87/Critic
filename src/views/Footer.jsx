import { Link } from 'react-router-dom'
import { BsLinkedin } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import '../assets/styles/footer.scss'

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className='footer'>
      <div className='container footer-inner'>
        <div className='footer-brand'>
          <Link to='/' className='footer-logo'>
            <span className='logo-mark'>C</span>
            <h2>
              Critic<span className='dot-logo'>.</span>
            </h2>
          </Link>
          <p>
            Discover, rate and obsess over every story worth watching. Powered by
            the TMDB API.
          </p>
        </div>

        <nav className='footer-links'>
          <h4>Explore</h4>
          <Link to='/'>Movies</Link>
          <Link to='/tv-shows'>TV Shows</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </nav>

        <div className='footer-social'>
          <h4>Follow</h4>
          <div className='socials flex'>
            <a href='https://github.com' rel='noreferrer' target='_blank' aria-label='GitHub'>
              <AiFillGithub />
            </a>
            <a href='https://www.linkedin.com' rel='noreferrer' target='_blank' aria-label='LinkedIn'>
              <BsLinkedin />
            </a>
            <a href='https://www.facebook.com' rel='noreferrer' target='_blank' aria-label='Facebook'>
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className='container footer-bottom'>
        <small>&copy; {new Date().getFullYear()} Critic. All rights reserved.</small>
        <button className='to-top' onClick={scrollTop} aria-label='Back to top'>
          <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer
