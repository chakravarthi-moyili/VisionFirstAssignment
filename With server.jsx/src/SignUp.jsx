import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    if (!Object.values(validationErrors).some(error => error !== "")) {

      axios.post('http://localhost:8081/signup', values)
      .then(res => {
          navigate('/');
      })
      .catch(err => console.log(err));
    }
  };
  

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-center mb-4'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Name'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="username"><strong>User Name</strong></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='Enter User Name'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="role"><strong>Role</strong></label>
            <select
              id="role"
              name="role"
              className='form-control rounded-0'
              onChange={handleInput}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && <div className="text-danger">{errors.role}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Email'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="phone"><strong>Phone</strong></label>
            <input
              type="text"
              id='phone'
              name='phone'
              placeholder='Enter Phone'
              className='form-control rounded-0'
              onChange={handleInput}
              maxLength={10}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter Password'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Re-enter Password'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100"><strong>Sign Up</strong></button>
          <p className="mt-2">Already have an account?</p>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
