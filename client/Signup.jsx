import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();  // Use the navigate hook here

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure the URL points to the backend (localhost:3001)
        axios.post('http://localhost:3001/Signup', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/');  // Navigate to the login page on successful signup
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#f7e17e' }}>
            <form onSubmit={handleSubmit} className="bg-white p-3 rounded w-25">
                <h3>Signup</h3>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" placeholder='Enter Name' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder='Enter Email' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" placeholder='Enter Password' />
                </div>
                <button className='btn btn-secondary w-100'>Create Account</button>
                <p className="mt-2">Already have an account?</p>
                <Link to="/" className='btn btn-success w-100'>Log in</Link>
            </form>
        </div>
    );
}

export default Signup;
