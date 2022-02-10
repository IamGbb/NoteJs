import React, {useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
//import Product from '../components/Product';

const ProductScreen = () => {

    const [product, setProduct] = useState({})

    const match = useParams()
    
    useEffect(() => {
        const fetchProduct = async () => {
           const {data} =  await axios(`/api/products/${match.id}`)

           setProduct(data)
        }
        fetchProduct()
    },[match])
    
    const {image, name, rating, numReviews, price, description, countInStock} = product;

  return (
    <>
    <Link className='btn btn-dark my-3' to='/'>
        Go Back
    </Link>
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
    </>
  )
}

export default ProductScreen