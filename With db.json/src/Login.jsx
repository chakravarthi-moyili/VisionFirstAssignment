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

        // Clear general error if it exists
        if (errors.general) {
            setErrors(prevErrors => ({ ...prevErrors, general: "" }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are validation errors
        if (!Object.values(validationErrors).some(error => error !== "")) {
            try {
                const res = await axios.get('http://localhost:3000/signup'); // Get all users from the API
                const users = res.data; // Assuming this returns an array of user objects

                // Find a matching user
                const matchedUser = users.find(user => 
                    user.username === values.username && user.password === values.password
                );

                if (matchedUser) {
                    const userRole = matchedUser.role; // Assuming user object has a 'role' property
                    localStorage.setItem('userRole', userRole);
                    navigate(userRole === "admin" ? '/admindashboard' : '/userdashboard');
                } else {
                    setErrors({ general: "Invalid credentials." });
                }
            } catch (err) {
                console.error(err);
                setErrors({ general: "An error occurred. Please try again." });
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    {errors.general && <span className='text-danger'>{errors.general}</span>}
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
