import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate()

    const submitHandler = (e) => {
         if(e.target.value.trim()) {
             navigate(`/search/${e.target.value}`)
         } else {
             navigate('/')
         }
    }

  return (
    <Form className='d-flex'>
        <Form.Control 
        type='text' 
        name='q' 
        onChange={(e) => submitHandler(e)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='dark' className='p-2 ms-2'><i className="fa-solid fa-magnifying-glass"></i></Button>
    
    </Form>
  )
}

export default SearchBox