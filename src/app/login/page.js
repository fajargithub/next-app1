"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useSearchParams, useRouter } from 'next/navigation';

const Login = () => {

    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        console.log('on login useEffect!');
        const error = searchParams.get('error');
        setMessage(error);
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await axios.post('/api/login', { email, password });
            console.log(response.data);
                    // Set token in cookie
            setCookie('token', response.data.token);
            setMessage(response.data.message);
            router.push('/');
        } catch(error) {
            console.log(error);
            //setMessage(error.response.message);
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2x1 font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email Address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input 
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                    {message && <p className="text-red-500 text-center">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;