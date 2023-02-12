import React from 'react'
import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './context'
import sublinks from './data'

const Navbar = () => {
  const {setIsSubmenuOpen, setIsSidebarOpen, openSubmenu } = useGlobalContext()
  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const btnRect = e.target.getBoundingClientRect()
    const center = (btnRect.left + btnRect.right) / 2
    const bottom = btnRect.bottom - 3
    openSubmenu(page, {center, bottom})
  }

  const handleSubmenu = (e) => {
    if(!e.target.classList.contains('link-btn'))
      setIsSubmenuOpen(false)
  }
  return <nav className='nav' onMouseOver={handleSubmenu}>
    <div className='nav-center'>
      <div className='nav-header'>
        <img src={logo} className='nav-logo' alt='stripe' />
        <button className='btn toggle-btn' onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
      </div>
      <ul className='nav-links'>
        {sublinks.map((sublink, index) => {
          const {page} = sublink
          return (
            <li key={index}>
              <button className='link-btn' onMouseOver={displaySubmenu}>{page}</button>
            </li>
          )
        })}
      </ul>
      <button className='btn signin-btn'>Sign in</button>
    </div>
  </nav>
}

export default Navbar
