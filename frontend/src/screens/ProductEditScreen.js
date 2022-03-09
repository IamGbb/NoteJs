import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const productId = useParams().id
    const navigate = useNavigate()
    

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    },[dispatch, productId, product, navigate, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
            
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name, price, image, brand, countInStock, category, description
        }))
    }

    const profileArray = [
        {id: 'name', label: 'Name', placeholder: 'Enter your name', value: name , func: (e)=> setName(e.target.value)},
        {id: 'price', label: 'Price',type: 'number', placeholder: 'Enter your price', value: price, func: (e)=> setPrice(e.target.value)},          
        {id: 'brand', label: 'Brand',type: 'text', placeholder: 'Enter brand', value: brand, func: (e)=> setBrand(e.target.value)},
        {id: 'countInStock', label: 'CountInStock',type: 'number', placeholder: 'Enter count in stock', value: countInStock, func: (e)=> setCountInStock(e.target.value)},
        {id: 'category', label: 'Category',type: 'text', placeholder: 'Enter category', value: category, func: (e)=> setCategory(e.target.value)},
        {id: 'description', label: 'Description',type: 'text', placeholder: 'Enter description', value: description, func: (e)=> setDescription(e.target.value)},
        {id: 'image', label: 'Image',type: 'text', placeholder: 'Enter image url', value: image, func: (e)=> setImage(e.target.value)},
    ]

  return (
      <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back </Link>

    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
        : 
        <Form onSubmit={submitHandler}>

            {profileArray.map((field) => {
            const {id, label, type, placeholder, value, func} = field;
            return (
                <Form.Group controlId={id} key={label}>
                <Form.Label>{label}</Form.Label>
                <Form.Control 
                type={type} 
                placeholder={placeholder} 
                value={value}
                onChange={func}>
                </Form.Control>
            </Form.Group>
            )
        })}
            
            <Form.Control type='file' id='image-file' label='Choose File' custom="true" onChange={uploadFileHandler}></Form.Control>
            {uploading && <Loader />}

            <br/>
            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        }

    </FormContainer>
      </>

  ) 
}
export default ProductEditScreen