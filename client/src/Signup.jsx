import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import BananaInstructionImage from './Components/Banana-instruction.png';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [quote, setQuote] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/Signup', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/'); 
            })
            .catch(err => console.log(err));
    };

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

    return (
        <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                <h3>Signup</h3>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={(e) => setName(e.target.value)} 
                            id="name" 
                            placeholder="Enter Name" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            onChange={(e) => setEmail(e.target.value)} 
                            id="email" 
                            placeholder="Enter Email" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)} 
                            id="password" 
                            placeholder="Enter Password" 
                            required 
                        />
                    </div>
                    <button className="btn btn-secondary w-100">Create Account</button>
                    <p className="mt-2">Already have an account?</p>
                    <Link to="/" className="btn btn-success w-100">Log in</Link>
                </form>
            

            {quote && (
                <div className="quote-section p-4 d-flex flex-column justify-content-center align-items-center">
                    <h5>Happy Gaming !!<img src={BananaInstructionImage} alt="Instructions" className="instruction-image" /></h5>
                    <p>"{quote}" - {quoteAuthor}</p>
                </div>
            )}
        </div>
    );
}

export default Signup;
