import React from 'react'
import PropTypes from 'prop-types'



const Rating = ({value, text, color}) => {

    const stars = [1,2,3,4,5]

  return (
    <div className='rating'>
        {stars.map((star, index) => {
           return(
               <span key={index}><i style={{color: color}} className={value >= star ? 'fas fa-star' : value >= star - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/></span>
           )})}
        <span>{text && text }</span>
    </div>
  )
}

Rating.defaultProps = {
    color: '#F5BE2A'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating