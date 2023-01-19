import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0)
  const { name, job, image, text } = people[index]

  const changeIndex = (isPositive) => {
    if(isPositive){
      setIndex((index + 1) % people.length)
    } else {
      setIndex(index - 1 === -1 ? people.length - 1 : index - 1);
    }
  }

  const randomPerson = () => {
    let randomNumber = index
    while (randomNumber === index)
      randomNumber = Math.floor(Math.random() * people.length)
    setIndex(randomNumber)
  }

  return (
    <article className='review'>
      <div className='img-container'>
        <img className='person-img' src={image} alt={name} />
        <span className='quote-icon'>
          <FaQuoteRight />
        </span>
      </div>
      <h4 className='author'>{name}</h4>
      <p className='job'>{job}</p>
      <p className='info'>{text}</p>
      <div className='button-container'>
        <button className='prev-btn' onClick={(() => changeIndex(false))}><FaChevronLeft /></button>
        <button className='next-btn' onClick={(() => changeIndex(true))}><FaChevronRight /></button>
      </div>
      <button className='random-btn' onClick={randomPerson}>surprise me</button>
    </article>
  )
};

export default Review;
