import { Route, Routes } from 'react-router-dom'
import './assets/styles.scss'
import About from './components/About'
import Contact from './components/Contact'
import Header from '../src/views/Header'
import MovieDetails from './components/MovieDetails'
import Movies from './components/Movies'
import Footer from './views/Footer'
import SearchedMovie from './components/SearchedMovie'
import TvShows from './components/TvShows'
import TvShowsDetails from './components/TvShowsDetails'
import MediaDetails from './components/MediaDetails'

function App() {
  return (
    <div className='App '>
      <Header />
      <Routes>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/movie/:movieId' element={<MovieDetails />} /> */}
        {/* <Route path='/tv-show/:tvShowId' element={<TvShowsDetails />} /> */}
        <Route path='/show/:id' element={<MediaDetails />} />
        <Route path='/searched-movies' element={<SearchedMovie />} />
        <Route path='/tv-shows' element={<TvShows />} />
        <Route path='/' element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
