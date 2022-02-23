import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';

//import Product from '../components/Product';

const ProductScreen = () => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

    const match = useParams()
    
    useEffect(() => {
        dispatch(listProductDetails(match.id))
    },[dispatch, match])
    

    const {image, name, rating, numReviews, price, description, countInStock} = product;

  return (
    <>
    <Link className='btn btn-dark my-3' to='/'>
        Go Back
    </Link>
    {loading ? 
    <Loader /> : 
    error ? 
    <Message variant='danger'>{error}</Message> : ( 

    <Row>
        <Col md={6}>
            <Image src={image} alt={name} fluid/>
        </Col>

        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item> <h3>{name}</h3> </ListGroup.Item>
                <ListGroup.Item> {rating && <Rating value={rating} text={`${numReviews} reviews`}/>} </ListGroup.Item>
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
                    <ListGroup.Item>
                        <Button className="btn-block" type='button' disabled={countInStock === 0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )}
    </>
  )
}

export default ProductScreen