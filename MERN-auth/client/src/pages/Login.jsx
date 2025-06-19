import React, { useContext, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const { backendUrl, setIsLoggedin,getUserData } = useContext(AppContent);
    const [state, setState] = useState('Create Account');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let result;
            if (state === 'Create Account') {
                result = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
            } else {
                result = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            }

            if (result.data.success) {
                setIsLoggedin(true);
                getUserData();
                navigate('/');
            } else {
                toast.error(result.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <>
            <h1 onClick={() => navigate('/')}>Home</h1>
            <div className='login'>
                <h1>{state}</h1>
                <form onSubmit={onSubmitHandler}>
                    {state === 'Create Account' && (
                        <div>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' value={name} required />
                        </div>
                    )}
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' value={email} required />
                    </div>
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your Password' value={password} required />
                    </div>
                    <p onClick={() => navigate('/reset-password')} className='text'>Forgot password?</p> {/* Moved out of Create Account */}
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    {state === 'Create Account' ? (
                        <p className='text' onClick={() => setState('Login')}>Already have an account? Login</p>
                    ) : (
                        <p className='text' onClick={() => setState('Create Account')}>Don't have an account?</p>
                    )}
                </form>
            </div>
        </>
    );
};

export default Login;
