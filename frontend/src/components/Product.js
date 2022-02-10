import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
    const {_id, name, image, rating, numReviews, price} = product;
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${_id}`}>
            <Card.Img src={image} variant ='top' />
        </Link>

        <Card.Body>
            <Link to={`/product/${_id}`}>
            <Card.Title><strong>{name}</strong></Card.Title>
        </Link>
        <Card.Text as='div'></Card.Text>
        <Rating value={rating} text={`${numReviews} reviews`} />
        
        <Card.Text as='h3'>${price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product