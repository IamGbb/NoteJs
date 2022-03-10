import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating';
import { listProductDetails, reviewProduct } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {PRODUCT_REVIEW_RESET} from '../constants/productConstants'


const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const match = useParams()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

        const productReview = useSelector(state=> state.productReview)
    const {loading: loadingReview, success: successReview, error: errorReview} = productReview

    
    useEffect(() => {
        if (successReview){
            alert ('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.id))
    },[dispatch, match, successReview])
    
    const addToCartHandler = () => {
        navigate(`/cart/${match.id}?qty=${qty}`)
        //history.push(`/cart/${match}?qty=${qty}`)
    }

    const submitHandler=(e) => {
        e.preventDefault()
        dispatch(reviewProduct(match.id, {
            rating, comment
        }))
    }

    const {image, name, rating: productRating, numReviews, price, description, countInStock} = product;

  return (
  <>
    <Link className='btn btn-dark my-3' to='/'>
        Go Back
    </Link>
    {loading ? 
    <Loader /> : 
    error ? 
    <Message variant='danger'>{error}</Message> : ( 
    <>
    <Row>
        <Col md={6}>
            <Image src={image} alt={name} fluid/>
        </Col>

        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item> <h3>{name}</h3> </ListGroup.Item>
                <ListGroup.Item> {productRating && <Rating value={productRating} text={`${numReviews} reviews`}/>} </ListGroup.Item>
                <ListGroup.Item> Price: ${price} </ListGroup.Item>
                <ListGroup.Item> Description: {description} </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                price:
                            </Col>
                            <Col>
                                <strong>${price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                                status:
                            </Col>
                            <Col>
                                {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && 
                    (<ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                   { [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>)}

                    <ListGroup.Item>
                        <Button 
                        onClick={addToCartHandler}
                        className="btn-block" 
                        type='button' 
                        disabled={countInStock === 0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col md={6}>
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <Message>No Reviews</Message>}
        <ListGroup variant='flush'>
            {product.reviews.map(review => (
               <ListGroup.Item key={review._id}>
                   <strong>{review.name}</strong>
                   <Rating value={review.rating} />
                   <p>{review.createdAt.substring(0,10)}</p>
                   <p>{review.comment}</p>
               </ListGroup.Item>
            ))}
            <ListGroup.Item>
                <h2>Write a Review</h2>
                {loadingReview && <Loader />}
                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                {userInfo ? 
                (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        row='3' 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={loadingReview} type='submit' variant='primary'>Submit</Button>
                </Form>
                ) : (
                <Message>Please <Link to='/login'>sign in</Link>{' '}</Message>)}
            </ListGroup.Item>
        </ListGroup>
        </Col>
    </Row>
    </>
    )}
  </>
  )
}

export default ProductScreen