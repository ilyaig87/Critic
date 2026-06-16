import { IoIosArrowDown } from 'react-icons/io'
import '../assets/styles/hero.scss'

const Hero = () => {
  const scrollToContent = () => {
    const el = document.getElementById('movies')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className='hero'>
      <div className='hero-glow' aria-hidden='true' />
      <div className='container hero-inner fade-up'>
        <span className='hero-badge'>
          <span className='pulse' /> Powered by TMDB · Updated daily
        </span>

        <h1 className='hero-title'>
          Discover, rate &amp; obsess over <br />
          <span className='text-gradient'>every story worth watching.</span>
        </h1>

        <p className='hero-sub'>
          Critic is your cinematic companion — browse thousands of trending
          movies and TV shows, watch trailers, and dive into ratings, all in one
          beautifully crafted experience.
        </p>

        <div className='hero-actions'>
          <button className='btn btn-primary' onClick={scrollToContent}>
            Explore Movies
          </button>
          <a className='btn' href='#/tv-shows'>
            Browse TV Shows
          </a>
        </div>

        <div className='hero-stats'>
          <div className='stat'>
            <strong>10K+</strong>
            <span>Titles</span>
          </div>
          <div className='stat'>
            <strong>4K</strong>
            <span>Trailers</span>
          </div>
          <div className='stat'>
            <strong>Live</strong>
            <span>Ratings</span>
          </div>
        </div>
      </div>

      <button
        className='hero-scroll'
        onClick={scrollToContent}
        aria-label='Scroll to content'
      >
        <IoIosArrowDown />
      </button>
    </section>
  )
}

export default Hero
