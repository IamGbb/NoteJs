import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
    const navigate = useNavigate()
    const {_id, name, image, rating, numReviews, price, qty, countInStock} = product;

const addToCartHandler = () => {
        navigate(`/cart/${_id}?qty=1`)
    }
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${_id}`}>
            <Card.Img src={image} variant ='top'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${_id}`}>
            <Card.Title><strong>{name}</strong></Card.Title>
        </Link>
        <Card.Text as='div'></Card.Text>
        <Rating value={rating} text={`${numReviews} reviews`} />
        
        <Card.Text as='h3'>₪{price}</Card.Text>
        </Card.Body>
        <Button 
          onClick={addToCartHandler}
          className="btn-block" 
          variant={countInStock === 0 ? "light" : "primary"}
          type='button' 
          disabled={countInStock === 0}>{countInStock === 0 ? "Out of Stock" : "Add to Cart"}</Button>
      </Card>
  )
}

export default Product