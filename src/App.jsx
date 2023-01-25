import { Route, Routes } from 'react-router-dom'
import './assets/styles.scss'
import { NavBar, Header, Footer } from '../src/views/index.js'
import {
  Movies,
  TvShows,
  SearchResults,
  MediaDetails,
  Contact,
  About,
} from '../src/components/index.js'

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
        <Route path='/searched-movies' element={<SearchResults />} />
        <Route path='/tv-shows' element={<TvShows />} />
        <Route path='/' element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
