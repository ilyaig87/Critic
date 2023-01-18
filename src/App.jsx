import { Route, Routes } from 'react-router-dom'
import './assets/styles.scss'
import About from './components/About'
import Contact from './components/Contact'
import Header from './components/Header'
import MovieDetails from './components/MovieDetails'
import Movies from './components/Movies'

function App() {
  return (
    <div className='App '>
      <Header />
      <Routes>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/movie/:movieId' element={<MovieDetails />} />
        {/* <Route path='/movie/:id' component={MovieDetails} /> */}
        <Route path='/' element={<Movies />} />
      </Routes>
    </div>
  )
}

export default App
