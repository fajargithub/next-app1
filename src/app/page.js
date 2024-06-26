'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log('on useEffect!');
    const token = getCookie('token');
    if (token) {
      console.log('cookie token: ' + token);
      try {
        console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        console.log('Decoded token:', decoded);
        setUser(decoded);
      } catch (err) {
        console.error('Token verification failed', err);
        router.push('/login'); // Redirect to login if token is invalid
      }
    } else {
      console.log('on else useEffect')
      router.push('/login'); // Redirect to login if no token is found
    }
  }, [router]);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div>
      {/* <h1>Welcome, {user.email}</h1> */}
      <h1>Welcome!</h1>
    </div>
  );
};

export default Home;