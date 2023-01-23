import React from 'react'

export class MovieFilter extends React.Component {
  state = {
    filterBy: {
      movieTitle: '',
      rate: '',
      releaseDate: '',
    },
  }
  inputRef = React.createRef()

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.value

    this.setState(
      (prevState) => ({
        filterBy: {
          ...prevState.filterBy,
          [field]: value,
        },
      }),
      () => {
        this.props.onSetFilter(this.state.filterBy)
      }
    )
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filterBy)
  }
  render() {
    return (
      <section id='movie-filter' className='container movie-filter-container'>
        {
          <form onSubmit={this.onFilter}>
            <label htmlFor='by-title'>Title :</label>
            <input
              type='text'
              placeholder='by title...'
              id='by-title'
              name='movieTitle'
              onChange={this.handleChange}
            />

            <label htmlFor='by-rating'>Rating :</label>
            <input
              type='text'
              placeholder='by rating..'
              id='by-rating'
              name='rating'
              onChange={this.handleChange}
            />

            <label htmlFor='by-release-date'>Release Date :</label>
            <input
              type='number'
              placeholder='by release-date..'
              id='by-release-date'
              name='releaseDate'
              // value={maxSpeed}
              onChange={this.handleChange}
            />

            <button className='btn'>Filter!</button>
          </form>
        }
        {/* <button className='search-btn' onClick={this.goSearch}>
        Go Search!
      </button> */}
      </section>
    )
  }
}
export default MovieFilter
