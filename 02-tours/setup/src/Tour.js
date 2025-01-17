import React, { useState, useContext } from 'react';
import {RemoveContext } from "./App.js"

const Tour = ( {id, name, info, image, price} ) => {
  const [readMore, setReadMore] = useState(false)
  const removeTour = useContext(RemoveContext)
  return (
    <article className='single-tour'>
      <img src={image} alt={name} />
      <footer>
        <div className='tour-info'>
          <h4>{name}</h4>
          <h4 className='tour-price'>${price}</h4>
        </div>
          <p>{readMore ? info : `${info.substring(0,200)} ...`}</p>
          <button className='btn' onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : 'show more'}
          </button>
          <button className='delete-btn' onClick={() => removeTour(id) }>not interested</button>
      </footer>
    </article>
  )
};

export default Tour;
