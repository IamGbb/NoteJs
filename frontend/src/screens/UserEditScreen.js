import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const userId = useParams().id
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch, userId, user, successUpdate, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin}))
        
    }

    const adminCheck = (e) => {
        //setIsAdmin(e.target.checked);
        console.log(e.target.checked)
        console.log(isAdmin)
    }

    const profileArray = [
        {id: 'name', label: 'Name', placeholder: 'Enter your name', value: name , func: (e)=> setName(e.target.value)},
        {id: 'email', label: 'Email Address', placeholder: 'Enter your email', value: email, func: (e)=> setEmail(e.target.value)},     ]

  return (
      <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back </Link>

    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
        : 
        <Form onSubmit={submitHandler}>

            {profileArray.map((field) => {
            const {id, label, placeholder, value, func} = field;
            return (
                <Form.Group controlId={id} key={label}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={id} placeholder={placeholder} value={value}
                onChange={func}></Form.Control>
            </Form.Group>
            )
        })}
        
            <Form.Group controlId='isadmin'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}>
                </Form.Check>
            </Form.Group>
            
            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        }

    </FormContainer>
      </>

  ) 
}
export default UserEditScreen