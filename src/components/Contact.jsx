import React, { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'

const Contact = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id='contact' className='container contact-container fade-up'>
      <div className='section-head'>
        <span className='eyebrow'>Get in touch</span>
        <h1>
          Let&apos;s <span className='text-gradient'>talk</span>
        </h1>
        <p className='sub'>
          Questions, feedback or collaboration ideas? Drop a message and
          we&apos;ll get back to you.
        </p>
      </div>

      <div className='contact-grid'>
        <aside className='contact-info'>
          <div className='info-item'>
            <span className='info-icon'><FiMail /></span>
            <div>
              <h4>Email</h4>
              <p>hello@critic.app</p>
            </div>
          </div>
          <div className='info-item'>
            <span className='info-icon'><FiPhone /></span>
            <div>
              <h4>Phone</h4>
              <p>+972 50 000 0000</p>
            </div>
          </div>
          <div className='info-item'>
            <span className='info-icon'><FiMapPin /></span>
            <div>
              <h4>Location</h4>
              <p>Tel Aviv, Israel</p>
            </div>
          </div>
        </aside>

        <form className='contact-form glass' onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' placeholder='Your name' required />
          </div>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' placeholder='you@example.com' required />
          </div>
          <div className='field'>
            <label htmlFor='message'>Message</label>
            <textarea
              id='message'
              rows='4'
              placeholder='Tell us what you think…'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            <FiSend /> {sent ? 'Message sent!' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
