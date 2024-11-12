import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const quoteResponse = await axios.get("http://localhost:3001/api/quote");
                setQuote(quoteResponse.data.quote);
                setQuoteAuthor(quoteResponse.data.author);
            } catch (err) {
                console.error("Error fetching quote:", err);
            }
        };

        fetchQuote();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3001/login', { name, password }, { withCredentials: true });
            if (result.data === "Success") {
                navigate('/home');
            } else {
                setErrorMessage(result.data);
            }
        } catch (err) {
            setErrorMessage(err.response ? err.response.data : "An error occurred during login");
        }
    };

    return (
        <div className="login-container">
            {/* Left side: Login form */}
            <form onSubmit={handleSubmit} className="login-form">
                <h3>Login</h3>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(e) => setName(e.target.value)} 
                        id="name" 
                        placeholder='Enter Name' 
                        required 
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input 
                        type="password" 
                        className="form-control" 
                        onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                        placeholder='Enter Password' 
                        required 
                    />
                </div>
                <button type="submit" className='btn btn-success w-100'>Log in</button>
                <p className="mt-2">Don't have an account?</p>
                <Link to='/signup' className='btn btn-secondary w-100'>Create Account</Link>
            </form>

            {/* Right side: Quote */}
            {quote && (
                <div className="quote-section">
                    <h5>Happy Gaming:</h5>
                    <p>"{quote}" - {quoteAuthor}</p>
                </div>
            )}
        </div>
    );
}

export default Login;
