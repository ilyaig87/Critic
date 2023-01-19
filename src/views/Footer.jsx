import '../assets/styles/footer.scss'
import { FaFacebook } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <a href='#' className='footer-logo '>
        <h1>Critic</h1>
      </a>

      <ul className='footer-links flex'>
        <li>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='#/about'>About</a>
        </li>
        <li>
          <a href='#/contact'>Contact</a>
        </li>
      </ul>

      <div className='footer-socials flex'>
        <a href='https://github.com' target='_blank'>
          <AiFillGithub />
        </a>
        <a href='https://www.linkedin.com' target='_blank'>
          <BsLinkedin />
        </a>
        <a href='https://www.facebook.com' target='_blank'>
          <FaFacebook />
        </a>
      </div>

      <div className='footer-copyright'>
        <small>&copy; Critic. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
