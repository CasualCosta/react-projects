import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb, weight, index, hex }) => {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(",")
  const hexValue = `#${hex}`

  const clickEvent = () => {
    navigator.clipboard.writeText(hexValue)
    setAlert(true)
  }

  useEffect(() => {
    console.count('useEffect called.')
    const timeout = setTimeout(() => {
      setAlert(false)
      console.count('time out called')
    }, 1000)
    return () => clearTimeout(timeout)
  }, [alert])

  return <article 
    className={`color ${index > 10 && 'color-light'}`} 
    style={{backgroundColor: `rgb(${bcg})`}} 
    onClick={clickEvent}
  >
    <p className='percent-value'>{weight}%</p>
    <p className='color-value'>{hexValue}</p>
    {alert && <p>copied to clipboard</p>}
  </article>
}

export default SingleColor
