import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

const Submenu = () => {
  const {
    isSubmenuOpen,
    page: {page, links },
    location
  } = useGlobalContext()
  const container = useRef()
  const [columns, setColumns] = useState('col-2')

  useEffect(() => {
    setColumns(`col-${links.length}`)
    const submenu = container.current
    const {center,bottom} = location
    submenu.style.left = `${center}px`
    submenu.style.bottom = `${bottom}px`
  }, [page, location, links])

  return <aside 
    className={`submenu ${isSubmenuOpen ? 'show' : ''}`}
    ref={container}
  >
    <section>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((link, index) => {
          const {url, icon, label} = link
          return (
            <a key={index} href={url}>
              {icon}
              {label}
            </a>
          )
        })}
      </div>
    </section>
  </aside>
}

export default Submenu
