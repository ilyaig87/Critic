import React from 'react'
import { FiSearch, FiFilm, FiStar, FiPlayCircle } from 'react-icons/fi'

const features = [
  {
    icon: <FiFilm />,
    title: 'Vast Library',
    text: 'Thousands of movies and TV shows, refreshed daily from the TMDB database.',
  },
  {
    icon: <FiSearch />,
    title: 'Instant Search',
    text: 'Find any title in milliseconds with smart, multi-source search.',
  },
  {
    icon: <FiStar />,
    title: 'Live Ratings',
    text: 'Real audience scores so you always know what is worth your time.',
  },
  {
    icon: <FiPlayCircle />,
    title: 'Trailers Inline',
    text: 'Preview before you commit — watch official trailers without leaving.',
  },
]

const About = () => {
  return (
    <section id='about' className='container about-container fade-up'>
      <div className='section-head'>
        <span className='eyebrow'>About Critic</span>
        <h1>
          Your <span className='text-gradient'>cinematic</span> companion
        </h1>
        <p className='sub'>
          Critic is a modern movie &amp; TV discovery platform built for people
          who love great stories. Browse trending releases, filter by what
          matters to you, and find your next favorite in seconds — all wrapped
          in a fast, beautiful interface.
        </p>
      </div>

      <div className='feature-grid'>
        {features.map((f) => (
          <div className='feature-card' key={f.title}>
            <div className='feature-icon'>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <div className='about-cta glass'>
        <div>
          <h2>Built with React &amp; the TMDB API</h2>
          <p>
            A single-page application featuring client-side routing, live data
            fetching, local caching, search, and responsive design.
          </p>
        </div>
        <a className='btn btn-primary' href='#/'>
          Start exploring
        </a>
      </div>
    </section>
  )
}

export default About
