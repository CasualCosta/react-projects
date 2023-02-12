import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const Question = ( {title, info} ) => {
  const [showMore, setShowMore] = useState(false)
  const toggle = () => setShowMore(!showMore)
  return (
    <article className='question'>
      <header>
        <h2>{title}</h2>
        <button onClick={toggle}>
          {showMore ? <AiOutlineMinus /> : <AiOutlinePlus /> }
        </button>
      </header>
      {showMore && <p>{info}</p>}
    </article>
  )
};

export default Question;
