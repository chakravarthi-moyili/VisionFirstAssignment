import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (!Object.values(validationErrors).some(error => error !== "")) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data && res.data.status === "Success") {
                        const userRole = res.data.role; // Adjust based on your actual API response structure
                        localStorage.setItem('userRole', userRole);
    
                        // Navigate based on user role
                        if (userRole === "admin") {
                            navigate('/admindashboard');
                        } else {
                            navigate('/userdashboard');
                        }
                    } else {
                        alert("User doesn't exist or invalid credentials");
                    }
                })
                .catch(err => console.error(err));
        }
    };
    

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>User Name</strong></label>
                        <input type="text" id="username" name="username" placeholder='Enter User Name' onChange={handleInput} className='form-control rounded-0' />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" id="password" name="password" placeholder='Enter Password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
                    <p>Don't have an account?</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
