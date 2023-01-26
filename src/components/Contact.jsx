import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

const Contact = () => {
  return (
    <div className='container contact-container flex column center'>
      <div className='contact-title '>
        <h1>CONTACT</h1>
      </div>

      <div className='contact-form '>
        <form className='flex column ' action=''>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Enter Your Name...'
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='Enter your email'
          ></input>
          <label htmlFor='message'>Message</label>
          <textarea
            className='form-control'
            id='message'
            rows='3'
            placeholder='Your message...'
          ></textarea>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
