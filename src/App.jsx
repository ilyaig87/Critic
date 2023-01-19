import { Route, Routes } from 'react-router-dom'
import './assets/styles.scss'
import About from './components/About'
import Contact from './components/Contact'
import Header from '../src/views/Header'
import MovieDetails from './components/MovieDetails'
import Movies from './components/Movies'
import Footer from './views/Footer'

function App() {
  return (
    <div className='App '>
      <Header />
      <Routes>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/movie/:movieId' element={<MovieDetails />} />
        <Route path='/' element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
